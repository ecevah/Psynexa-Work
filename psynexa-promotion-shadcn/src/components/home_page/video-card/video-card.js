import React from "react";
import styles from "./video-card.module.css";
import { useTranslations } from "next-intl";

export default function VideoCard() {
  const t = useTranslations("HomePage");
  const items = t.raw("videoCard");
  return (
    <>
      <div
        className="layout flex flex-col items-center md:!pt-[64px] pt-[48px] md:!pb-[264px] !pb-[48px]"
        id="video"
      >
        <div
          className={`${styles.title} text-center md:text-[50px] text-[36px] leading-[101%] font-bold md:max-w-[527px] max-w-[360px]`}
          data-aos="zoom-in"
        >
          {items.title}
        </div>
        <div className="text-center text-[17px] font-normal leading-normal text-white md:max-w-[493px] max-w-[370px] mt-[32px] mb-[64px]">
          {items.description}
        </div>
        <div
          className={`${styles.videoCard} w-full max-h-[440px] rounded-[32px] overflow-hidden `}
          data-aos="flip-up"
        >
          <iframe
            width="100%"
            height="440"
            src="https://www.youtube.com/embed/GsPH_GagYSY"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
}
