import React from "react";
import SessionListItem from "./session-list-item";

const SessionList = ({
  sessions,
  currentSessionId,
  setCurrentSessionId,
  deleteSession,
  sessionListRef,
  setIsSidebarOpen,
}) => {
  return (
    <>
      <div
        ref={sessionListRef}
        className="scrollHidden w-full h-full relative flex flex-col items-start justify-start py-[10px] overflow-y-scroll overflow-x-visible"
      >
        <div className="bgWhiteToTransparentUp w-full h-[60px] absolute bottom-0 z-100"></div>
        {sessions.map((session) => (
          <SessionListItem
            key={session.id}
            session={session}
            isActive={session.id === currentSessionId}
            onClick={() => {
              setCurrentSessionId(session.id);

              if (window.innerWidth <= 1368) {
                setIsSidebarOpen(false);
              }
            }}
            onDelete={() => deleteSession(session.id)}
          />
        ))}
      </div>
    </>
  );
};

export default SessionList;
