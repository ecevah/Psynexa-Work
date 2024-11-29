// components/chatbot/sidebar/profile-button.js
import { MINI_LOGO } from "@/config/svg";
import Image from "next/image";
import React from "react";
import { IoExitOutline } from "react-icons/io5";

const ProfileButton = ({ text, onLogout }) => {
  return (
    <>
      <div
        className="w-[90%] flex flex-row items-center justify-between border-[1px] border-solid border-[#EFEFEF] rounded-full px-[10px] py-[5px] mx-auto cursor-pointer mt-[10px] hover:bg-[#f4f4f4]"
        onClick={onLogout}
      >
        <div className="flex flex-row items-center ml-[-3px]">
          <Image
            src={MINI_LOGO}
            alt="mini logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="ml-[10px]">{text}</div>
        </div>
        <IoExitOutline size={25} className="mr-[0px]" />
      </div>
    </>
  );
};

export default ProfileButton;
