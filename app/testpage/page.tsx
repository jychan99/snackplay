"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { USER_MAIN } from "@/types/user";

export default function Home() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [signupData, setSignupData] = useState({
    id: "",
    password: "",
    nickname: "",
  });
  const [signupError, setSignupError] = useState("");

  const [users, setUsers] = useState<USER_MAIN[]>([]);

  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) {
          const text = await res.text();
          console.error("/api/users fetch failed", res.status, text);
          return;
        }

        const text = await res.text();
        if (!text) {
          console.error("/api/users returned empty response body");
          return;
        }

        const data = JSON.parse(text);
        setUsers(data);
      } catch (error) {
        console.error("Failed to load users", error);
      }
    }

    loadUsers();
  }, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError("");

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setSignupError(errorData.error || "회원가입 실패");
        return;
      }

      const newUser = await res.json();
      alert("회원가입 성공!");
      setIsSignupOpen(false);
      setSignupData({ id: "", password: "", nickname: "" });
      // users 상태 업데이트
      setUsers((prev) => [...prev, newUser]);
    } catch (error) {
      setSignupError("네트워크 오류");
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            This is login api test page
          </h1>
        </div>
        {/* USER 정보 가져오기 */}
        <div className="mt-8 w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4 text-black dark:text-zinc-50">
            사용자 목록
          </h2>
          {users.length > 0 ? (
            <ul className="space-y-2">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="p-3 bg-zinc-100 dark:bg-zinc-700 rounded-md"
                >
                  <p className="font-medium text-black dark:text-zinc-50">
                    {user.nickname}
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
        <form className="flex flex-col gap-4 mt-8 w-full max-w-sm">
          <input
            type="text"
            placeholder="ID"
            className="px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50"
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
        <button
          onClick={() => setIsSignupOpen(true)}
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
        >
          회원가입
        </button>
      </main>

      {/* 회원가입 다이얼로그 */}
      {isSignupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-black dark:text-zinc-50">
              회원가입
            </h2>
            <form onSubmit={handleSignup} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="ID"
                value={signupData.id}
                onChange={(e) =>
                  setSignupData({ ...signupData, id: e.target.value })
                }
                className="px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-50"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
                className="px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-50"
                required
              />
              <input
                type="text"
                placeholder="Nickname"
                value={signupData.nickname}
                onChange={(e) =>
                  setSignupData({ ...signupData, nickname: e.target.value })
                }
                className="px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-50"
                required
              />
              {signupError && (
                <p className="text-red-500 text-sm">{signupError}</p>
              )}
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  가입하기
                </button>
                <button
                  type="button"
                  onClick={() => setIsSignupOpen(false)}
                  className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
