import { neon } from "@neondatabase/serverless";

// 환경변수에서 DB URL 가져오기
const databaseUrl = process.env.NEONDB_API_URL;

if (!databaseUrl) {
  throw new Error("NEONDB_API_URL이 설정되지 않았습니다.");
}

// Neon 클라이언트 생성
export const sql = neon(databaseUrl);
