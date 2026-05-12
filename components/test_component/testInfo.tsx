import type { TEST_MAIN } from "@/types/index";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

interface TestInfoProps {
  tests: TEST_MAIN[];
}

export async function handleLike(formData: FormData) {
  "use server";

  const testId = formData.get("testId");
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  await fetch("http://localhost:3000/api/users/like", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Cookie: `authToken=${token}` } : {}),
    },
    body: JSON.stringify({ testId }),
  });

  revalidatePath("/testpage");
}

export default function TestInfo({ tests }: TestInfoProps) {
  return (
    <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
      <div className="mt-8 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-black dark:text-zinc-50">
          테스트 목록 조회 테스트
        </h2>
        {tests.length > 0 ? (
          <ul className="space-y-2">
            {tests.map((test: TEST_MAIN) => (
              <li
                key={test.testId}
                className="p-3 bg-zinc-100 dark:bg-zinc-700 rounded-md"
              >
                <p className="font-medium text-black dark:text-zinc-50">
                  TEST_TITLE : {test.testTitle}
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  TEST_ID : {test.testId}
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  TEST_INFO: {test.testInfo}
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  TEST_HASHTAG: {test.hashtag}
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  LIKE: {test.like}
                </p>
                <form action={handleLike}>
                  <input type="hidden" name="testId" value={test.testId} />
                  <button
                    type="submit"
                    className="mt-2 rounded-md bg-pink-500 px-3 py-1 text-sm text-white hover:bg-pink-600"
                  >
                    좋아요
                  </button>
                </form>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-zinc-600 dark:text-zinc-400">
            등록된 테스트가 없습니다.
          </p>
        )}
      </div>
    </main>
  );
}
