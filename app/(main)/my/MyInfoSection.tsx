"use client";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import CameraIcon from "@/components/icon/CameraIcon";
import { useState } from "react";

import Input from "@/components/ui/Input";

type UserInfoProps = {
  userData: {
    id: string;
    nickname: string;
  };
};

export default function MyInfoSection({ userData }: UserInfoProps) {
  // const userData = getCurrentUser();
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
        <UserModify />
      ) : (
        <>
          <div className="flex-1 mt-4 sm:ml-10 mb-4 sm:mb-0 sm:mt-0 text-center sm:text-left">
            <h3 className="text-h2">{userData.nickname}</h3>
            <p className="text-body-m text-text-sub ">{userData.id}</p>
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

export function UserModify() {
  return (
    <>
      <div className="flex-1 mt-4 sm:ml-10 mb-4 sm:mb-0 sm:mt-0 ">
        <Input
          className="mb-5"
          label="아이디"
          disabled
          id="user_id"
          type="text"
          placeholder="테스트입니다"
        />
        <Input
          className="mb-5"
          label="닉네임"
          id="user_nickname"
          type="text"
          placeholder="테스트입니다"
        />
        <div className="flex gap-5">
          <Input
            label="비밀번호 수정"
            id="user_pw"
            type="password"
            placeholder="테스트입니다"
          />
          <Input
            label="비밀번호 확인"
            id="user_pw_check"
            type="password"
            placeholder="테스트입니다"
          />
        </div>
      </div>
      <Button variant="primary" size="sm">
        수정완료
      </Button>
    </>
  );
}
