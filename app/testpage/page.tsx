import ArrowIcon2 from "@/components/icon/ArrowIcon2";
import Button from "@/components/ui/Button";
import Link from "@/components/ui/ViewAllLink";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import UserInfo from "@/components/test_component/userInfo";
import SignupForm from "@/components/test_component/signupForm";
import LoginForm from "@/components/test_component/LoginForm";
import TestInfo from "@/components/test_component/testInfo";
import CreateTestForm from "@/components/test_component/createTestForm";
import type { USER_MAIN, TEST_MAIN } from "@/types/index";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

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
    const res = await fetch(`${await getBaseUrl()}/api/users`, {
      method: "GET",
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

//GET
//테스트 목록 조회 테스트
async function getTests() {
  try {
    const res = await fetch(`${await getBaseUrl()}/api/test/list`, {
      method: "GET",
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
    console.error("getTests 에러:", error);
    throw error;
  }
}

export default async function Home() {
  const users = await getUsers();
  const tests = await getTests();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Link href="/" ariaLabel="게임 하러가기">
        View All
      </Link>
      <UserInfo users={users} />
      <hr />
      <SignupForm />
      <hr />
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="mt-8 w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4 text-black dark:text-zinc-50">
            로그인 테스트
          </h2>
          <LoginForm />
        </div>
      </main>
      <hr />
      <TestInfo tests={tests} />
      <hr />
      <hr />
      <CreateTestForm />
      <hr />
    </div>
  );
}
