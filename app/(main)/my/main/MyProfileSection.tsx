"use client";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import CameraIcon from "@/components/icon/CameraIcon";
import { useState } from "react";
import type { User } from "@/lib/api/user";
import { useCurrentUser } from "@/hooks/useCurrentUser";
type MenuProps = {
  userData: User | null | undefined;
  setModifyInfo: (value: boolean) => void;
};
import Input from "@/components/ui/Input";
import { modifyMyInfo } from "@/lib/my";
import Alert from "@/components/ui/Alert";
import Link from "next/link";

type UserInfoProps = {
  userData: {
    id: string;
    nickname: string;
  };
};

export default function MyProfileSection() {
  //{ userData }: UserInfoProps
  // const userData = getCurrentUser();
  const { data: user, isLoading } = useCurrentUser();

  const [modifyInfo, setModifyInfo] = useState(false);
  return (
    <section className="flex flex-col sm:flex-row items-center box-custom mb-10 max-w-[1280px] w-full mx-auto ">
      <h2 className="sr-only">my info</h2>
      <div>
        <div className="relative">
          <div className="relative w-[152px] h-[152px] border-4 overflow-hidden rounded-button padding-0.5">
            <Image
              className="object-cover"
              src="/images/image_banner.png"
              alt=""
              fill
              priority
            />
          </div>
          <button className="absolute bottom-0 right-0 w-10 h-10 rounded-button border-2 flex items-center justify-center bg-primary border-white shadow-[0_2px_4px_-1px_rgba(0,0,0,0.2)]">
            <span className="sr-only">내 이미지 변경</span>
            <CameraIcon size={24} />
          </button>
        </div>
      </div>
      {modifyInfo ? (
        <UserModify userData={user ?? null} setModifyInfo={setModifyInfo} />
      ) : (
        <>
          <div className="flex-1 mt-4 sm:ml-10 mb-4 sm:mb-0 sm:mt-0 text-center sm:text-left">
            <h3 className="text-h2">{user?.nickname}</h3>
            <p className="text-body-m text-text-sub ">{user?.id}</p>
            <div className="flex gap-2 mt-6 justify-center sm:justify-start">
              <Badge>첫 스타터</Badge>
              {/* <Badge variant="secondary"></Badge> */}
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setModifyInfo(true)}
          >
            수정하기
          </Button>
        </>
      )}
    </section>
  );
}

export function UserModify({ userData, setModifyInfo }: MenuProps) {
  const id = userData?.id;
  const [nickname, setnickname] = useState(userData?.nickname);

  const [open, setOpen] = useState(false); // alert ui
  const [alert, setAlert] = useState({
    ttl: "",
    desc: "",
    onConfirm: undefined as (() => void) | undefined,
  });
  async function modifyMyInfo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (nickname == userData?.nickname) {
      setOpen(true);
      setAlert({
        ttl: "닉네임 일치",
        desc: "기존 닉네임과 일치합니다.",
        onConfirm: () => {},
      });
      return;
    }
    if (nickname == "") {
      setOpen(true);
      setAlert({
        ttl: "닉네임 미입력",
        desc: "닉네임을 입력해주세요.",
        onConfirm: () => {},
      });
      return;
    }

    try {
      const res = await fetch("/api/mypage/editprofile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          nickname,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "회원정보수정 실패");
      }

      setOpen(true);
      setAlert({
        ttl: "회원정보수정 성공",
        desc: "회원정보가 수정 되었습니다.",
        onConfirm: () => {
          window.location.href = "/my";
        },
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setOpen(true);
        setAlert({
          ttl: "회원정보수정 실패",
          desc: err.message,
          onConfirm: () => {},
        });
      } else {
        setOpen(true);
        setAlert({
          ttl: "회원정보수정 실패",
          desc: "네트워크 오류",
          onConfirm: () => {},
        });
      }
    }
  }
  return (
    <>
      <form onSubmit={modifyMyInfo} className="flex flex-1 relative">
        <div className="flex-1 mt-4 sm:ml-10 mb-4 sm:mb-0 sm:mt-0">
          <Input
            className="mb-5"
            label="아이디"
            disabled
            id="user_id"
            type="text"
            value={id}
            placeholder="테스트입니다"
          />
          <Input
            className="mb-5"
            label="닉네임"
            id="user_nickname"
            type="text"
            value={nickname}
            onChange={(e) => setnickname(e.target.value)}
            placeholder="테스트입니다"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          type="button"
          className="self-center mr-2"
          onClick={() => setModifyInfo(false)}
        >
          취소
        </Button>
        <Button
          variant="primary"
          size="sm"
          type="submit"
          className="self-center"
        >
          수정완료
        </Button>
        <Link
          className="inline-block text-caption px-2.5 py-1.25 text-secondary mb-6 absolute bottom-0 right-0"
          href="/password"
        >
          비밀번호 변경하기
        </Link>
      </form>
      <Alert
        open={open}
        onOpenChange={setOpen}
        data={alert}
        onConfirm={() => {
          setOpen(false);
          if (alert.onConfirm) {
            alert.onConfirm();
          }
        }}
      />
    </>
  );
}
