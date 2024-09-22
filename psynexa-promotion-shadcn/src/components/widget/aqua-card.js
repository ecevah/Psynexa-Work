import React from "react";

export default function AquaCard({ title }) {
  return (
    <div
      className={`aquaBlueGradient px-[24px] py-[12px] md:text-[20px] text-[17px] leading-snug font-medium text-white w-fit rounded-[12px]`}
      data-aos="fade-right"
    >
      {title}
    </div>
  );
}
