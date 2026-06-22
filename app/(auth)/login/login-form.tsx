"use client";
import Link from "next/link";
import Button from "@/components/ui/Button";
import CheckInput from "@/components/ui/CheckInput";
import Input from "@/components/ui/Input";
import { useActionState, useEffect, useState } from "react";
import Alert from "@/components/ui/Alert";
export type LoginState = {
  alertId?: number;
  error?: string;
  success?: boolean;
};

type LoginAction = (
  state: LoginState,
  formData: FormData,
) => Promise<LoginState>;

export default function LoginFormClient({ action }: { action: LoginAction }) {
  const [state, formAction, isPending] = useActionState(action, {});
  // const [savedId, setSavedId] = useState(false);
  const [open, setOpen] = useState(false); // alert ui
  const [alert, setAlert] = useState({
    ttl: "",
    desc: "",
    onConfirm: undefined as (() => void) | undefined,
  });
  useEffect(() => {
    if (state.error) {
      setOpen(true);
      setAlert({
        ttl: "로그인 오류",
        desc: state.error,
        onConfirm: () => {},
      });
    }
  }, [state.alertId, state.error]);

  return (
    <>
      <form action={formAction}>
        <h1 className="sr-only">로그인</h1>
        <div className="box-custom">
          <div className="mb-10 text-center">
            <div className="w-[163px] mb-3 mx-auto">
              <img
                className="w-full"
                src="/images/logo.png"
                alt="snackplay logo"
              />
            </div>
            <p className="text-body-m text-text-sub">
              <b>SnackPlay</b>에 오신 분들 환영합니다.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <Input
              label="아이디"
              id="login_id"
              type="text"
              placeholder="아이디를 입력해주세요"
              name="id"
            />
            <Input
              label="비밀번호"
              id="login_pw"
              type="password"
              name="password"
            />
          </div>
          {/* <Link
            className="inline-block text-caption px-2.5 py-1.25 text-secondary mb-6"
            href="/password"
          >
            비밀번호 찾기
          </Link> */}
          {/* <CheckInput
            checked={savedId}
            onChange={(e) => setSavedId(e.target.checked)}
            id="CheckInput"
            label="아이디 저장"
          /> */}
          <Button
            disabled={isPending}
            type="submit"
            className="mt-6 mb-10 w-full"
            variant="primary"
          >
            로그인
          </Button>
          <div className="border-t-1 border-primary-light pt-8">
            <span className="text-text-sub">현재 계정이 없으신가요?</span>
            <Link href="/signup" className="text-secondary">
              회원가입하러 가기
            </Link>
          </div>
        </div>
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
