import type { GAME_MAIN } from "@/types/index";

interface GameInfoProps {
  games: GAME_MAIN[];
}

export default function GameInfo({ games }: GameInfoProps) {
  return (
    <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
      <div className="mt-8 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-black dark:text-zinc-50">
          게임 목록 조회테스트
        </h2>
        {games.length > 0 ? (
          <ul className="space-y-2">
            {games.map((game: GAME_MAIN, index: number) => (
              <li
                key={index}
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
  );
}
