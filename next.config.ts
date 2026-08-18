import type { NextConfig } from "next";

const r2PublicUrl = process.env.R2_PUBLIC_URL;
const r2Hostname = r2PublicUrl ? new URL(r2PublicUrl).hostname : undefined;

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // CSS를 HTML <head> 내 <style> 태그로 인라인 삽입하여 차단 요청 제거
    inlineCss: true,
  },

  images: {
    remotePatterns: r2Hostname
      ? [
          {
            protocol: "https",
            hostname: r2Hostname,
          },
        ]
      : [],
    // 기본 목록(32~384)과 640 사이 간격이 커서, 300px 배너처럼 작은 반응형 이미지에 맞는 값 추가
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 525],
  },
};

export default nextConfig;
