import React from "react";
import styles from "./widget.module.css";
import Image from "next/image";
import { ARROW_WHITE, COMPUTER, ROBOT, WATCH } from "@/constant/icon_constant";

export default function SolutionsItem({ title, description, index }) {
  const icons = [ROBOT, WATCH, COMPUTER];
  return (
    <div
      className={`${styles.solutionsCard} flex flex-col `}
      data-aos="fade-up"
    >
      <div
        className={`${styles.solutionsCardIcon} flex justify-center items-center`}
      >
        <Image src={icons[index % 3]} width={24} height={24} alt="icon" />
      </div>
      <div className="text-[24px] max-[865px]:text-[20px] font-bold leading-tight text-white mt-[32px] max-[865px]:mt-[20px] mb-[16px] max-[865px]:mb-[12px]">
        {title}
      </div>
      <div className="text-[17px] max-[865px]:text-[15px] font-normal leading-normal text-white">
        {description}
      </div>
    </div>
  );
}
