import React from "react";
import styles from "./about-us.module.css";
import { useTranslations } from "next-intl";
import AquaCard from "@/components/widget/aqua-card";
import Image from "next/image";
import { ABOUT_ICON } from "@/constant/icon_constant";
import { DEVICE_1_PNG, DEVICE_2_PNG } from "@/constant/image_constant";
import { useIntersectionObserver } from "@/service/hooks/useIntersectionObserver";

export default function AboutUs() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0 });
  const t = useTranslations("HomePage");
  const items = t.raw("aboutCard");
  return (
    <>
      <div className="overflow-hidden">
        <div className={`${styles.layout} relative`} id="about-us">
          <div className="flex flex-col !pt-[128px] max-[1160px]:!pt-[48px] ">
            <AquaCard title={items.card} />
            <div ref={ref} className="pb-[240px] max-[1160px]:pb-[401px]">
              <div
                className="md:text-[50px] text-[36px] font-bold leading-[101%] mt-[20px] mb-[32px] max-w-[361px]"
                data-aos="fade-right"
              >
                {items.title}
              </div>
              <div className="flex flex-row items-center" data-aos="fade-right">
                <Image
                  src={ABOUT_ICON}
                  width={14}
                  height={148}
                  alt="About"
                  className="mr-[13px] md:max-h-[148px] max-h-[116px]"
                />
                <div className="text-[17px] font-semibold leading-normal sm:max-w-[596px] max-w-[326px] ">
                  {items.loadindText}
                </div>
              </div>
              <div
                className="text-[17px] font-medium leading-normal sm:max-w-[622px] max-w-[370px] mt-[20px]"
                data-aos="fade-right"
              >
                {items.text}
              </div>
            </div>
          </div>
          <Image
            src={DEVICE_1_PNG}
            width={1100}
            height={600}
            alt="device 1"
            className={isVisible ? styles.device1animate : styles.device1}
          />
          <Image
            src={DEVICE_2_PNG}
            width={900}
            height={500}
            alt="device 2"
            className={isVisible ? styles.device2animate : styles.device2}
          />
        </div>
      </div>
    </>
  );
}
