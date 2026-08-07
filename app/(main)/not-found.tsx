import type { Metadata } from "next";
import NotFoundSection from "@/components/display/NotFoundSection";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없어요",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return <NotFoundSection />;
}
