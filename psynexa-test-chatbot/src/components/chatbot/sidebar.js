// components/chatbot/sidebar.js
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import NewSessionButton from "./sidebar/new-session-button";
import ClearAllSession from "./sidebar/clear-all-session";
import SessionList from "./sidebar/session-list";
import ProfileButton from "./sidebar/profile-button";
import { FiMenu } from "react-icons/fi";
import { LOGO } from "@/config/svg";

export const Sidebar = ({
  sessions,
  currentSessionId,
  setCurrentSessionId,
  addNewSession,
  clearAllSessions,
  deleteSession,
  clientName,
  onLogout,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const hasEmptySession = sessions.some(
    (session) => session.messages.length === 0
  );

  const sessionListRef = useRef(null);

  useEffect(() => {
    if (sessionListRef.current) {
      sessionListRef.current.scrollTop = sessionListRef.current.scrollHeight;
    }
  }, [sessions]);

  return (
    <>
      {/* Hamburger Menu Button */}
      <div className="md1368:block hidden absolute top-4 left-4 z-30">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-2xl p-2 rounded-md bg-white shadow-md"
        >
          <FiMenu />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`w-[350px] h-full rounded-[20px] bg-white flex flex-col items-start justify-start py-[20px] shadow-xl overflow-hidden z-40
          md1368:fixed md1368:top-0 md1368:left-0 md1368:h-full md1368:transform md1368:transition-transform md1368:duration-300
          ${
            isSidebarOpen ? "md1368:translate-x-0" : "md1368:-translate-x-full"
          }`}
      >
        {/* Close Button (Small screens) */}
        <div className="md1368:flex hidden w-full justify-end px-4">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-2xl p-2"
          >
            &times;
          </button>
        </div>
        <div className="flex flex-col border-b-[2px] border-b-[#F3F6FB] border-b-solid w-full pb-[10px]">
          <Image
            src={LOGO}
            width={200}
            height={60}
            alt="nexabot-logo"
            className="ml-[25px] mb-[25px]"
          />
          <NewSessionButton
            text="Yeni Sohbet"
            onClick={addNewSession}
            disabled={hasEmptySession}
          />
        </div>
        <ClearAllSession
          title="Sohbetleriniz"
          button="Tümünü Sil"
          onClear={clearAllSessions}
        />
        <SessionList
          sessions={sessions}
          currentSessionId={currentSessionId}
          setCurrentSessionId={setCurrentSessionId}
          deleteSession={deleteSession}
          sessionListRef={sessionListRef}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <ProfileButton text={clientName} onLogout={onLogout} />
      </div>

      {/* Overlay when Sidebar is open */}
      {isSidebarOpen && (
        <div
          className="md1368:block hidden fixed inset-0 bg-black opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};
