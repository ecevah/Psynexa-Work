"use client";
import * as React from "react";
import HeroCard from "@/components/home_page/hero-card/hero-card";
import AboutUs from "@/components/home_page/about-us/about-us";
import Solutions from "@/components/home_page/solutions/solutions";
import VideoCard from "@/components/home_page/video-card/video-card";
import Faq from "@/components/home_page/faq/faq";
import Conection from "@/components/home_page/conection/conection";

export default function HomePage() {
  return (
    <>
      <HeroCard />
      <AboutUs />
      <div className="flex flex-col darkBlueGradient">
        <Solutions />
        <VideoCard />
      </div>
      <Faq />
      <Conection />
    </>
  );
}
