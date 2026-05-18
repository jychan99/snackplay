import type { USER_MAIN } from "@/types/index";

interface UserInfoProps {
  users: USER_MAIN[] | USER_MAIN | null;
}

export default function UserInfo({ users }: UserInfoProps) {
  const userList = Array.isArray(users) ? users : users ? [users] : [];

  return (
    <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
      <div className="mt-8 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-black dark:text-zinc-50">
          사용자 목록 조회테스트
        </h2>
        {userList.length > 0 ? (
          <ul className="space-y-2">
            {userList.map((user: USER_MAIN, index: number) => (
              <li
                key={index}
                className="p-3 bg-zinc-100 dark:bg-zinc-700 rounded-md"
              >
                <p className="font-medium text-black dark:text-zinc-50">
                  NICKNAME : {user.nickname}
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  ID: {user.id}
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  PASSWORD: {user.password}
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
  );
}
