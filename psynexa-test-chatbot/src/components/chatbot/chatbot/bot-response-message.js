// components/chatbot/bot-response-message.js
import React, { useState, useEffect } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { LuCopy } from "react-icons/lu";
import { IoMdCheckmark } from "react-icons/io";
import axios from "axios";
import { HOST_NAME } from "@/config/config";

const BotResponseMessage = ({
  text = "",
  messageId,
  token,
  sessionId,
  clientId,
  feedback, // { status: true/false, desc: "", _id: "feedbackId" } or null
  onFeedbackUpdate, // Callback to refetch messages
}) => {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (feedback) {
      if (feedback.status === true) {
        setLike(true);
        setDislike(false);
      } else if (feedback.status === false) {
        setLike(false);
        setDislike(true);
        setShowCommentBox(true);
        setComment(feedback.desc || "");
      }
    } else {
      setLike(false);
      setDislike(false);
      setShowCommentBox(false);
      setComment("");
    }
  }, [feedback]);

  const handleLike = async () => {
    if (feedback) return; // Prevent changes if feedback exists

    try {
      await sendFeedback(true, ""); // Send like without comment
      setLike(true);
      if (onFeedbackUpdate) onFeedbackUpdate(); // Refetch messages
    } catch (error) {
      console.error("Error sending like feedback:", error);
    }
  };

  const handleDislike = () => {
    if (feedback) return; // Prevent changes if feedback exists

    setDislike(true);
    setShowCommentBox(true);
  };

  const handleSubmitDislike = async () => {
    if (comment.trim() === "") {
      alert("Lütfen yorumunuzu girin."); // "Please enter your comment."
      return;
    }

    try {
      await sendFeedback(false, comment);
      setShowCommentBox(false);
      if (onFeedbackUpdate) onFeedbackUpdate(); // Refetch messages
    } catch (error) {
      console.error("Error sending dislike feedback:", error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setIsCopy(true);
    setTimeout(() => {
      setIsCopy(false);
    }, 1000);
  };

  const sendFeedback = async (status, desc) => {
    try {
      if (!feedback) {
        // Create new feedback
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
      } else if (feedback._id) {
        // Update existing feedback
        await axios.put(
          `${HOST_NAME}/feedback/${feedback._id}`,
          {
            status: status,
            desc: desc,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        console.error("Güncellenecek geri bildirim kaydı bulunamadı.");
      }
    } catch (error) {
      console.error("Error sending feedback:", error);
      throw error; // Re-throw to handle in caller
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
          {/* Like Button */}
          <AiOutlineLike
            onClick={handleLike}
            size={18}
            className={`mr-[5px] cursor-pointer ${
              feedback ? "cursor-default" : ""
            }`}
            color={like ? "#30db5b" : "#999A9C"}
            title="Beğen"
          />
          <div className="bg-[#999A9C] w-[1px] h-[17px] mt-[1px] mx-[5px]"></div>
          {/* Dislike Button */}
          <AiOutlineLike
            onClick={handleDislike}
            size={18}
            className={`mr-[5px] cursor-pointer rotate-180 ${
              feedback ? "cursor-default" : ""
            }`}
            color={dislike ? "#ff6961" : "#999A9C"}
            title="Beğenme"
          />
          <div className="bg-[#999A9C] w-[1px] h-[17px] mt-[1px] mx-[5px]"></div>
          {/* Copy Button */}
          {isCopy ? (
            <IoMdCheckmark
              size={18}
              className="mr-[5px] cursor-default rotate-270"
              color="#999A9C"
              title="Kopyalandı!"
            />
          ) : (
            <LuCopy
              onClick={handleCopy}
              size={18}
              className="mr-[5px] cursor-pointer rotate-270"
              color="#999A9C"
              title="Kopyala"
            />
          )}
        </div>
        <div className="p-[8px] bg-white rounded-full ml-[20px] hidden">
          {/* Eğer gerekirse ekleyebilirsiniz */}
        </div>
      </div>

      {/* Comment Box for Dislike */}
      {showCommentBox && (
        <div className="mt-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Lütfen yorumunuzu yazın..."
            className="w-full p-2 bg-transparent border-[1px] border-[#0a6fbd8d] rounded-[20px]"
          ></textarea>
          <button
            onClick={handleSubmitDislike}
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
