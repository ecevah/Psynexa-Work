import React from "react";
import Header from "../header/header";
import styles from "./hero-card.module.css";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ARROW_BLACK_45, ARROW_WHITE } from "@/constant/icon_constant";
import Link from "next/link";

export default function HeroCard() {
  const t = useTranslations("HomePage");
  const items = t.raw("heroCard");
  const handleScroll = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className={styles.bgGradient}>
      <Header />
      <div
        className={`${styles.radialGradientWhite} absolute w-[500px] h-[500px] rounded-full z-0`}
      />
      <div className="ripple-container z-0">
        <div className={styles.ripple}></div>
        <div className={styles.ripple}></div>
        <div className={styles.ripple}></div>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center pb-[100px] z-0 relative ">
        <div className="font-black lg:text-[58px] text-[28px] sm:text-[43px] leading-snug text-center lg:max-w-[760px] max-w-[370px] sm:max-w-[450px] text-white">
          {items.title}
        </div>
        <div className=" font-normal text-[14px] leading-snug text-white text-center xl:max-w-[530px] max-w-[330px] sm:max-w-[470px] mt-[20px] md:mt-[26px]">
          {items.description}
        </div>
        <div className="flex flex-row items-center justify-center md:mt-[48px] mt-[64px] max-[364px]:flex-col ">
          <Button
            asChild
            className="bg-black md:w-[198px] w-[164px] h-[48px] md:h-[56px] rounded-full"
            onClick={() => handleScroll("about-us")}
          >
            <div className="flex flex-row items-center justify-between px-[16px]">
              <div className="text-white md:text-[20px] text-[14px] font-semibold leading-snug">
                {items.blackButton}
              </div>
              <Image
                src={ARROW_BLACK_45}
                width={40}
                height={40}
                className="bg-white rounded-full max-w-[32px] max-h-[32px] md:max-w-[40px] md:max-h-[40px]"
                alt="arrow-black"
              />
            </div>
          </Button>
          <Link
            target="_blank"
            className="border-[1px] border-solid border-white md:w-[198px] w-[164px] h-[48px] md:h-[56px] rounded-full bg-transparent ml-[12px] md:ml-[20px] max-[364px]:ml-0 max-[364px]:mt-[20px]"
            href={"https://www.youtube.com/watch?v=GsPH_GagYSY"}
          >
            <div className="flex flex-row items-center justify-between h-full px-[16px]">
              <div className="text-white md:text-[20px] text-[14px] font-semibold leading-snug">
                {items.whiteButton}
              </div>
              <Image
                src={ARROW_WHITE}
                width={40}
                height={40}
                className="max-w-[32px] max-h-[32px] md:max-w-[40px] md:max-h-[40px]"
                alt="arrow-white"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
