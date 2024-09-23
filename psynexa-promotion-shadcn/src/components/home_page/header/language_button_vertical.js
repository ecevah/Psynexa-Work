import { ENGLAND_LOGO_SVG, TURKEY_LOGO_SVG } from "@/constant/image_constant";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export const LanguageButtonVertical = () => {
  const router = useRouter();
  const pathname = usePathname();

  const languages = ["en", "tr"];
  const defaultLang = "en";

  const langRegex = /^\/(en|tr)(\/|$)/;
  const match = pathname.match(langRegex);

  let currentLang = match ? match[1] : defaultLang;
  const targetLang = currentLang === "en" ? "tr" : "en";

  const newPath = match
    ? pathname.replace(langRegex, `/${targetLang}$2`)
    : `/${targetLang}${pathname}`;

  const handleLanguageChange = () => {
    router.push(newPath);
  };

  return (
    <div className="h-[56px] w-[56px] relative cursor-pointer">
      <div className="absolute top-0 left-0 h-[56px] hover:h-[115px] w-[56px] bg-white rounded-full border-[8px] border-solid border-white overflow-hidden z-[20000] flex flex-col justify-between transition-all duration-300 ease-in-out">
        <Image
          src={currentLang === "en" ? ENGLAND_LOGO_SVG : TURKEY_LOGO_SVG}
          alt={`Current language: ${currentLang.toUpperCase()}`}
          width={40}
          height={40}
          style={{
            objectFit: "cover",
            borderRadius: 20,
            minHeight: 40,
            boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 1)",
          }}
        />
        <Image
          src={targetLang === "en" ? ENGLAND_LOGO_SVG : TURKEY_LOGO_SVG}
          alt={`Switch to ${targetLang.toUpperCase()}`}
          width={40}
          height={40}
          style={{
            objectFit: "cover",
            borderRadius: 20,
            minHeight: 40,
            boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 1)",
          }}
          onClick={handleLanguageChange}
        />
      </div>
    </div>
  );
};
