"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { AiOutlineSend } from "react-icons/ai";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const SearchInput = ({ onSendMessage, loading }) => {
  const [inputText, setInputText] = useState("");
  const textareaRef = useRef(null);

  const handleInputChange = (e) => {
    setInputText(e.target.value);

    // Yüksekliği dinamik olarak ayarla
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Yüksekliği sıfırla
      textarea.style.height = textarea.scrollHeight + "px"; // İçeriğe göre yüksekliği ayarla
    }
  };

  const handleSend = () => {
    if (inputText.trim() !== "") {
      onSendMessage(inputText);
      setInputText("");

      // Mesaj gönderildikten sonra yüksekliği sıfırla
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // Enter tuşuna basıldığında mesajı gönder
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <div className="w-[900px] max-w-full h-fit bg-white bottom-[30px] flex items-center rounded-[25px] shadow-lg pl-[20px] pr-[15px] z-20 mx-auto flex-shrink-0 mb-[10px]">
        <Image src="/brain-icon-3.png" alt="brain" height={25} width={25} />
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-full min-h-[40px] max-h-[200px] pl-[15px] pr-[40px] pt-[13px] pb-[10px] border-none outline-none resize-none overflow-y-auto scrollHidden"
            placeholder="Ne düşünüyorsunuz?"
            disabled={loading}
            rows={1}
            style={{ lineHeight: "1.5" }}
          />
          <div
            className={`absolute right-[10px] top-[50%] transform -translate-y-1/2 min-w-[40px] h-[40px] rounded-full flex justify-center items-center cursor-pointer ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#0A6EBD]"
            }`}
            onClick={!loading ? handleSend : null}
          >
            {loading ? (
              <AiOutlineLoading3Quarters
                className="animate-spin text-white"
                size={20}
              />
            ) : (
              <AiOutlineSend
                className="-rotate-45 leading-[20px] mb-[3px] text-white"
                size={20}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchInput;
