// new-session-button.js
import React from "react";
import { FaPlus } from "react-icons/fa6";

const NewSessionButton = ({ text, onClick }) => {
  return (
    <div
      className="flex flex-row items-center justify-center w-[90%] py-[15px] rounded-full font-semibold mx-auto bg-[#0A6EBD] text-white cursor-pointer"
      onClick={onClick}
    >
      <FaPlus className="mr-[10px]" />
      <p>{text}</p>
    </div>
  );
};

export default NewSessionButton;
