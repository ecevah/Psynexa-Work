import { ENGLAND_LOGO_SVG, TURKEY_LOGO_SVG } from "@/constant/image_constant";
import Image from "next/image";
import React from "react";
import { useRouter, usePathname } from "next/navigation";

export const LanguageButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  const languages = ["en", "tr"];
  const defaultLang = "en";

  let currentLang = defaultLang;
  let targetLang = "";
  let newPath = "";

  const langRegex = /^\/(en|tr)(\/|$)/;
  const match = pathname.match(langRegex);

  if (match) {
    currentLang = match[1];
    targetLang = currentLang === "en" ? "tr" : "en";
    newPath = pathname.replace(langRegex, `/${targetLang}$2`);
  } else {
    currentLang = defaultLang;
    targetLang = currentLang === "en" ? "tr" : "en";
    newPath = `/${targetLang}${pathname}`;
  }

  const handleLanguageChange = () => {
    router.push(newPath);
  };

  return (
    <button
      className="relative  h-[58px] w-[58px] rounded-full border-[8px] border-solid border-white overflow-hidden cursor-pointer"
      onClick={handleLanguageChange}
      aria-label={`Switch to ${targetLang.toUpperCase()}`}
    >
      <Image
        src={targetLang === "en" ? ENGLAND_LOGO_SVG : TURKEY_LOGO_SVG}
        alt={`Switch to ${targetLang.toUpperCase()}`}
        fill
        style={{ objectFit: "cover" }}
      />
    </button>
  );
};
