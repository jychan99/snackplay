import EditTestForm from "./EditTestForm";

export const metadata = {
  title: "테스트 편집",
  description: "내가 만든 테스트의 질문과 답변을 수정해보세요.",
};

export default function Page() {
  return <EditTestForm />;
}
