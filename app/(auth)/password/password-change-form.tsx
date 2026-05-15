"use client"
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function PasswordChagneForm() { //myId: string

  return (
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
          placeholder="동일한 비밀번호를 입력해주세요"
        />
      </div>
      
      <Button type="submit" className="mt-6 mb-10 w-full" variant="primary">
        비밀번호 변경
      </Button>
    </form>
  )
}

async function changePassword(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const password = formData.get('password');
  
  // 1. 아이디 가져오기
  // 로그인했을 경우엔 유저 정보 요청
  // 로그인하지 않고 비밀번호 찾기를 통해 들어왔다면 먼저 로그인 아이디을 가져와야한다  (내 아이디 검증 후 해당 폼 나와야한다.)
  // 현재 하드코딩
  const id = 'hahye0513';
  // 2. input 다채워져있는지
  // 3. 비밀번호와 비밀번호 확인이 일치하는지
  
  if(id){
    try {
      const res = await fetch('/api/auth/editpassword', {
        method: "POST",
        headers: { "Content-Type": "application/json",},
        body : JSON.stringify({
          id,
          password
        })
      })
      const data = await res.json();
      if(!res.ok) {
        throw new Error(data.message || "비밀번호 변경 실패");
      }
      alert("변경 성공!");
    } catch (err: unknown) {
      if (err instanceof Error){
          alert(err.message)
        } else {
        alert("네트워크 오류");
      }
    }
  } 
}