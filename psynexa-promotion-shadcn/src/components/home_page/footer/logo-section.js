import { FOOTER_SOCIAL_ICONS } from "@/constant/constant";
import { FACEBOOK_ICON, YOUTUBE_ICON } from "@/constant/icon_constant";
import { FOOTER_LOGO_SVG } from "@/constant/image_constant";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function LogoSection() {
  return (
    <div className="flex flex-col">
      <Image
        src={FOOTER_LOGO_SVG}
        height={81}
        width={307}
        alt="logo"
        className="mb-[29px]"
        data-aos="fade-down"
      />
      <div className="lg:flex hidden flex-row ">
        <Link
          href={"https://www.youtube.com/@Psynexa"}
          className="w-[48px] h-[48px] rounded-full flex justify-center items-center bg-[#EEF5FF] p-[12px] mr-[16px]"
          data-aos="fade-up"
        >
          <Image src={YOUTUBE_ICON} alt="facebook" width={24} height={24} />
        </Link>
        {FOOTER_SOCIAL_ICONS.map((item, index) => (
          <Link
            href={item.link}
            key={`Social Icon ${index}`}
            data-aos="fade-up"
            className="w-[48px] h-[48px] rounded-full flex justify-center items-center bg-[#EEF5FF] p-[12px] mx-[16px]"
          >
            <Image src={item.icon} alt="icon" width={24} height={24} />
          </Link>
        ))}
      </div>
    </div>
  );
}
