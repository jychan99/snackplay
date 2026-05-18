import MyRecentGameSection from "./MyRecentGameSection";
import MyRecentTestSection from "./MyRecentTestSection";
import MyProfileSection from "./MyProfileSection";
import MyLikedTestSection from "./MyLikedTestSection";
import MyCreatedTestSection from "./MyCreatedTestSection";
import { getCurrentUser } from "@/lib/auth";
import { getMyInfo } from "@/lib/my";
export const metadata = {
  title: "마이페이지",
};

export default async function Page() {
  // 개인정보 데이터
  const userData = await getCurrentUser();
  const myInfoData = await getMyInfo();
  // const myTestLikes = await getMyTests()
  const myTests = myInfoData.myTestResults.slice(0, 3);
  const myLiked = myInfoData.likedTests.slice(0, 3);
  const myMakes = myInfoData.myTests.slice(0, 3);
  console.log(userData);
  console.log(myTests);
  console.log(myLiked);
  return (
    <div>
      <MyProfileSection userData={userData} />
      {/* 개인정보 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-10 ">
        {/* <MyRecentGameSection /> */}
        {/* 나의 게임 */}
        {myTests.length == 0 ? (
          <p>내가 진행한 테스트가 없습니다.</p>
        ) : (
          <MyRecentTestSection tests={myTests} />
        )}{" "}
        {/* 나의 테스트 */}
        {myLiked.length == 0 ? (
          <p>내가 찜한 테스트가 없습니다.</p>
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
        {/* {userData.role === "A" && ( */}
        <>
          {myMakes.length == 0 ? (
            <p>내가 만든 테스트가 없습니다.</p>
          ) : (
            <MyCreatedTestSection tests={myMakes} />
          )}{" "}
        </>
        {/* )} */}
        {/* 내가 만든 테스트 */}
      </div>
    </div>
  );
}
