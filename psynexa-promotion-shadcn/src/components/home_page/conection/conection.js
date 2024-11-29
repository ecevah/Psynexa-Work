import Image from "next/image";
import React, { useEffect } from "react";
import { ARROW_WHITE, HAND_ICON } from "@/constant/icon_constant";
import "./conection.css";
import { useTranslations } from "next-intl";

export default function Conection() {
  const t = useTranslations("HomePage");
  const items = t.raw("conectionCard");
  const makeItRain = () => {
    document.querySelectorAll(".rain").forEach((rain) => (rain.innerHTML = ""));

    let increment = 0;
    let drops = "";
    let backDrops = "";

    while (increment < 100) {
      const randoHundo = Math.floor(Math.random() * 98) + 1;
      const randoFiver = Math.floor(Math.random() * 4) + 2;

      increment += randoFiver;

      const animationDuration = Math.random() * 1 + 1;

      const dropHTML = `<div class="drop" style="left: ${increment}%; bottom: ${
        randoFiver + randoFiver - 1 + 100
      }%; animation-delay: 0.${randoHundo}s; animation-duration: ${animationDuration}s;"><div class="stem" style="animation-delay: 0.${randoHundo}s; animation-duration: ${animationDuration}s;"></div><div class="splat" style="animation-delay: 0.${randoHundo}s; animation-duration: ${animationDuration}s;"></div></div>`;
      const backDropHTML = `<div class="drop" style="right: ${increment}%; bottom: ${
        randoFiver + randoFiver - 1 + 100
      }%; animation-delay: 0.${randoHundo}s; animation-duration: ${animationDuration}s;"><div class="stem" style="animation-delay: 0.${randoHundo}s; animation-duration: ${animationDuration}s;"></div><div class="splat" style="animation-delay: 0.${randoHundo}s; animation-duration: ${animationDuration}s;"></div></div>`;

      drops += dropHTML;
      backDrops += backDropHTML;
    }

    document.querySelector(".rain.front-row").innerHTML += drops;
    document.querySelector(".rain.back-row").innerHTML += backDrops;
  };

  useEffect(() => {
    makeItRain();
  }, []);

  return (
    <>
      <div
        className={"darkBlueGradient py-[96px] relative overflow-hidden"}
        data-aos="fade-right"
        id="conection"
      >
        <div className="rain front-row z-[100] hidden"></div>
        <div className="rain back-row z-[100] hidden"></div>
        <div className="layout bg-color-white-list pl-[24px] pt-[24px] pb-[24px] relative rounded-[32px] flex flex-row justify-between items-center z-[102]">
          <div className="flex flex-col px-[20px] py-[20px]">
            <div className="text-[36px] leading-[40px] sm:text-[50px] sm:leading-[54px] font-bold text-white max-w-[530px] w-[85%]">
              {items.title}
            </div>
            <div className="mt-[24px] mb-[48px] sm:text-[17px] leading-[26px] text-white max-w-[430px] w-[85%]">
              {items.description}
            </div>
            <div className="w-fit relative">
              <input
                type="text"
                className="z-[111] py-[12px] pl-[16px] pr-[56px] placeholder:text-[17px] placeholder:text-[#0B1215] placeholder:opacity-[0.7] placeholder:font-medium max-w-[340px] rounded-[32px]"
                placeholder="bilgi@psynexa.com"
              />
              <Image
                src={ARROW_WHITE}
                width={40}
                height={40}
                className="bg-[#0B1215] rounded-full p-[8px] absolute right-[7px] top-[4px]"
                alt="arrow"
              />
            </div>
          </div>
          <Image
            src={HAND_ICON}
            alt="hand"
            width={611}
            height={415}
            className="lg:block hidden"
          />
        </div>
      </div>
    </>
  );
}
