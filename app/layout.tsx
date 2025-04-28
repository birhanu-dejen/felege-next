import Navbar from "@/app/_components/layout/Header";
import Footer from "@/app/_components/layout/Footer";
import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Navbar />
        </header>

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
