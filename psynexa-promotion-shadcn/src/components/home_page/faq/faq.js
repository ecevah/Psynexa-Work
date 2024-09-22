import React from "react";
import FaqItem from "./faq-item";
import { useTranslations } from "next-intl";
import styles from "./faq.module.css";

export default function Faq() {
  const t = useTranslations("HomePage");
  const items = t.raw("faqCard");
  return (
    <div
      className="layout flex flex-col items-center !pt-[96px] !pb-[96px]"
      id="faq"
      data-aos="fade-up"
    >
      <div
        className={`${styles.title} text-[36px] md:text-[50px] font-bold leading-[40px] md:leading-[54px] md:max-w-[550px] max-w-[330px] text-center mb-[96px]`}
      >
        {items.title}
      </div>
      <div className="max-w-[824px] w-full mx-auto flex flex-col faq-item">
        {items.content.map((item, index) => (
          <FaqItem
            title={item.question}
            text={item.answer}
            key={`Faq Item ${index}`}
          />
        ))}
      </div>
    </div>
  );
}
