import type { Metadata } from "next";

// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
const paperlogy = localFont({
  src: [
    {
      path: "./fonts/Paperlogy-3Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Paperlogy-4Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Paperlogy-5Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Paperlogy-6SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Paperlogy-7Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Paperlogy-8ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-paperlogy",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "스낵플레이",
    template: "%s | 스낵플레이",
  },
  description: "재미있는 미니 게임, 테스트 사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${paperlogy.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
