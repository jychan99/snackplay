import { headers } from "next/headers";

// fetch 호출 시 로컬 / 상용 분기
export async function getBaseUrl() {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "http";

  if (host) {
    return `${protocol}://${host}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}
