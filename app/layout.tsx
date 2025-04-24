// app/layout.js
import Header from "@/app/_components/_ui/Header";
import Footer from "@/app/_components/_ui/Footer";
import "./globals.css";
export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className="bg-red">
        <Header />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
