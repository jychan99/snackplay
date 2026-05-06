"use client";

import { useState, useEffect } from "react";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 페이지 로드 시 localStorage에서 토큰 복원
  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const id = formData.get("id");
    const password = formData.get("password");

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "로그인 실패");
      }

      const data = await res.json();
      setToken(data.token);
      // 토큰을 localStorage에 저장
      localStorage.setItem("authToken", data.token);
      // 폼 초기화
      e.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "로그인 중 오류가 발생했습니다");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("authToken");
  };

  if (token) {
    return (
      <div className="space-y-3">
        <div className="p-4 bg-green-100 dark:bg-green-900 rounded-md">
          <p className="text-green-800 dark:text-green-100 font-medium">
            ✓ 로그인이 완료되었습니다!
          </p>
          <p className="text-sm text-green-700 dark:text-green-200 mt-1">
            토큰: {token.substring(0, 20)}...
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleLogin} className="space-y-3">
      <input
        name="id"
        placeholder="아이디"
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        disabled={isLoading}
      />
      <input
        name="password"
        type="password"
        placeholder="비밀번호"
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
      >
        {isLoading ? "로그인중입니다..." : "로그인"}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}
