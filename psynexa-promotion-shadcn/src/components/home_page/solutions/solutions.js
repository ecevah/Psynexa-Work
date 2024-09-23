import React from "react";
import styles from "./solutions.module.css";
import AquaCard from "@/components/widget/aqua-card";
import { useTranslations } from "next-intl";
import SolutionsItem from "@/components/widget/solutions-item";
import SolutionsCarousel from "@/components/widget/solutions-carousel";

export default function Solutions() {
  const t = useTranslations("HomePage");
  const items = t.raw("solutionsCard");
  return (
    <>
      <div
        className="flex flex-col !pt-[144px] !pb-[158px] layout"
        id="products"
      >
        <AquaCard title={items.card} />
        <div className="flex md:flex-row flex-col w-full justify-between mt-[20px] max-[865px]:mb-[72px] mb-[152px] md:items-center items-start">
          <div
            className={`${styles.title} md:text-[50px] text-[36px] font-bold leading-[101%] max-w-[361px] sm:min-w-[361px]`}
            data-aos="fade-right"
          >
            {items.title}
          </div>
          <div
            className="md:text-[17px] font-normal leading-normal max-w-[541px] text-white md:ml-[15px] mt-[20px] md:mt-0"
            data-aos="fade-left"
          >
            {items.description}
          </div>
        </div>
        <div
          className="grid max-[865px]:hidden xl:grid-cols-3 grid-cols-2 gap-10 justify-items-center"
          data-aos="zoom-in"
        >
          {items.content.map((item, index) => (
            <div
              key={index}
              className={` ${
                items.content.length % 2 === 1 &&
                index === items.content.length - 1
                  ? "col-span-2 xl:col-span-1"
                  : "col-span-1"
              }`}
            >
              <SolutionsItem
                title={item.title}
                description={item.description}
                index={index}
              />
            </div>
          ))}
        </div>
        <div
          className="hidden max-[865px]:flex items-center justify-center"
          data-aos="zoom-in"
        >
          <SolutionsCarousel data={items.content} />
        </div>
      </div>
    </>
  );
}
