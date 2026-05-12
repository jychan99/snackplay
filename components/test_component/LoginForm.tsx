import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import LoginFormClient, { type LoginState } from "./LoginFormClient";

export async function loginUser(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  "use server";

  const id = formData.get("id");
  const password = formData.get("password");

  const res = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, password }),
  });

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

  cookieStore.set("authToken", data.token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
  });

  revalidatePath("/testpage");

  return { success: true };
}

export async function logoutUser() {
  "use server";

  const cookieStore = await cookies();
  cookieStore.delete("authToken");

  revalidatePath("/testpage");
}

export default async function LoginForm() {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (token) {
    return (
      <div className="space-y-3">
        <div className="p-4 bg-green-100 dark:bg-green-900 rounded-md">
          <p className="text-green-800 dark:text-green-100 font-medium">
            로그인 완료
          </p>
          <p className="text-sm text-green-700 dark:text-green-200 mt-1">
            토큰: {token.substring(0, 20)}...
          </p>
        </div>
        <form action={logoutUser}>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            로그아웃
          </button>
        </form>
      </div>
    );
  }

  return <LoginFormClient action={loginUser} />;
}
