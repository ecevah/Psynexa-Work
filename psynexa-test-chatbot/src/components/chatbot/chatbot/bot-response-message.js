// components/chatbot/bot-response-message.js
import React, { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { LuCopy } from "react-icons/lu";
import { IoMdMore, IoMdCheckmark } from "react-icons/io";
import axios from "axios";
import { HOST_NAME } from "@/config/config";

const BotResponseMessage = ({
  text = "",
  messageId,
  token,
  sessionId,
  clientId,
}) => {
  const [enableClick, setEnableClick] = useState(true);
  const [dislike, setDislike] = useState(false);
  const [like, setLike] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");

  const handleLike = async () => {
    setLike(true);
    setDislike(false);
    setEnableClick(false);
    await sendFeedback(true, "");
  };

  const handleDislike = () => {
    setDislike(true);
    setLike(false);
    setShowCommentBox(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setIsCopy(true);
    setTimeout(() => {
      setIsCopy(false);
    }, 1000);
  };

  const handleSubmitComment = async () => {
    await sendFeedback(false, comment);
    setEnableClick(false);
    setShowCommentBox(false);
    setComment("");
  };

  const sendFeedback = async (status, desc) => {
    try {
      await axios.post(
        `${HOST_NAME}/feedback`,
        {
          message_id: messageId,
          status: status,
          desc: desc,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error sending feedback:", error);
    }
  };

  return (
    <div className="glassmorphism">
      <div className="flex flex-row items-center mt-[10px] cursor-default w-fit">
        <div className="text-[20px] font-medium text-[#0A6EBD] italic">
          NEXABot
        </div>
        <IoArrowForwardCircleOutline
          className="rotate-45 mx-[5px]"
          size={23}
          color="#0A6EBD"
        />
      </div>
      <div className="mt-2 text-[16px] font-normal text-black md1368:text-sm">
        {text}
      </div>
      <div className="flex flex-row mt-[30px]">
        <div className="flex flex-row px-[15px] py-[8px] rounded-full bg-white w-fit">
          <AiOutlineLike
            onClick={enableClick ? handleLike : null}
            size={18}
            className="mr-[5px] cursor-pointer"
            color={like ? "#30db5b" : "#999A9C"}
          />
          <div className="bg-[#999A9C] w-[1px] h-[17px] mt-[1px] mx-[5px]"></div>
          <AiOutlineLike
            onClick={enableClick ? handleDislike : null}
            size={18}
            className="mr-[5px] cursor-pointer rotate-180"
            color={dislike ? "#ff6961" : "#999A9C"}
          />
          <div className="bg-[#999A9C] w-[1px] h-[17px] mt-[1px] mx-[5px]"></div>
          {isCopy ? (
            <IoMdCheckmark
              size={18}
              className="mr-[5px] cursor-pointer rotate-270"
              color="#999A9C"
            />
          ) : (
            <LuCopy
              onClick={handleCopy}
              size={18}
              className="mr-[5px] cursor-pointer rotate-270"
              color="#999A9C"
            />
          )}
        </div>
        <div className="p-[8px] bg-white rounded-full ml-[20px] hidden">
          <IoMdMore size={18} color="#999A9C" className="cursor-pointer" />
        </div>
      </div>

      {showCommentBox && (
        <div className="mt-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Lütfen yorumunuzu yazın..."
            className="w-full p-2 bg-transparent border-[1px] border-[#0a6fbd8d] rounded-[20px]"
          ></textarea>
          <button
            onClick={handleSubmitComment}
            className="mt-2 px-4 py-2 bg-[#0A6EBD] hover:bg-[#326d9b] text-white rounded-full"
          >
            Gönder
          </button>
        </div>
      )}
    </div>
  );
};

export default BotResponseMessage;
