import type { TEST_MAIN } from "@/types/index";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { cookies,headers } from "next/headers";

async function getBaseUrl() {
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

//GET
//사용자목록 조회 테스트
async function getUsers() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;
    const res = await fetch(`${await getBaseUrl()}/api/users`, {
      method: "GET",
      headers: {
        ...(token ? { Cookie: `authToken=${token}` } : {}),
      },
      cache: "no-store", // 항상 최신 데이터
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("API 에러 응답:", res.status, errorData);
      throw new Error(
        `API 에러: ${res.status} - ${errorData.error || "알 수 없는 에러"}`,
      );
    }

    return res.json();
  } catch (error) {
    console.error("getUsers 에러:", error);
    throw error;
  }
}

interface TestInfoProps {
  tests: TEST_MAIN[];
}

export async function handleLike(formData: FormData) {
  "use server";

  const testId = formData.get("testId");
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  await fetch(`${await getBaseUrl()}/api/users/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Cookie: `authToken=${token}` } : {}),
    },
    body: JSON.stringify({ testId }),
  });

  revalidatePath("/testpage");
}

export default async function TestInfo({ tests }: TestInfoProps) {
  const users = await getUsers();
  const canEditQuestions = users?.role === "A";

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
                {canEditQuestions ? (
                  <Link
                    href={`/testpage/test/${test.testId}/questions`}
                    className="mt-2 inline-block rounded-md bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                  >
                    질문 편집
                  </Link>
                ) : null}
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
