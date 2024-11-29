// user-send-message.js
import { MINI_LOGO } from "@/config/svg";
import Image from "next/image";
import React from "react";

const UserSendMessage = ({ text }) => {
  return (
    <>
      <div className="flex flex-row items-center">
        <Image
          src={MINI_LOGO}
          width={30}
          height={30}
          className="rounded-full mr-[10px]"
          alt="mini logo"
        />
        <div className="text-base md1368:text-sm">{text}</div>
      </div>
    </>
  );
};

export default UserSendMessage;
