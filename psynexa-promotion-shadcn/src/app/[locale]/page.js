"use client";
import * as React from "react";
import { useTranslations } from "next-intl";
import Header from "@/components/home_page/header/header";

export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <>
      <h1>{t("title")}</h1>
      <Header />
    </>
  );
}
