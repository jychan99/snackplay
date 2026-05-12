import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Checkbox from "@/components/ui/CheckBox";

export const metadata = {
  title: "회원가입",
};

export default function Page() {
  return (
    <>
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
          />
          <Input
            label="닉네임"
            id="signup_nickname"
            type="text"
            placeholder="닉네임를 입력해주세요"
          />
          <Input
            label="비밀번호"
            id="signup_pw"
            type="password"
            placeholder="비밀번호를 입력해주세요"
          />
          <Input
            label="비밀번호 확인"
            id="signup_pw_check"
            type="password"
            placeholder="동일한 비밀번호를 입력해주세요"
          />
          <div>
            <Checkbox id="checkbox" label="회원약관에 동의합니다." />
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
        <Button className="mt-6 w-full" variant="primary">
          회원가입하기
        </Button>
      </div>
    </>
  );
}
