import LoginForm, { type LoginState } from "./login-form";

export const metadata = {
  title: "로그인",
};

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginUser(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  "use server";

  const id = formData.get("id");
  const password = formData.get("password");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, password }),
    },
  );

  // 오류 시
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));

    return {
      alertId: Date.now(),
      error:
        res.status === 409
          ? "아이디 및 비밀번호가 일치하지 않습니다."
          : data.error || "로그인에 실패했습니다.",
    };
  }

  const data = await res.json();
  const cookieStore = await cookies();

  // 토큰 저장
  cookieStore.set("authToken", data.token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
  });

  // 메인 이동
  redirect("/");
}

export default async function Page() {
  return <LoginForm action={loginUser} />;
}
