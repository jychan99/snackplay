import ArrowIcon2 from "@/components/icon/ArrowIcon2";
import Button from "@/components/ui/Button";
import Link from "@/components/ui/ViewAllLink";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import type { USER_MAIN, GAME_MAIN } from "@/types/index";
import { revalidatePath } from "next/cache";

//GET
//사용자목록 조회 테스트
async function getUsers() {
  try {
    const res = await fetch("http://localhost:3000/api/users", {
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
//게임목록 조회 테스트
getGames;
async function getGames() {
  try {
    const res = await fetch("http://localhost:3000/api/game", {
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
    console.error("getGames 에러:", error);
    throw error;
  }
}

//POST
//회원가입
async function createUser(formData: FormData) {
  "use server";

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

  //데이터갱신
  revalidatePath("/testpage");
}

//POST
//로그인
async function joinUser(formData: FormData) {
  "use server";
  const id = formData.get("id");
  const password = formData.get("password");

  await fetch("http://localhost:3000/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, password }),
  });

  //데이터갱신
  revalidatePath("/testpage");
}

//POST
//게임추가
async function createGame(formData: FormData) {}

export default async function Home() {
  const users = await getUsers();
  const games = await getGames();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Link href="/" ariaLabel="게임 하러가기">
        View All
      </Link>
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="mt-8 w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4 text-black dark:text-zinc-50">
            사용자 목록 조회테스트
          </h2>
          {users.length > 0 ? (
            <ul className="space-y-2">
              {users.map((user: USER_MAIN) => (
                <li
                  key={user.id}
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
      <hr />
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="mt-8 w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4 text-black dark:text-zinc-50">
            회원가입 테스트
          </h2>
          <form action={createUser}>
            <input name="id" placeholder="아이디" />
            <input name="password" placeholder="비밀번호" />
            <input name="nickname" placeholder="닉네임" />
            <button type="submit">회원가입</button>
          </form>
        </div>
      </main>
      <hr />
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="mt-8 w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4 text-black dark:text-zinc-50">
            로그인 테스트
          </h2>
          <form action={joinUser}>
            <input name="id" placeholder="아이디" />
            <input name="password" placeholder="비밀번호" />
            <button type="submit">로그인</button>
          </form>
        </div>
      </main>
      <hr />
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="mt-8 w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4 text-black dark:text-zinc-50">
            게임 목록 조회테스트
          </h2>
          {games.length > 0 ? (
            <ul className="space-y-2">
              {games.map((game: GAME_MAIN) => (
                <li
                  key={game.gameIdPk}
                  className="p-3 bg-zinc-100 dark:bg-zinc-700 rounded-md"
                >
                  <p className="font-medium text-black dark:text-zinc-50">
                    GANE_TITLE : {game.gameTitle}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    GAME_ID_PK: {game.gameIdPk}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    GAME_TYPE_CODE: {game.gameTypeCode}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    GAME_INFO: {game.gameInfo}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    GAME_HASHTAG: {game.gameHashtag}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    GAME_T_QUESTIONS: {game.gameTQuestions}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    GAME_T_ANSWERS: {game.gameTAnswers}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-zinc-600 dark:text-zinc-400">
              등록된 게임이 없습니다.
            </p>
          )}
        </div>
      </main>
      <hr />
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="mt-8 w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4 text-black dark:text-zinc-50">
            게임추가 테스트
          </h2>
          <form action={createGame}>
            <input name="gameTitle" placeholder="게임제목" />
            <input name="gameTypeCode" placeholder="게임타입코드" />
            <input name="gameInfo" placeholder="게임정보" />
            <input name="gameHashtag" placeholder="게임해시태그" />
            <input name="gameTQuestions" placeholder="게임질문들" />
            <input name="gameTAnswers" placeholder="게임답변들" />
            <button type="submit">회원가입</button>
          </form>
        </div>
      </main>
    </div>
  );
}
