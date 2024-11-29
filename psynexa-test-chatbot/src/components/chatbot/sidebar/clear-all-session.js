// clear-all-session.js
import React from "react";

const ClearAllSession = ({ title, button, onClear }) => {
  return (
    <>
      <div className="w-full border-b-[2px] border-b-[#F3F6FB] border-b-solid flex flex-row items-center justify-between py-[15px] px-[20px] font-medium">
        <div className="text-[#6E6E6E] cursor-default">{title}</div>
        {/*<div
          className="text-[#0A6EBD] cursor-pointer font-semibold hover:opacity-80"
          onClick={onClear}
        >
          {button}
        </div>*/}
      </div>
    </>
  );
};

export default ClearAllSession;
