"use server";

import { revalidatePath } from "next/cache";

export async function createTest(formData: FormData) {
  const testTitle = formData.get("testTitle");
  const testInfo = formData.get("testInfo");
  const hashtag = formData.get("hashtag");

  await fetch("http://localhost:3000/api/test/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ testTitle, testInfo, hashtag }),
  });

  revalidatePath("/testpage");
}

export default async function CreateTestForm() {
  return (
    <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
      <div className="mt-8 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-black dark:text-zinc-50">
          테스트 생성 테스트
        </h2>
        <form action={createTest}>
          <input
            name="testTitle"
            placeholder="테스트제목"
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
          />
          <br />
          <input
            name="testInfo"
            placeholder="테스트 설명"
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
          />
          <br />
          <input
            name="hashtag"
            placeholder="해시태그"
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
          />
          <br />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            테스트 생성
          </button>
        </form>
      </div>
    </main>
  );
}
