"use client";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { COOKIE } from "@/constant/image_constant";

export default function Cookie() {
  const t = useTranslations("Cookies");

  const [isVisible, setIsVisible] = useState(true);
  return (
    <>
      <div
        className={
          isVisible
            ? "drop-shadow-lg rounded-md bg-white fixed z-[152] bottom-5 left-5 flex flex-row justify-between items-center pt-[16px] px-[24px]"
            : "hidden"
        }
      >
        <div className="flex flex-col">
          <div className="text-[22px] font-bold">{t("title")}</div>
          <div className="text-[14px] font-medium mb-[25px] max-w-[370px]">
            {t("description")}
          </div>
          <div>
            <Button
              className="bg-[#0A6EBD] text-white rounded-full font-bold text-[17px] mr-[10px] mb-[16px]"
              onClick={() => setIsVisible(false)}
            >
              {t("accept")}
            </Button>
            <Button
              className="bg-transparent border-solid border-[1px] border-black text-black rounded-full font-medium text-[17px] mb-[16px]"
              onClick={() => setIsVisible(false)}
            >
              {t("reject")}
            </Button>
          </div>
        </div>
        <Image
          src={COOKIE}
          alt="cookies"
          width={100}
          height={100}
          className="rotate-[-5deg]"
        />
      </div>
    </>
  );
}
