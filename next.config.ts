import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // 렌더링을 차단하는 Critical CSS를 HTML 내부에 인라인화하여 LCP/FCP를 개선합니다.
    optimizeCss: true,
  },
};

export default nextConfig;
