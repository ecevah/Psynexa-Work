import { FAQ_ICON } from "@/constant/icon_constant";
import Image from "next/image";
import React, { useState } from "react";

export default function FaqItem(props) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <div
        className="flex flex-col mb-[48px] pb-[24px] relative cursor-pointer"
        onClick={() => setIsVisible(!isVisible)}
        data-aos="fade-up"
      >
        <div
          className="absolute h-[1px] w-full bottom-0"
          style={{
            backgroundImage: `linear-gradient(
            90deg,
            rgba(10, 110, 189, 0.8) -9.46%,
            rgba(10, 110, 189, 0.3) 46.33%,
            rgba(10, 110, 189, 0.15) 83.17%,
            rgba(10, 110, 189, 0.1) 100%
          )`,
            backgroundClip: "padding-box",
          }}
        ></div>
        <div className="flex flex-row w-full justify-between items-center cursor-pointer">
          <div className="text-[17px] leading-[26px] text-[#0B1215] font-medium">
            {props.title}
          </div>
          <div
            style={{
              transition: "transform 0.3s ease-in-out",
              transform: `rotate(${isVisible ? 45 : 0}deg)`,
            }}
          >
            <Image src={FAQ_ICON} alt="faq" width={24} height={24} />
          </div>
        </div>
        <div
          className={`transition-opacity duration-500 ease-in-out ${
            isVisible
              ? "opacity-100 max-h-[500px]"
              : "opacity-0 max-h-0 overflow-hidden"
          }`}
        >
          <p className="pt-[24px] text-[#0B1215] text-opacity-80">
            {props.text}
          </p>
        </div>
      </div>
    </>
  );
}
