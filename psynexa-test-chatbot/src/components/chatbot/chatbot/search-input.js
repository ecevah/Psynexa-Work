"use client";
import React, { useState } from "react";
import Image from "next/image";
import { AiOutlineSend } from "react-icons/ai";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const SearchInput = ({ onSendMessage, loading }) => {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSend = () => {
    if (inputText.trim() !== "") {
      onSendMessage(inputText);
      setInputText("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      <div className="w-[900px] max-w-full h-[60px] absolute bg-white bottom-[30px] flex flex-row items-center justify-start rounded-full shadow-2xl overflow-hidden pl-[20px] pr-[15px] z-20 mx-4">
        <Image src="/brain-icon-3.png" alt="brain" height={25} width={25} />
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-full h-full pl-[15px] border-none outline-none"
          placeholder="Ne düşünüyorsunuz?"
          disabled={loading}
        />
        <div
          className={`min-w-[40px] h-[40px] rounded-full flex justify-center items-center cursor-pointer ${
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
    </>
  );
};

export default SearchInput;
