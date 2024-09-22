import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";

export default function HeaderItem({ text, path }) {
  const router = useRouter();
  const handleScroll = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div
      onClick={() => handleScroll(path)}
      variant="link"
      className="font-semibold text-white text-[16px] leading-[26px] lg:mx-[16px] mx-[10px]"
    >
      {text}
    </div>
  );
}
