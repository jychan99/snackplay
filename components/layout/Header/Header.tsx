"use client";
import Button from "@/components/ui/Button";
import Link from "next/link";
import BaseLink from "@/components/ui/BaseLink";
import type { User } from "@/lib/api/user";
import { useState, useEffect } from "react";
import { logout } from "@/actions/auth";
import { useMobileMenuStore } from "@/store/mobileMenuStore";
import { loadImages } from "@/lib/image";

import { useCurrentUser } from "@/hooks/useCurrentUser";
type MenuProps = {
  userData: User | null | undefined;
};
export default function Header() {
  const [isShowMenu, setIsShowMenu] = useState(false);

  const { open, openMenu, closeMenu } = useMobileMenuStore();

  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return null;
  }

  return (
    <header className="flex items-center justify-center md:py-6 py-1 shadow-[0_10px_40px_0_rgba(255,77,148,0.08)] bg-white">
      <div className="flex items-center justify-between w-7xl px-8">
        <h1 className="w-[130px] md:w-40.75 md:h-8">
          <Link href="/">
            <img src="/images/logo.png" alt="snackplay logo" />
          </Link>
          <span className="sr-only">snackplay</span>
        </h1>
        {/* 로고 */}
        <button
          type="button"
          className="md:hidden w-10 h-10 p-1.5 relative -right-2"
          // onClick={() => setIsShowMenu(true)}
          onClick={openMenu}
        >
          <em className="sr-only">모바일 메뉴 열기</em>
          <span className="w-6 h-0.5 bg-text-sub block absolute "></span>
          <span className="w-6 h-0.5 bg-text-sub block absolute top-2.5"></span>
          <span className="w-6 h-0.5 bg-text-sub block absolute top-7"></span>
        </button>
        {open && (
          <nav className="right-0 top-0 fixed flex-col items-center bg-background z-10 w-67.5 h-full p-7 md:hidden shadow-2xl">
            <button
              onClick={closeMenu}
              // onClick={() => setIsShowMenu(false)}
              type="button"
              aria-label="모바일 메뉴 닫기"
              className="absolute right-6 top-1"
            >
              <img src="/images/icons/icon_close.svg" alt="close icon" />
            </button>
            <Menu userData={user ?? null}></Menu>
            <hr className="border-1 border-border-sub mt-2.5 mb-6 w-full" />
            <Utils userData={user ?? null}></Utils>
          </nav>
        )}
        {/* 모바일 */}
        <nav className="md:flex items-center justify-between w-[60%] hidden">
          <Menu userData={user ?? null}></Menu>
          <Utils userData={user ?? null}></Utils>
        </nav>
        {/* PC */}
      </div>
    </header>
  );
}

export function Menu({ userData }: MenuProps) {
  return (
    <ul className="flex md:flex-row flex-col  md:gap-6 gap-2.5">
      <li className="flex">
        <Link
          href="/game"
          className="p-2 md:p-1 border-b-2 border-white"
          style={{ color: "lightgray" }}
        >
          미니 게임
        </Link>
      </li>
      <li className="flex">
        <Link
          href="/test"
          className="p-2 md:p-1 border-b-2 border-white hover:border-primary hover:text-primary font-bold"
        >
          미니 테스트
        </Link>
      </li>

      {userData && userData?.role == "A" && (
        <li className="flex">
          <Link
            href="/studio/test"
            className="p-2 md:p-1 border-b-2 border-white hover:border-primary hover:text-primary font-bold"
          >
            테스트 만들기
          </Link>
        </li>
      )}
    </ul>
  );
}

export function Utils({ userData }: MenuProps) {
  // const img = loadImages();
  return userData && userData ? (
    <div className="flex gap-3">
      <Link href="/my" className="flex items-center justify-between">
        <div className="border-4 border-primary rounded-button w-10 h-10 overflow-hidden mr-2">
          <img
            src="/images/sample_user.png"
            alt="user image"
            className="w-full h-full object-cover"
          />
        </div>
        <span>{userData?.nickname}</span>
      </Link>
      <form action={logout}>
        <Button type="submit" size="sm">
          로그아웃
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex items-center md:gap-3 gap-2">
      <BaseLink href="/login" variant="outline" size="sm">
        로그인
      </BaseLink>
    </div>
  );
}
