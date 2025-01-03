"""
**Libraries**:
Pillow
groq
langchain-google-genai
elevenlabs
google-generativeai
"""

import os
from groq import Groq
from langchain_google_genai import ChatGoogleGenerativeAI
from elevenlabs import generate, set_api_key
from PIL import Image
import google.generativeai as genai

# Set your API keys. These are crucial for authentication with external services.
os.environ['GOOGLE_API_KEY'] = "AIzaSyCIvZsOg8M5nzp2jy5U7JT722AmgaSI7VU"  # Replace with your Google API key
os.environ['GROQ_API_KEY'] = "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"  # Replace with your GROQ API key
eleven_api_key = "sk_9ddf17e8f8302b5ee1267fd817d01cc7c5bc0a5fbeb4ad30"  # Replace with your ElevenLabs API key

gemini_client = ChatGoogleGenerativeAI(model="gemini-1.5-flash")
set_api_key(eleven_api_key)
voice_id = "9BWtsMINqrJLrRacOk9x"

def speech_to_text_gemini_generation_tts(audio_file, language: str = "tr"):
    """
    Transcribes an audio file to text using GROQ API, generates additional text using Gemini Flash,
    converts the text to speech using Eleven Labs API, and returns the output audio file.

    Parameters:
    - audio_file: The input audio file.
    - language (str): Language of the transcription and speech. Default is english ('tr').

    Returns:
    - The generated audio file.
    """
    # Step 1: Use Groq for transcription
    client = Groq()
    transcription = client.audio.transcriptions.create(
        file=audio_file,
        model="whisper-large-v3-turbo",
        language=language,
        response_format="verbose_json",
    )
    transcribed_text = transcription.text

    # Step 2: Gemini Flash generation
    gemini_messages = [
        (
            "system",
            "You are a helpful assistant. Speak in english",
        ),
        ("human", transcribed_text),
    ]
    gemini_response = gemini_client.invoke(gemini_messages)

    generated_text = gemini_response.content

    # Step 3: Text-to-speech
    global voice_id
    audio_data = generate(
        text=generated_text,
        voice=voice_id,
        model="eleven_multilingual_v2"
    )

    return audio_data

def multimodal_process_gemini_pro(audio_file, image_url: str, language: str = "en"):
    """
    Processes audio and image data using Gemini Vision Pro for multimodal AI applications.

    Parameters:
    - audio_file: The input audio file.
    - image_url (str): URL of the input image.
    - language (str): Language for transcription and processing. Default is English ('en').

    Returns:
    - The generated audio file containing processed results.
    """
    image_file = Image.open(image_url)

    # Step 1: Use Groq for transcription
    client = Groq()
    transcription = client.audio.transcriptions.create(
        file=audio_file,
        model="whisper-large-v3-turbo",
        language=language,
        response_format="verbose_json",
    )
    transcribed_text = transcription.text

    genai.configure(api_key="AIzaSyAUuUp27Hpz2JbHi3gWvd_WCSwuuIH-ybo")
    model = genai.GenerativeModel(model_name="gemini-1.5-pro")

    response = model.generate_content([transcribed_text, image_file])

    # Step 3: Text-to-speech
    global voice_id
    audio_data = generate(
        text=response.text,
        voice=voice_id,
        model="eleven_multilingual_v2"
    )

    return audio_data

# if __name__ == '__main__':
#     import logging
#
#     # Configure logging
#     logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
#
#     # Example inputs
#     audio_file_path = "/home/main/Documents/Havelsan/normal_temp.mp3"
#     vision_audio_file_path = "/home/main/Documents/Havelsan/vision_temp.mp3"
#     image_url = "/home/main/Documents/Havelsan/OYH_mind-blowing-facts.jpg"  # Replace with your image URL
#     language_audio = "en"
#
#     # Call the first method
#     logging.info("Calling speech_to_text_gemini_generation_tts...")
#     with open(audio_file_path, "rb") as audio_file:
#         audio_result = speech_to_text_gemini_generation_tts(audio_file=audio_file, language=language_audio)
#     logging.info(f"Output from speech_to_text_gemini_generation_tts: {audio_result}")
#
#     # Call the second method
#     logging.info("Calling multimodal_process_gemini_pro...")
#     with open(vision_audio_file_path, "rb") as audio_file:
#         multimodal_result = multimodal_process_gemini_pro(audio_file=audio_file, image_url=image_url, language=language_audio)
#     logging.info(f"Output from multimodal_process_gemini_pro: {multimodal_result}")

def predict_normal_chat(text: str):
    """
    Generates a response in Turkish for a given input, applying the Gemini 
    Flash generation process.

    This function communicates with a generative model through the Gemini 
    client to receive a response based on the input provided. The assistant 
    is configured to be helpful and respond in the Turkish language.

    :param text: The input text for which a response is to be generated.
    :type text: str
    :return: A generated Turkish response based on the input text.
    :rtype: str
    """

    # Step 2: Gemini Flash generation
    gemini_messages = [
        (
            "system",
            "You are a helpful assistant. Speak in Turkish",
        ),
        ("human", text),
    ]
    gemini_response = gemini_client.invoke(gemini_messages)

    generated_text = gemini_response.content

    return generated_text

def predict_vision_chat(text: str, image_url: str):
    """
    Uses a generative AI model to analyze input text and an accompanying image to generate a response.

    This function integrates text-based input with an image by utilizing a generative AI model.
    The function processes the input image, configures the API keys for the generation model,
    and generates content based on the provided inputs. The output is the textual content
    produced by the trained AI model.

    :param text: The textual description or query to process.
    :type text: str
    :param image_url: The URL or path to the image file to process alongside the text input.
    :type image_url: str
    :return: The generated textual response based on the input text and image.
    :rtype: str
    """
    image_file = Image.open(image_url)

    genai.configure(api_key="AIzaSyAUuUp27Hpz2JbHi3gWvd_WCSwuuIH-ybo")
    model = genai.GenerativeModel(model_name="gemini-1.5-pro")

    response = model.generate_content([text, image_file])

    return response.text