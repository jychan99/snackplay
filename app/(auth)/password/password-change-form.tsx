"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Alert from "@/components/ui/Alert";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
export default function PasswordChagneForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false); // alert ui
  const [alert, setAlert] = useState({
    ttl: "",
    desc: "",
    onConfirm: undefined as (() => void) | undefined,
  });
  //myId: string
  async function changePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password");
    const passwordCheck = formData.get("password-check");

    // 1. 아이디 가져오기 현재 하드코딩
    const id = "hahye0513";

    // 2. input 다채워져있는지
    if (password == "" || passwordCheck == "") {
      setOpen(true);
      setAlert({
        ttl: "비밀번호 미입력",
        desc: "비밀번호를 입력해주세요.",
        onConfirm: () => {},
      });
      return;
    }
    // 3. 비밀번호와 비밀번호 확인이 일치하는지
    if (password != passwordCheck) {
      setOpen(true);
      setAlert({
        ttl: "비밀번호/비밀번호 확인 불일치",
        desc: "비밀번호를 다시 입력해주세요.",
        onConfirm: () => {},
      });
      return;
    }

    if (id) {
      try {
        const res = await fetch("/api/auth/editpassword", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id,
            password,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "비밀번호 변경 실패");
        }
        setOpen(true);
        setAlert({
          ttl: "비밀번호 변경 완료",
          desc: "변경된 비밀번호로 로그인 해주세요",
          onConfirm: () => {
            router.push("/login");
          },
        });
      } catch (err: unknown) {
        if (err instanceof Error) {
          setOpen(true);
          setAlert({
            ttl: "비밀번호 변경 실패",
            desc: err.message,
            onConfirm: () => {},
          });
        } else {
          setOpen(true);
          setAlert({
            ttl: "비밀번호 변경 실패",
            desc: "네트워크 오류",
            onConfirm: () => {},
          });
        }
      }
    }
  }

  return (
    <>
      <form onSubmit={changePassword}>
        <div className="flex flex-col gap-6">
          {/* <Input
          label="기존 비밀번호"
          id="pw_before"
          type="password"
          placeholder="기존 비밀번호를 입력해주세요"
        /> */}
          <Input
            label="비밀번호"
            id="pw_new"
            type="password"
            placeholder="새로운 비밀번호를 입력해주세요"
            name="password"
          />
          <Input
            label="비밀번호 확인"
            id="pw_new_check"
            type="password"
            name="password-check"
            placeholder="동일한 비밀번호를 입력해주세요"
          />
        </div>
        <Button type="submit" className="mt-6 mb-10 w-full" variant="primary">
          비밀번호 변경
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
