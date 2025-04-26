import Header from "@/app/_components/ui/Header";
import Footer from "@/app/_components/ui/Footer";
import "./globals.css";
export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
