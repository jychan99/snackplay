import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="container-custom py-16">{children}</main>
      <Footer />
    </>
  );
}
