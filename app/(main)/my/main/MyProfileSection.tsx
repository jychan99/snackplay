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
};
import Input from "@/components/ui/Input";
import { modifyMyInfo } from "@/lib/my";
import Alert from "@/components/ui/Alert";
import { useRouter } from "next/navigation";

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
        <UserModify userData={user ?? null} />
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

export function UserModify({ userData }: MenuProps) {
  const id = userData?.id;
  console.log(userData?.id);
  const [nickName, setNickName] = useState(userData?.nickname);
  const [password, setPassword] = useState("111");
  const [passwordConfirm, setPasswordConfirm] = useState("111");
  const [open, setOpen] = useState(false); // alert ui
  const [alert, setAlert] = useState({
    ttl: "",
    desc: "",
    onConfirm: undefined as (() => void) | undefined,
  });
  const router = useRouter();
  async function modifyMyInfo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (nickName == "") {
      setOpen(true);
      setAlert({
        ttl: "닉네임 미입력",
        desc: "닉네임을 입력해주세요.",
        onConfirm: () => {},
      });
      return;
    }

    // if (password !== passwordCheck) {
    //   setOpen(true);
    //   setAlert({
    //     ttl: "비밀번호/비밀번호 확인 불일치",
    //     desc: "비밀번호를 다시 입력해주세요.",
    //     onConfirm: () => {},
    //   });
    //   return;
    // }

    try {
      const res = await fetch("/api/mypage/editprofile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          nickName,
          password,
          passwordConfirm,
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
          router.push("/my");
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
      <form onSubmit={modifyMyInfo}>
        <div className="flex-1 mt-4 sm:ml-10 mb-4 sm:mb-0 sm:mt-0 ">
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
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
            placeholder="테스트입니다"
          />
          {/* <div className="flex gap-5">
            <Input
              label="비밀번호 수정"
              id="user_pw"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="테스트입니다"
            />
            <Input
              label="비밀번호 확인"
              id="user_pw_check"
              type="password"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              placeholder="테스트입니다"
            />
          </div> */}
        </div>
        <Button variant="primary" size="sm" type="submit">
          수정완료
        </Button>
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
