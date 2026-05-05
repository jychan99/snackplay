"use client";
import Button from "@/components/ui/Button";
import Link from "next/link";
import BaseLink from "@/components/ui/BaseLink";

import { useState } from "react";
export default function Header() {
  const [isShowMenu, setIsShowMenu] = useState(false);
  return (
    <header className="flex items-center justify-center md:py-6 py-1 shadow-[0_10px_40px_0_rgba(255, 77, 148, 0.08)]">
      <div className="flex items-center justify-between w-7xl px-8">
        <h1 className="w-[130px] md:w-40.75 md:h-8">
          <img src="/images/logo.png" alt="snackplay logo" />
          <span className="sr-only">snackplay</span>
        </h1>
        {/* 로고 */}
        <button
          type="button"
          className="md:hidden relative z-11 w-11 h-10 border-1 p-1.5"
          onClick={() => setIsShowMenu(true)}
        >
          <em className="sr-only">
            모바일 메뉴
            {isShowMenu ? <span>닫기</span> : <span>열기</span>}
          </em>
          <span className="w-6 h-0.5 bg-text-sub block absolute "></span>
          <span className="w-6 h-0.5 bg-text-sub block  absolute top-2.5"></span>
          <span className="w-6 h-0.5 bg-text-sub block   absolute top-7"></span>
        </button>
        {isShowMenu && (
          <nav className="right-0 top-0 fixed flex-col items-center bg-background z-10 w-67.5 h-full p-7 md:hidden shadow-2xl">
            <Menu></Menu>
            <hr className="border-1 border-border-sub mt-2 mb-6 w-full" />
            <Utils></Utils>
          </nav>
        )}
        {/* 모바일 */}
        <nav className="md:flex items-center justify-between w-[60%] hidden">
          <Menu></Menu>
          <Utils></Utils>
        </nav>
        {/* PC */}
      </div>
    </header>
  );
}

export function Menu() {
  return (
    <ul className="flex gap-6">
      <li>
        <Link
          href="/game"
          className="p-1 hover:border-b-2 hover:text-primary font-bold"
        >
          미니 게임
        </Link>
      </li>
      <li>
        <Link
          href="/test"
          className="p-1 hover:border-b-2 hover:text-primary font-bold"
        >
          미니 테스트
        </Link>
      </li>
    </ul>
  );
}

export function Utils() {
  const [isLogin, setIsLogin] = useState(false);

  return isLogin ? (
    <div className="flex items-center justify-between">
      <div className="border-4 border-primary rounded-button w-10 h-10 overflow-hidden mr-2">
        <img
          src="/images/sample_user.png"
          alt="user image"
          className="w-full h-full object-cover"
        />
      </div>
      <span>가가가님</span>
    </div>
  ) : (
    <div className="flex items-center justify-between gap-3">
      <BaseLink href="/" variant="outline" size="sm">
        로그인
      </BaseLink>
      <Button variant="primary" size="sm">
        로그아웃
      </Button>
    </div>
  );
}
