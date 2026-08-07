import CreateTestForm from "./CreateTestForm";

export const metadata = {
  title: "테스트 편집",
  description: "나만의 테스트를 직접 만들어보세요.",
};

export default function Page() {
  return <CreateTestForm />;
}
