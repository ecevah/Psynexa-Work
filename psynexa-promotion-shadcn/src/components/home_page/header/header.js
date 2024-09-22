import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import HeaderItem from "./header-item";
import { HEADER_WHITE_LOGO_SVG } from "@/constant/image_constant";
import { Button } from "@/components/ui/button";
import { LanguageButton } from "./language_button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const t = useTranslations("Header");
  const items = t.raw("items");
  const handleScroll = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent body scrolling when the menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Clean up on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="flex flex-row justify-between items-center layout z-10 relative">
      <Image
        src={HEADER_WHITE_LOGO_SVG}
        alt="Logo"
        width={220}
        height={56}
        className=""
      />

      {/* Desktop Navigation */}
      <div className="hidden lg:flex flex-row xl:px-6 px-4 py-4 rounded-3xl border border-solid border-[#f5f5f500] bg-[#f5f5f51a] backdrop-blur-[17.5px]">
        {items.map((item, index) => (
          <HeaderItem
            key={`Header Item ${index}`}
            text={item.label}
            path={item.href}
          />
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden relative z-40">
        <Button
          variant="ghost"
          className="p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu color="#FFFFFF" size={24} />
        </Button>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[10000] darkBlueGradient">
            <div className="flex flex-col items-center justify-center h-full space-y-4 p-4 text-white relative">
              <Button
                variant="ghost"
                className="absolute top-4 right-4"
                onClick={() => setIsMenuOpen(false)}
              >
                <X color="#FFFFFF" size={24} />
              </Button>
              {items.map((item, index) => (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleScroll(item.href);
                  }}
                >
                  <HeaderItem
                    key={`Header Item Drawer ${index}`}
                    text={item.label}
                    path={item.href}
                  />
                </button>
              ))}
              <LanguageButton />
              <Button
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  handleScroll("contact");
                  setIsMenuOpen(false);
                }}
                variant="secondary"
                className="bg-white rounded-full text-xl font-semibold leading-6 text-black w-40 h-14 mt-4"
              >
                {t("button")}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="hidden lg:flex flex-row">
        <Button
          onClick={() => handleScroll("conection")}
          variant="secondary"
          className="bg-white rounded-full text-xl font-semibold leading-6 text-black xl:w-40 w-36 h-14 xl:mr-[40px] mr-[10px]"
        >
          {t("button")}
        </Button>
        <LanguageButton />
      </div>
    </header>
  );
}
