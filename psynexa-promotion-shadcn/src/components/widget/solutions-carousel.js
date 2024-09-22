"use client";
import React, { useState, useEffect } from "react";
import SolutionsItem from "./solutions-item";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

export default function SolutionsCarousel({ data }) {
  const [api, setApi] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };

    // İlk değer ataması
    setCurrentIndex(api.selectedScrollSnap());

    // Olay dinleyicisini ekleyin
    api.on("select", onSelect);

    // Temizlik işlemi
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const scrollTo = (index) => {
    if (!api) return;
    api.scrollTo(index);
  };

  return (
    <div className="!w-[100dvw] overflow-hidden">
      <Carousel className="!w-[98dvw] max-w-[390px] contents" setApi={setApi}>
        <CarouselContent>
          {data.map((item, index) => (
            <CarouselItem key={index} className="min-h-[250px]">
              <SolutionsItem
                title={item.title}
                description={item.description}
                index={index}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Noktalar */}
      <div className="flex justify-center mt-4">
        {data.map((_, index) => (
          <div
            key={index}
            className={`w-[12px] h-[12px] rounded-full mx-1 cursor-pointer ${
              index === currentIndex ? "bg-[#0A6EBD]" : "bg-[#F5F5F7]"
            }`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
