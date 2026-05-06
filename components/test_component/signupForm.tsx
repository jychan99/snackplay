"use server";

import { revalidatePath } from "next/cache";

export async function createUser(formData: FormData) {
  const id = formData.get("id");
  const password = formData.get("password");
  const nickname = formData.get("nickname");

  await fetch("http://localhost:3000/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, password, nickname }),
  });

  revalidatePath("/testpage");
}

export default async function SignupForm() {
  return (
    <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
      <div className="mt-8 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-black dark:text-zinc-50">
          회원가입 테스트
        </h2>
        <form action={createUser}>
          <input
            name="id"
            placeholder="아이디"
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
          />
          <br />
          <input
            name="password"
            placeholder="비밀번호"
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
          />
          <br />
          <input
            name="nickname"
            placeholder="닉네임"
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
          />
          <br />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            회원가입
          </button>
        </form>
      </div>
    </main>
  );
}
