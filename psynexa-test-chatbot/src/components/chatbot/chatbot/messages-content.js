// components/chatbot/messages-content.js
import React from "react";
import UserSendMessage from "./user-send-message";
import BotResponseMessage from "./bot-response-message";

const MessagesContent = ({ messages, token, clientId }) => {
  const messageGroups = [];
  let i = 0;

  while (i < messages.length) {
    const currentMessage = messages[i];
    let group = { userMessage: null, botMessage: null };

    if (currentMessage.sender === "user") {
      group.userMessage = currentMessage;
      i++;
      if (i < messages.length && messages[i].sender === "bot") {
        group.botMessage = messages[i];
        i++;
      }
    } else if (currentMessage.sender === "bot") {
      group.botMessage = currentMessage;
      i++;
    } else {
      i++;
    }

    messageGroups.push(group);
  }

  return (
    <>
      <div className="flex flex-col mb-[20px]">
        {messageGroups.map((group, index) => (
          <div
            key={index}
            className={`flex flex-col md:px-[50px] py-[30px] ${
              index !== messageGroups.length - 1
                ? "border-b-[1px] border-b-solid border-b-[#999a9c88]"
                : ""
            }`}
          >
            {group.userMessage && (
              <UserSendMessage text={group.userMessage.text} />
            )}
            {group.botMessage && (
              <BotResponseMessage
                text={group.botMessage.text}
                messageId={group.botMessage.messageId}
                token={token}
                clientId={clientId}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default MessagesContent;
