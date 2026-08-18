import type { NextConfig } from "next";

const r2PublicUrl = process.env.R2_PUBLIC_URL;
const r2Hostname = r2PublicUrl ? new URL(r2PublicUrl).hostname : undefined;

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // 렌더링을 차단하는 Critical CSS를 HTML 내부에 인라인화하여 LCP/FCP를 개선합니다.
    optimizeCss: true,
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
