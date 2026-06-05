// react query 클라이언트용 유저 api 함수
export interface User {
  id: string;
  nickname: string;
  role: string;
}

export async function getCurrentUserClient() {
  const res = await fetch("/api/users");

  if (!res.ok) {
    throw new Error("유저 조회 실패");
  }

  return res.json() as Promise<User | null>;
}
