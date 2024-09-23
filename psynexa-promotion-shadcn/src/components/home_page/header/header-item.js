import { useRouter } from "next/navigation";
import React from "react";

export default function HeaderItem({ text, path }) {
  const router = useRouter();

  const handleScroll = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      onClick={() => handleScroll(path)}
      className="group font-semibold text-white text-[16px] leading-[26px] lg:mx-[16px] mx-[10px] cursor-pointer pt-4 pb-[14px] border-b-[2px] border-b-solid border-b-transparent hover:border-b-white relative"
    >
      {text}
      <div className="w-[45px] h-[45px] rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#B3D4FC1A] blur-[10.5px] hidden group-hover:block" />
    </div>
  );
}
