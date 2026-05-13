import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import { cookies } from "next/headers";
export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 로그인 여부 체크
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");
  const isLoggedIn = !!token;
  return (
    <>
      <Header isLoggedIn={isLoggedIn}  />
      <main className="container-custom py-16">{children}</main>
      <Footer />
    </>
  );
}
