"use client";
import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { COOKIE } from "@/constant/image_constant";

export default function Cookie() {
  const t = useTranslations("Cookies");

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const storedVisibility = localStorage.getItem("cookieConsent");
    if (storedVisibility === "true") {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, []);

  const handleButtonClick = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };

  return (
    <>
      <div
        className={
          isVisible
            ? "drop-shadow-lg rounded-md bg-white fixed z-[39] bottom-5 left-5 flex flex-row justify-between items-center pt-[16px] px-[24px] mr-5"
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
              onClick={handleButtonClick}
            >
              {t("accept")}
            </Button>
            <Button
              className="bg-transparent border-solid border-[1px] border-black text-black rounded-full font-medium text-[17px] mb-[16px]"
              onClick={handleButtonClick}
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
