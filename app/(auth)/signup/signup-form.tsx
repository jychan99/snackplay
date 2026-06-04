"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import CheckInput from "@/components/ui/CheckInput";
import { useState, useRef } from "react";
import Alert from "@/components/ui/Alert";
import { useRouter } from "next/navigation";
export default function Page() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");
  const [checked, setChecked] = useState(false);

  const [open, setOpen] = useState(false); // alert ui
  const [alert, setAlert] = useState({
    ttl: "",
    desc: "",
    onConfirm: undefined as (() => void) | undefined,
  });
  const router = useRouter();

  async function SignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (id == "") {
      setOpen(true);
      setAlert({
        ttl: "미입력 항목 발생",
        desc: "아이디를 입력해주세요.",
        onConfirm: () => {},
      });
      return;
    }
    if (nickname == "") {
      setOpen(true);
      setAlert({
        ttl: "미입력 항목 발생",
        desc: "닉네임을 입력해주세요.",
        onConfirm: () => {},
      });
      return;
    }
    if (password == "" || passwordCheck == "") {
      setOpen(true);
      setAlert({
        ttl: "미입력 항목 발생",
        desc: "비밀번호를 입력해주세요.",
        onConfirm: () => {},
      });
      return;
    }
    if (!checked) {
      setOpen(true);
      setAlert({
        ttl: "회원 약관",
        desc: "회원가입을 위해서는 회원약관 동의가 필요합니다.",
        onConfirm: () => {},
      });
      return;
    }
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          password,
          nickname,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "회원가입 실패");
      }

      setOpen(true);
      setAlert({
        ttl: "회원가입 성공",
        desc: "스낵플레이의 회원이 되셨습니다. 로그인해서 다양한 테스트를 즐겨보세요.",
        onConfirm: () => {
          router.push("/");
        },
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setOpen(true);
        setAlert({
          ttl: "회원가입 실패",
          desc: err.message,
          onConfirm: () => {},
        });
      } else {
        setOpen(true);
        setAlert({
          ttl: "회원가입 실패",
          desc: "네트워크 오류",
          onConfirm: () => {},
        });
      }
    }
  }

  return (
    <>
      <form onSubmit={SignUp}>
        <div className="w-[163px] mb-5 mx-auto">
          <img className="w-full" src="/images/logo.png" alt="snackplay logo" />
        </div>
        <div className="box-custom">
          <div className="mb-10 text-center">
            <h1 className="text-h3">회원가입</h1>
          </div>
          <div className="flex flex-col gap-6">
            <Input
              label="아이디"
              id="signup_id"
              type="text"
              placeholder="아이디를 입력해주세요"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            {/* ref={idRef} */}
            <Input
              label="닉네임"
              id="signup_nickname"
              type="text"
              placeholder="닉네임를 입력해주세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <Input
              label="비밀번호"
              id="signup_password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              label="비밀번호 확인"
              id="signup_password_check"
              type="password"
              placeholder="동일한 비밀번호를 입력해주세요"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
            <div>
              <CheckInput
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                id="CheckInput"
                label="회원약관에 동의합니다."
              />
              <div className="mt-2 max-h-[100px] overflow-auto text-caption p-4 border-1 border-border-sub bg-background rounded-box">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor
                sed fuga ipsa, perspiciatis nisi architecto, asperiores non
                ipsam error repudiandae exercitationem odit quasi in est eos.
                Porro a dolor pariatur laboriosam, quas soluta! Quos aspernatur
                esse quae nobis aliquam nisi quas voluptates, doloribus, cumque
                a ipsa doloremque eum odio explicabo pariatur itaque autem
                numquam ut eos delectus nemo alias! Minima dolores, libero
                inventore temporibus deleniti cumque quisquam quam nobis.
                Temporibus tempora aliquam dolorem officia dicta nam sequi quas,
                hic, vitae, veniam blanditiis voluptates alias ad veritatis nemo
                deserunt nesciunt quos. At, numquam illo mollitia aspernatur
                nobis atque eos recusandae excepturi.
              </div>
            </div>
          </div>
          <Button className="mt-6 w-full" type="submit" variant="primary">
            회원가입하기
          </Button>
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
