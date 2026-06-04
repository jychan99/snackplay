import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getIsLoggedIn, getCurrentUser } from "@/lib/auth";
export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 로그인 여부 체크
  const isLoggedIn = await getIsLoggedIn();
  const userData = await getCurrentUser();
  return (
    <>
      <Header isLoggedIn={isLoggedIn} userData={userData} />
      <main className="container-custom py-16">{children}</main>
      <Footer />
    </>
  );
}
