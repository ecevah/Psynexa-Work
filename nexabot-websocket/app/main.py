from fastapi import FastAPI, WebSocket
from app.routers import items
import json
import base64
from app.file_sending import speech_to_text_gemini_generation_tts, multimodal_process_gemini_pro
import tempfile
import os


app = FastAPI(
    title="FastAPI Project",
    description="Bu bir örnek FastAPI projesidir",
    version="1.0.0"
)

# Router'ları ekle
app.include_router(items.router)

# WebSocket bağlantılarını tutmak için liste
active_connections: list[WebSocket] = []

async def process_message(message: str) -> str:
    """
    Gelen mesajları işleyen fonksiyon.
    Bu fonksiyonu ihtiyacınıza göre özelleştirebilirsiniz.
    """
    try:
        # Gelen mesajı JSON olarak parse etmeye çalış
        data = json.loads(message)
        # Örnek bir işlem: Mesajı echo et ve tip bilgisi ekle
        return json.dumps({
            "status": "success",
            "message": data,
            "type": str(type(data).__name__)
        })
    except json.JSONDecodeError:
        # Eğer JSON değilse, düz metin olarak işle
        return json.dumps({
            "status": "success",
            "message": message,
            "type": "string"
        })
    except Exception as e:
        return json.dumps({
            "status": "error",
            "message": str(e)
        })

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)
    try:
        while True:
            # Mesajı bekle
            data = await websocket.receive_text()
            
            # Mesajı işle
            response = await process_message(data)
            
            # İşlenmiş mesajı geri gönder
            await websocket.send_text(response)
            
    except Exception as e:
        print(f"WebSocket error: {e}")
    finally:
        # Bağlantı koptuğunda listeden çıkar
        active_connections.remove(websocket)

@app.websocket("/audio-ws")
async def audio_websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            audio_data = await websocket.receive_text()
            
            if audio_data and audio_data.startswith('data:audio'):
                base64_audio = audio_data.split(',')[1]
                binary_audio = base64.b64decode(base64_audio)
                
                # Create a temporary WAV file
                with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as temp_file:
                    temp_file.write(binary_audio)
                    temp_file_path = temp_file.name
                
                try:
                    # Open the temporary file and process it
                    with open(temp_file_path, 'rb') as audio_file:
                        processed_audio = speech_to_text_gemini_generation_tts(audio_file)
                    
                    # Clean up the temporary file
                    os.remove(temp_file_path)
                    
                    # Send processed audio back
                    processed_base64 = base64.b64encode(processed_audio).decode('utf-8')
                    response_data = f"data:audio/mp3;base64,{processed_base64}"
                    await websocket.send_text(response_data)
                    
                except Exception as e:
                    print(f"Processing error: {str(e)}")
                    error_response = json.dumps({"error": str(e)})
                    await websocket.send_text(error_response)
                    
                    # Clean up the temporary file in case of error
                    if os.path.exists(temp_file_path):
                        os.remove(temp_file_path)
            
    except Exception as e:
        print(f"WebSocket error: {e}")

@app.websocket("/video-ws")
async def video_websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Base64 formatında video frame'i al
            frame_data = await websocket.receive_text()
            
            # Frame'i hemen geri gönder
            if frame_data and frame_data.startswith('data:image'):
                await websocket.send_text(frame_data)
                
    except Exception as e:
        print(f"Video WebSocket error: {e}")

@app.websocket("/media-ws")
async def media_websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    audio_path = None
    image_path = None
    
    try:
        while True:
            try:
                # Receive the data as JSON containing both audio and image
                data = await websocket.receive_json()
                
                # Validate incoming data
                if not all(key in data for key in ['audio', 'image']):
                    await websocket.send_json({
                        'status': 'error',
                        'error': 'Missing audio or image data'
                    })
                    continue

                # Log processing start
                print("Starting media processing...")
                
                # Extract and save audio data
                audio_base64 = data['audio'].split(',')[1]
                audio_binary = base64.b64decode(audio_base64)
                
                with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as audio_temp:
                    audio_temp.write(audio_binary)
                    audio_path = audio_temp.name
                print(f"Audio saved to temporary file: {audio_path}")

                # Extract and save image data
                image_base64 = data['image'].split(',')[1]
                image_binary = base64.b64decode(image_base64)
                
                with tempfile.NamedTemporaryFile(suffix='.jpg', delete=False) as image_temp:
                    image_temp.write(image_binary)
                    image_path = image_temp.name
                print(f"Image saved to temporary file: {image_path}")

                # Process the media files
                with open(audio_path, 'rb') as audio_file:
                    print("Processing media with Gemini Pro...")
                    processed_audio = multimodal_process_gemini_pro(
                        audio_file=audio_file,
                        image_url=image_path,
                        language=data.get('language', 'en')
                    )
                
                # Convert and send response
                processed_base64 = base64.b64encode(processed_audio).decode('utf-8')
                await websocket.send_json({
                    'status': 'success',
                    'audio': f"data:audio/mp3;base64,{processed_base64}"
                })
                print("Processing completed and response sent")

            except json.JSONDecodeError:
                await websocket.send_json({
                    'status': 'error',
                    'error': 'Invalid JSON format'
                })
            
            except Exception as e:
                print(f"Error during processing: {str(e)}")
                await websocket.send_json({
                    'status': 'error',
                    'error': str(e)
                })

            finally:
                # Clean up temporary files
                if audio_path and os.path.exists(audio_path):
                    os.remove(audio_path)
                    print(f"Cleaned up audio file: {audio_path}")
                if image_path and os.path.exists(image_path):
                    os.remove(image_path)
                    print(f"Cleaned up image file: {image_path}")
    
    except WebSocketDisconnect:
        print("WebSocket disconnected")
    except Exception as e:
        print(f"WebSocket error: {e}")
    finally:
        # Final cleanup in case of unexpected termination
        if audio_path and os.path.exists(audio_path):
            os.remove(audio_path)
        if image_path and os.path.exists(image_path):
            os.remove(image_path)

@app.get("/")
async def root():
    return {"message": "Hoş geldiniz! FastAPI projesine"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"} 