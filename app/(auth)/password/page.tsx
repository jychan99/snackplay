import PasswordChagneForm from "./password-change-form";

export const metadata = {
  title: "비밀번호 변경",
  description: "비밀번호를 변경하고 안전하게 계정을 관리하세요.",
};

export default function Page() {
  return (
    <>
      <div className="w-[163px] mb-5 mx-auto">
        <img className="w-full" src="/images/logo.png" alt="snackplay logo" />
      </div>
      <div className="box-custom">
        <div className="mb-10 text-center">
          <h1 className="text-h3">비밀번호 변경</h1>
        </div>
        <PasswordChagneForm/>
      </div>
    </>
  );
}
