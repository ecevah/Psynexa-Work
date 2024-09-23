"use client";
import React from "react";
import styles from "./footer.module.css";
import Copyright from "./copyright";
import Image from "next/image";
import { FOOTER_LOGO_SVG } from "@/constant/image_constant";
import { FACEBOOK_ICON, YOUTUBE_ICON } from "@/constant/icon_constant";
import { FOOTER_SOCIAL_ICONS } from "@/constant/constant";
import LogoSection from "./logo-section";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("HomePage");
  const items = t.raw("footer");
  const h = useTranslations("Header");
  const header_items = h.raw("items");
  const handleScroll = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <footer className="layout flex flex-col" id="contact">
      <div className="flex lg:flex-row flex-col lg:justify-between lg:items-start items-center pt-[96px] pb-[72px]">
        <LogoSection />
        <div className="flex flex-row max-[380px]:flex-col">
          <div className="flex flex-col lg:text-start text-center">
            <div
              className="text-[24px] font-medium leading-[101%] text-[#0B1215] mb-[24px]"
              data-aos="fade-down"
            >
              {items.navigateTitle}
            </div>
            {header_items.map((item, index) => (
              <div
                onClick={() => handleScroll(item.href)}
                key={index}
                className="text-[17px] font-normal leading-normal text-[#0B1215] hover:text-[#0A6EBD] mb-[20px]"
                data-aos="fade-up"
              >
                {item.label}
              </div>
            ))}
          </div>
          <div className="flex flex-col lg:ml-[100px] ml-[50px] max-[380px]:ml-0 lg:text-start text-center">
            <div
              className="text-[24px] font-medium leading-[101%] text-[#0B1215] mb-[24px]"
              data-aos="fade-dowb"
            >
              {items.legalTitle}
            </div>
            {items.legalContent.map((item, index) => (
              <div
                target="_blank"
                href={item.href}
                key={index}
                className="text-[17px] font-normal leading-normal text-[#0B1215] hover:text-[#0A6EBD] mb-[20px]"
                data-aos="fade-up"
              >
                {item.title}
              </div>
            ))}
          </div>
          <div className="lg:flex hidden flex-col ml-[50px]">
            <div
              className="text-[24px] font-medium leading-[101%] text-[#0B1215] mb-[24px]"
              data-aos="fade-down"
            >
              {items.contactTitle}
            </div>
            {items.contactContent.map((item, index) => (
              <div
                key={index}
                className="text-[17px] font-normal leading-normal text-[#0B1215] hover:text-[#0A6EBD] mb-[20px]"
                data-aos="fade-up"
              >
                {item.content}
              </div>
            ))}
          </div>
        </div>
        <div className="lg:hidden flex flex-col lg:ml-[50px] text-center">
          <div
            className="text-[24px] font-medium leading-[101%] text-[#0B1215] mb-[24px]"
            data-aos="fade-down"
          >
            {items.contactTitle}
          </div>
          {items.contactContent.map((item, index) => (
            <div
              key={index}
              className="text-[17px] font-normal leading-normal text-[#0B1215] hover:text-[#0A6EBD] mb-[20px]"
              data-aos="fade-up"
            >
              {item.content}
            </div>
          ))}
        </div>
        <div className="flex lg:hidden flex-row ">
          <Link
            target="_blank"
            href={"https://www.youtube.com/@Psynexa"}
            className="w-[48px] h-[48px] rounded-full flex justify-center items-center bg-[#EEF5FF] p-[12px] mr-[16px]"
            data-aos="fade-up"
          >
            <Image src={YOUTUBE_ICON} alt="facebook" width={24} height={24} />
          </Link>
          {FOOTER_SOCIAL_ICONS.map((item, index) => (
            <Link
              href={item.link}
              target="_blank"
              key={`Social Icon ${index}`}
              data-aos="fade-up"
              className="w-[48px] h-[48px] rounded-full flex justify-center items-center bg-[#EEF5FF] p-[12px] mx-[16px]"
            >
              <Image src={item.icon} alt="icon" width={24} height={24} />
            </Link>
          ))}
        </div>
      </div>
      <div>
        <Copyright />
      </div>
    </footer>
  );
}
