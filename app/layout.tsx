import type { Metadata } from "next";

// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import Providers from "@/components/providers";
const paperlogy = localFont({
  src: [
    {
      path: "./fonts/Paperlogy-4Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Paperlogy-5Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Paperlogy-6SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Paperlogy-7Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-paperlogy",
  display: "swap",
  preload: false,
});

const siteName = "스낵플레이";
const siteDescription = "재미있는 미니 게임, 테스트 사이트";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  title: {
    default: siteName,
    template: "%s | 스낵플레이",
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: "/",
    siteName,
    images: [
      {
        url: "/images/image_banner.webp",
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/images/image_banner.webp"],
  },
  verification: {
    google: "REPLACE_WITH_GOOGLE_SITE_VERIFICATION_CODE",
    other: {
      "naver-site-verification": "REPLACE_WITH_NAVER_SITE_VERIFICATION_CODE",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={cn("h-full", "antialiased", paperlogy.variable)}>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
