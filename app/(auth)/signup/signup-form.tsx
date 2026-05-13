"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Checkbox from "@/components/ui/CheckBox";
import { useState, useRef } from "react";
export default function Page() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");
  const [checked, setChecked] = useState(false);

  // 유효성 검사 작업 필요!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // 유효성 검사 작업 필요!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // 유효성 검사 작업 필요!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // 유효성 검사 작업 필요!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // 유효성 검사 작업 필요!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // 유효성 검사 작업 필요!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // 유효성 검사 작업 필요!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // 유효성 검사 작업 필요!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  async function SignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

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

      if (res.ok) {
        alert("회원가입 성공!");
      } else {
        alert("회원가입 실패! 다시시도해주세요");
      }
    } catch (err) {
      alert("네트워크 오류");
    }
  }

  return (
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
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              id="checkbox"
              label="회원약관에 동의합니다."
            />
            <div className="mt-2 max-h-[100px] overflow-auto text-caption p-4 border-1 border-border-sub bg-background rounded-box">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor
              sed fuga ipsa, perspiciatis nisi architecto, asperiores non ipsam
              error repudiandae exercitationem odit quasi in est eos. Porro a
              dolor pariatur laboriosam, quas soluta! Quos aspernatur esse quae
              nobis aliquam nisi quas voluptates, doloribus, cumque a ipsa
              doloremque eum odio explicabo pariatur itaque autem numquam ut eos
              delectus nemo alias! Minima dolores, libero inventore temporibus
              deleniti cumque quisquam quam nobis. Temporibus tempora aliquam
              dolorem officia dicta nam sequi quas, hic, vitae, veniam
              blanditiis voluptates alias ad veritatis nemo deserunt nesciunt
              quos. At, numquam illo mollitia aspernatur nobis atque eos
              recusandae excepturi.
            </div>
          </div>
        </div>
        <Button className="mt-6 w-full" type="submit" variant="primary">
          회원가입하기
        </Button>
      </div>
    </form>
  );
}
