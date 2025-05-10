import Navbar from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import "./globals.css";
//todo pt-70 is temporary fix
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="pt-[60px]">
          <Navbar />
        </header>

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
