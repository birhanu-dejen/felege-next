import Link from "next/link";
import { Mail, MapPin, Phone, Globe } from "lucide-react";
import { FaFacebook, FaTelegram, FaYoutube } from "react-icons/fa";
import footerLinks from "@/lib/constants/FooterText";

export default function NewFooter() {
  return (
    <footer className="bg-[#0B0F1A] text-gray-400 py-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-white font-semibold text-lg">
            FELEGEHIWOT {/* <Logo /> latter replaced by orignal logo */}
          </h2>
          <p className="text-gray-500 mt-2">Tradition meets technology.</p>
        </div>

        {footerLinks.map((section) => (
          <div key={section.title}>
            <h3 className="text-white font-semibold mb-3 text-sm">
              {section.title}
            </h3>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link}>
                  <Link href="#" className="hover:text-white transition">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-white font-semibold mb-3 text-sm">Contact</h3>
          <div className="space-y-3">
            <div className="flex gap-2 items-start">
              <MapPin size={16} className="text-indigo-500 mt-0.5" />
              <span>Addis Ababa, Ethiopia</span>
            </div>
            <div className="flex gap-2 items-center">
              <Phone size={16} className="text-indigo-500" />
              <span>+251 900 000 000</span>
            </div>
            <div className="flex gap-2 items-center">
              <Mail size={16} className="text-indigo-500" />
              <span>info@felegehiwot.org</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-6">
        <hr className="border-t border-gray-700" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500 px-4">
          <div className="flex gap-4">
            <a href="#" aria-label="Facebook" className="hover:text-white">
              <FaFacebook size={22} />
            </a>
            <a href="#" aria-label="Telegram" className="hover:text-white">
              <FaTelegram size={22} />
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-white">
              <FaYoutube size={22} />
            </a>
          </div>

          <p className="text-center">
            © {new Date().getFullYear()} FelegeHiwot. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            <Globe size={20} className="text-gray-400" />
            <select className="bg-transparent text-sm text-gray-400 focus:outline-none">
              <option value="en">English</option>
              <option value="am">አማርኛ</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
}
