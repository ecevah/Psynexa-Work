import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/home_page/footer/footer";
import ScrollUp from "@/components/widget/scrollUp";
import AosInitializer from "@/service/aos-initializer";
import Cookie from "@/components/widget/cookie";
import Script from "next/script";

// Metadata
export const metadata = {
  title: "Psynexa",
  description:
    "A BRIDGE THAT TOUCHES YOUR MIND AND OPENS TO THE FUTURE : PSYNEXA",
};

// Birleştirilmiş RootLayout bileşeni
export default async function RootLayout({ children, params: { locale } }) {
  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" type="image/svg" href="./favicon.svg" />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FTCHWV4BPL"
        ></Script>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || []; function gtag()
            {dataLayer.push(arguments)}
            gtag('js', new Date()); gtag('config', 'G-FTCHWV4BPL');
          `}
        </Script>
      </head>
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <AosInitializer />
            {children}
            <Cookie />
            <ScrollUp />
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
