import MyRecentGameSection from "./main/MyRecentGameSection";
import MyRecentTestSection from "./main/MyRecentTestSection";
import MyProfileSection from "./main/MyProfileSection";
import MyLikedTestSection from "./main/MyLikedTestSection";
import MyCreatedTestSection from "./main/MyCreatedTestSection";
import { getCurrentUser } from "@/lib/auth";
import { getMyInfo } from "@/lib/my";

export const metadata = {
  title: "마이페이지",
};

export default async function Page() {
  // 개인정보 데이터
  const userData = await getCurrentUser();
  const myInfoData = await getMyInfo();

  const myTests = myInfoData.myTestResults.slice(0, 3);
  const myLiked = myInfoData.likedTests.slice(0, 3);
  const myMakes = myInfoData.myTests.slice(0, 3);
  return (
    <div>
      <MyProfileSection />
      {/* 개인정보 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-10 ">
        {/* <MyRecentGameSection /> */}
        {/* 나의 게임 */}
        {myTests.length == 0 ? (
          <p className="p-10 border-b-1 border-border-sub">
            내가 진행한 테스트가 없습니다.
          </p>
        ) : (
          <MyRecentTestSection tests={myTests} />
        )}{" "}
        {/* 나의 테스트 */}
        {myLiked.length == 0 ? (
          <p className="p-10 border-b-1 border-border-sub">
            내가 좋아요한 테스트가 없습니다.
          </p>
        ) : (
          <MyLikedTestSection tests={myLiked} />
        )}{" "}
        {/* 나의 찜한 테스트 */}
        {/* 추후 주석 풀기 */}
        {/* 추후 주석 풀기 */}
        {/* 추후 주석 풀기 */}
        {/* 추후 주석 풀기 */}
        {/* 추후 주석 풀기 */}
        {/* 추후 주석 풀기 */}
        {/* 추후 주석 풀기 */}
        {/* 추후 주석 풀기 */}
        {/* 추후 주석 풀기 */}
        {userData.role === "A" && (
          <>
            {myMakes.length == 0 ? (
              <p className="p-10 border-b-1 border-border-sub">
                내가 만든 테스트가 없습니다.
              </p>
            ) : (
              <MyCreatedTestSection tests={myMakes} />
            )}{" "}
          </>
        )}
        {/* 내가 만든 테스트 */}
      </div>
    </div>
  );
}
