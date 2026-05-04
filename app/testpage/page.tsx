import ArrowIcon2 from "@/components/icon/ArrowIcon2";
import Button from "@/components/ui/Button";
import Link from "@/components/ui/Link";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import type { USER_MAIN } from "@/types/user";

async function getUsers() {
  try {
    const res = await fetch("http://localhost:3000/api/users", {
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

export default async function Home() {
  const users = await getUsers();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Link href="/" ariaLabel="게임 하러가기">
        View All
      </Link>
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <ArrowIcon2 size={40} color="red" />
        <Button
          variant="primary"
          disabled
          icon={<ArrowIcon2 size={16} color="red" />}
        >
          children
        </Button>
        <Badge color="primary">학교</Badge>
        <Badge color="secondary">학교</Badge>
        <Input label="이름" id="test1" type="text" placeholder="테스트입니다" />
        <Input
          label="나이"
          id="test2"
          disabled
          type="number"
          placeholder="테스트입니다"
        />
        <Button variant="primary" icon={<ArrowIcon2 size={16} color="red" />}>
          클릭하기
        </Button>
        <Button variant="primary" size="sm">
          클릭하기
        </Button>

        <div className="mt-8 w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4 text-black dark:text-zinc-50">
            사용자 목록
          </h2>
          {users.length > 0 ? (
            <ul className="space-y-2">
              {users.map((user: USER_MAIN) => (
                <li
                  key={user.id}
                  className="p-3 bg-zinc-100 dark:bg-zinc-700 rounded-md"
                >
                  <p className="font-medium text-black dark:text-zinc-50">
                    {user.nickName}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    ID: {user.id}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-zinc-600 dark:text-zinc-400">
              등록된 사용자가 없습니다.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
