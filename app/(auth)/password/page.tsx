import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export const metadata = {
  title: "비밀번호 변경",
};

export default function Page() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="w-[163px] mb-5 mx-auto">
        <img className="w-full" src="/images/logo.png" alt="snackplay logo" />
      </div>
      <div className="w-[448px] max-w-[90%] relative overflow-hidden rounded-modal bg-white p-10">
        <div className="absolute top-0 left-0 h-[4px] w-full bg-[linear-gradient(to_right,_#e040a0,_#7c52aa_50%,_#0096cc)]" />
        <div className="mb-10 text-center">
          <h1 className="text-h3">비밀번호 변경</h1>
        </div>
        <div className="flex flex-col gap-6">
          <Input
            label="기존 비밀번호"
            id="pw_before"
            type="password"
            placeholder="기존 비밀번호를 입력해주세요"
          />
          <Input
            label="비밀번호"
            id="pw_new"
            type="password"
            placeholder="새로운 비밀번호를 입력해주세요"
          />
          <Input
            label="비밀번호 확인"
            id="pw_new_check"
            type="password"
            placeholder="동일한 비밀번호를 입력해주세요"
          />
        </div>

        <Button className="mt-6 mb-10 w-full" variant="primary">
          비밀번호 변경
        </Button>
      </div>
    </div>
  );
}
