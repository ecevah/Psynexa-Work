import React from "react";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { FaRegTrashAlt } from "react-icons/fa";

const SessionListItem = ({ session, isActive, onClick, onDelete }) => {
  return (
    <>
      <div
        className={`z-0 sessionItem flex flex-row items-center justify-start ml-[10px] pl-[10px] pr-[20px] py-[10px] my-[5px] rounded-l-full cursor-pointer hover:bg-[#F3F6FB] hover:text-[#0A6EBD] relative group ${
          isActive ? "bg-[#F3F6FB] text-[#0A6EBD]" : ""
        }`}
        onClick={onClick}
      >
        <HiOutlineChatBubbleBottomCenterText size={20} />
        <div className="ml-[5px] w-full truncate">
          {session.name === "New Session" ? "Yeni Sohbet" : session.name}
        </div>
        <FaRegTrashAlt
          className={
            isActive
              ? "mr-[23px] hover:text-[#282c5f]"
              : "mr-[23px] opacity-0 group-hover:opacity-100 transition-opacity hover:text-[#2a2e64]"
          }
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        />
        <div
          className={
            isActive
              ? "absolute w-[17px] h-[17px] rounded-full top-[14px] right-[15px] bgRadialGradientAndShadow shadow-[#0A6EBD] shadow-2xl"
              : "hidden"
          }
        ></div>
      </div>
    </>
  );
};

export default SessionListItem;
