"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
type Props = {
  children: React.ReactNode;
};
export default function Footer() {
  return (
    <footer className="flex items-center justify-center py-12 border-t-1 border-border-sub">
      <div className="flex items-center justify-between w-[640px] flex-wrap px-8">
        <div>
          <h2 className="text-[18px] font-bold">SnackPlay</h2>
          <p className="text-text-sub text-[12px]">
            © 2026 SnackPlay. All rights reserved.
          </p>
        </div>
        <div className="flex relative -right-4 max-[480px]:right-3">
          <PrivacyPolicy>
            <button
              className="text-text-sub text-[12px] underline underline-offset-1 px-4 py-2 hover:font-bold transition ease-linear"
              type="button"
            >
              개인정보보호
            </button>
          </PrivacyPolicy>
          <UseOfTerm>
            <button
              className="text-text-sub text-[12px] underline underline-offset-1 px-4 py-2 hover:font-bold transition ease-linear"
              type="button"
            >
              이용약관
            </button>
          </UseOfTerm>
        </div>
      </div>
    </footer>
  );
}

export function PrivacyPolicy({ children }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>개인정보보호방침</DialogTitle>
        <p>
          개인정보처리방침 [스낵플레이](이하 "서비스")은 이용자의 개인정보를
          중요하게 생각하며, 「개인정보 보호법」 등 관련 법령을 준수합니다.
          서비스는 아래와 같은 개인정보처리방침을 통해 이용자가 제공한
          개인정보가 어떤 용도와 방식으로 이용되는지 안내합니다.
        </p>
        <div>
          <p>
            1. 수집하는 개인정보 항목 서비스는 회원가입 및 로그인 기능 제공을
            위해 아래 정보를 수집합니다. * 아이디 * 닉네임 * 비밀번호 ※
            비밀번호는 암호화(해시 처리)되어 저장되며, 운영자도 원문을 확인할 수
            없습니다.
          </p>
          <p>
            2. 개인정보 수집 및 이용 목적 수집한 개인정보는 다음 목적을 위해
            사용됩니다. * 회원 식별 및 로그인 기능 제공 * 서비스 이용 기록 관리
            * 부정 이용 방지 및 보안 관리 * 이용자 문의 대응
          </p>
          <p>
            3. 개인정보 보관 및 이용 기간 서비스는 회원 탈퇴 시까지 개인정보를
            보관합니다. 단, 관계 법령에 따라 보존이 필요한 경우 해당 기간 동안
            보관할 수 있습니다.
          </p>
          <p>
            4. 개인정보의 제3자 제공 서비스는 이용자의 개인정보를 외부에
            제공하지 않습니다. 다만, 다음의 경우는 예외로 합니다. * 이용자가
            사전에 동의한 경우 * 법령에 따라 제공이 요구되는 경우
          </p>
          <p>
            5. 개인정보의 파기 회원 탈퇴 시 수집된 개인정보는 지체 없이
            삭제합니다. 전자적 파일 형태의 정보는 복구 및 재생이 불가능한
            방법으로 안전하게 삭제합니다.
          </p>
          <p>
            6. 개인정보 보호를 위한 조치 서비스는 개인정보 보호를 위해 다음과
            같은 조치를 시행합니다. * 비밀번호 암호화 저장 * 접근 권한 최소화 *
            보안 업데이트 및 관리
          </p>
          <p>
            7. 이용자의 권리 이용자는 언제든지 자신의 개인정보를 조회, 수정,
            삭제할 수 있으며 회원 탈퇴를 요청할 수 있습니다.
          </p>
          <p>
            8. 개인정보처리방침 변경 본 개인정보처리방침은 관련 법령 및 서비스
            정책 변경에 따라 수정될 수 있습니다. 변경 사항은 서비스 내 공지사항
            또는 별도 페이지를 통해 안내합니다.
          </p>
          <p>
            9. 문의처 개인정보 관련 문의는 아래 이메일로 연락해주시기 바랍니다.
            * 이메일: [coolage512@gmail.com]
          </p>
        </div>
        <p>시행일자: 2026년 5월 29일</p>
      </DialogContent>
    </Dialog>
  );
}
export function UseOfTerm({ children }: Props) {
  return (
    <Dialog>
      {/* <DialogTrigger
        render={<Button variant="outline">Sticky Footer</Button>}
      /> */}
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>이용약관</DialogTitle>
        <p>
          본 이용약관은 [스낵플레이](이하 "서비스")이 제공하는 서비스의 이용과
          관련하여 서비스와 이용자 간의 권리, 의무 및 책임사항을 규정함을
          목적으로 합니다.
        </p>
        <div>
          <p>
            제1조 (목적) 본 약관은 서비스가 제공하는 웹서비스의 이용 조건 및
            절차, 이용자와 서비스 간의 권리와 의무를 규정합니다.
          </p>
          <p>
            제2조 (정의) 본 약관에서 사용하는 용어의 정의는 다음과 같습니다. 1.
            "서비스"란 운영자가 제공하는 웹사이트 및 관련 기능을 의미합니다. 2.
            "이용자"란 본 약관에 따라 서비스를 이용하는 회원 및 방문자를
            의미합니다. 3. "회원"이란 서비스에 가입하여 로그인 기능을 이용하는
            자를 의미합니다.
          </p>
          <p>
            {" "}
            제3조 (약관의 효력 및 변경) 1. 본 약관은 서비스 화면에 게시함으로써
            효력이 발생합니다. 2. 서비스는 필요한 경우 관련 법령을 위반하지 않는
            범위에서 약관을 변경할 수 있습니다. 3. 변경된 약관은 서비스 내 공지
            후 적용됩니다.{" "}
          </p>
          <p>
            제4조 (회원가입) 1. 이용자는 서비스가 정한 절차에 따라 회원가입을
            신청할 수 있습니다. 2. 서비스는 아래와 같은 경우 가입을 제한할 수
            있습니다. * 허위 정보를 입력한 경우 * 타인의 정보를 도용한 경우 *
            서비스 운영을 방해할 우려가 있는 경우
          </p>
          <p>
            제5조 (회원 정보 관리) 1. 회원은 자신의 계정 정보를 안전하게
            관리해야 합니다. 2. 회원은 계정 정보가 유출되지 않도록 주의할 책임이
            있습니다. 3. 계정 관리 소홀로 발생한 문제에 대한 책임은 회원에게
            있습니다.
          </p>
          <p>
            제6조 (서비스 이용) 1. 서비스는 연중무휴 제공을 원칙으로 합니다. 2.
            다만, 시스템 점검 및 운영상 필요에 따라 일시적으로 서비스 제공이
            중단될 수 있습니다.
          </p>
          <p>
            제7조 (이용 제한) 서비스는 아래 행위를 금지합니다. * 타인의 계정
            도용 * 서비스 운영 방해 행위 * 불법적인 정보 게시 * 욕설, 비방, 스팸
            등 타인에게 피해를 주는 행위 서비스는 위 행위 발생 시 사전 통보 없이
            이용을 제한할 수 있습니다.
          </p>
          <p>
            {" "}
            제8조 (면책사항) 1. 서비스는 천재지변, 시스템 장애 등 불가항력으로
            발생한 문제에 대해 책임을 지지 않습니다. 2. 서비스는 이용자가 게시한
            정보에 대해 책임을 지지 않습니다. 3. 서비스는 이용자의 귀책사유로
            발생한 손해에 대해 책임을 지지 않습니다.{" "}
          </p>
          <p>
            제9조 (서비스 종료) 서비스는 운영상 필요에 따라 서비스를 종료할 수
            있으며, 가능한 경우 사전에 공지합니다.
          </p>
          <p>
            {" "}
            제10조 (문의) 서비스 이용 관련 문의는 아래 이메일로 연락 바랍니다. *
            이메일:[coolage512@gmail.com]
          </p>
        </div>
        <p> 시행일자: 2026년 5월 29일</p>
      </DialogContent>
    </Dialog>
  );
}
