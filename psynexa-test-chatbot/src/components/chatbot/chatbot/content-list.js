// components/chatbot/content-list.js
import React, { useRef, useEffect } from "react";
import MessagesContent from "./messages-content";
import Image from "next/image";

const ContentList = ({ messages, token, clientId }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="w-full h-full pb-[77px] z-10 flex flex-col items-center">
        <Image
          src="/nexa-bot-logo.svg"
          width={150}
          height={50}
          alt="logo"
          className="md1368:block hidden mb-[10px]"
        />
        <div
          className="w-full max-w-[1000px] h-full flex flex-col py-[15px] overflow-y-scroll scrollHidden px-4"
          style={{ scrollBehavior: "smooth" }}
        >
          <MessagesContent
            messages={messages}
            token={token}
            clientId={clientId}
          />
          <div ref={messagesEndRef} />
        </div>
      </div>
    </>
  );
};

export default ContentList;
