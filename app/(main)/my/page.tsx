import MyInfoSection from "./MyInfoSection";
import MyRecentGameSection from "./MyRecentGameSection";
import MyRecentTestSection from "./MyRecentTestSection";
import { getCurrentUser } from "@/lib/auth";

export const metadata = {
  title: "마이페이지",
};

export default async function Page() {
  const userData = await getCurrentUser();
  // const [modifyInfo, setModifyInfo] = useState(false);
  let data;
  try {
    const res = await fetch("http://localhost:3000/api/mypage");
    data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "데이터 가져오기 실패");
    }
    console.log(data);
    console.log(data.myTestResults);
    console.log(data.myTests);
  } catch (err) {
    if (err instanceof Error) {
      alert(err.message);
    } else {
      alert("네트워크 오류");
    }
  }

  return (
    <div>
      <MyInfoSection userData={userData} />
      {/* 개인정보 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-10 ">
        <MyRecentGameSection />
        {/* 나의 게임 */}
        {data.myTests.length == 0 ? (
          <p>내가 진행한 테스트가 없습니다.</p>
        ) : (
          <MyRecentTestSection />
        )}{" "}
        {/* 나의 테스트 */}
      </div>
    </div>
  );
}
