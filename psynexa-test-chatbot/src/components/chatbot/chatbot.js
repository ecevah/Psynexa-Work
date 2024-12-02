// components/chatbot/chatbot.js
"use client";
import React, { useState, useEffect } from "react";
import { encryptMessage, decryptMessage } from "@/utils/encryption";
import axios from "axios";
import SearchInput from "./chatbot/search-input";
import ContentList from "./chatbot/content-list";
import { HOST_NAME, SECRET_KEY } from "@/config/config";

const ChatBot = ({
  sessions,
  setSessions,
  currentSessionId,
  token,
  clientId,
  clientName,
}) => {
  const [loading, setLoading] = useState(false);
  const currentSession = sessions.find(
    (session) => session.id === currentSessionId
  );

  useEffect(() => {
    if (currentSession.backendSessionId) {
      fetchMessages(currentSession.backendSessionId);
    }
  }, [currentSessionId]);

  const fetchMessages = async (backendSessionId) => {
    try {
      const response = await axios.get(
        `${HOST_NAME}/responses/session/${backendSessionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        const messages = response.data.data
          .map((msg) => {
            const decryptedRequest = decryptMessage(msg.Request, SECRET_KEY);
            const decryptedResponse = decryptMessage(msg.Response, SECRET_KEY);
            return [
              {
                sender: "user",
                text: decryptedRequest,
                messageId: msg._id,
              },
              {
                sender: "bot",
                text: decryptedResponse,
                messageId: msg._id,
                feedback: msg.feedback, // { status: true/false, desc: "", _id: "id" } veya null
              },
            ];
          })
          .flat();

        setSessions((prevSessions) =>
          prevSessions.map((session) =>
            session.id === currentSessionId ? { ...session, messages } : session
          )
        );
      }
    } catch (error) {
      console.error("Mesajlar alınırken hata oluştu:", error);
    }
  };

  // Geri bildirim değiştiğinde mesajları yeniden çekmek için callback
  const handleFeedbackChange = () => {
    if (currentSession.backendSessionId) {
      fetchMessages(currentSession.backendSessionId);
    }
  };

  const handleSendMessage = async (messageText) => {
    const isFirstMessage = currentSession.messages.length === 0;

    setSessions((prevSessions) =>
      prevSessions.map((session) =>
        session.id === currentSessionId
          ? {
              ...session,
              name: isFirstMessage ? messageText : session.name,
              messages: [
                ...session.messages,
                { sender: "user", text: messageText },
              ],
            }
          : session
      )
    );

    setLoading(true);

    try {
      let backendSessionId = currentSession.backendSessionId;

      if (!backendSessionId) {
        const sessionResponse = await axios.post(
          `${HOST_NAME}/session`,
          {
            Client_ID: clientId,
            Device: "web",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        backendSessionId = sessionResponse.data.data._id;

        setSessions((prevSessions) =>
          prevSessions.map((session) =>
            session.id === currentSessionId
              ? { ...session, backendSessionId }
              : session
          )
        );
      }

      const encryptedMessage = encryptMessage(messageText, SECRET_KEY);

      const response = await axios.post(
        `${HOST_NAME}/generate`,
        {
          Session_ID: backendSessionId,
          Request: encryptedMessage,
          Device: "web",
          First: isFirstMessage,
          name: clientName,
          client_id: clientId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        const encryptedResponse = response.data.data.Response;
        const decryptedResponse = decryptMessage(encryptedResponse, SECRET_KEY);

        const messageId = response.data.data._id;

        setSessions((prevSessions) =>
          prevSessions.map((session) =>
            session.id === currentSessionId
              ? {
                  ...session,
                  messages: [
                    ...session.messages,
                    {
                      sender: "bot",
                      text: decryptedResponse,
                      messageId: messageId,
                      feedback: null, // Başlangıçta geri bildirim yok
                    },
                  ],
                }
              : session
          )
        );
      }
    } catch (error) {
      console.error("Mesaj gönderilirken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-full flex items-center justify-center relative z-10">
        <div className="w-full h-[150px] absolute bgWhiteToTransparentUpChatbot bottom-0 z-0"></div>
        <SearchInput onSendMessage={handleSendMessage} loading={loading} />
        <ContentList
          messages={currentSession.messages}
          token={token}
          clientId={clientId}
          refreshMessages={handleFeedbackChange} // Geri bildirim değiştiğinde mesajları yenile
        />
      </div>
    </>
  );
};

export default ChatBot;
