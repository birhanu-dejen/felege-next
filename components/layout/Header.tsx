"use client";

import { useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/constants";
import Logo from "@/components/ui/logo";
import CourseSearchBar from "@/components/ui/searchbar";
import Link from "next/link";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isLoginPage = pathname === "/auth/login";
  const isSignupPage = pathname === "/auth/signup";

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="font-montserrat fixed top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-gray-200">
      <div className="container flex h-[58px] items-center justify-between px-4">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-between w-full ml-6">
          <div className="flex gap-3 mr-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-gray-800 hover:text-indigo-600 transition duration-200 ease-in-out px-2 py-1 rounded-lg"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex-1 max-w-xl mx-3">
            <CourseSearchBar />
          </div>

          <div className="flex gap-4 ml-auto lg:mr-16">
            {isLoginPage ? (
              <Link
                href="/auth/signup"
                className="text-white bg-indigo-600 rounded-sm h-12 px-6 flex items-center justify-center"
              >
                Sign Up
              </Link>
            ) : isSignupPage ? (
              <Link
                href="/auth/login"
                className="h-12 px-6 text-indigo-600 font-medium bg-white border border-indigo-200 rounded-md hover:bg-indigo-100 transition-colors duration-200 shadow-sm flex items-center justify-center"
              >
                Log In
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="h-12 px-6 text-indigo-600 font-medium bg-white border border-indigo-200 rounded-md hover:bg-indigo-100 transition-colors duration-200 shadow-sm flex items-center justify-center"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/signup"
                  className="text-white bg-indigo-600 rounded-sm h-12 px-6 flex items-center justify-center"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-4 ml-auto">
          {!mobileOpen && (
            <div className="flex gap-4 mr-2">
              {isLoginPage ? (
                <Link
                  href="/auth/signup"
                  className="text-white bg-indigo-600 rounded-sm h-10 px-4 flex items-center justify-center"
                >
                  Sign Up
                </Link>
              ) : isSignupPage ? (
                <Link
                  href="/auth/login"
                  className="text-indigo-600 bg-gray-50 rounded-sm h-10 px-4 flex items-center justify-center"
                >
                  Log In
                </Link>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="text-indigo-600 bg-gray-50 rounded-sm h-10 px-4 flex items-center justify-center"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="text-white bg-indigo-600 rounded-sm h-10 px-4 flex items-center justify-center"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          )}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-white z-40 overflow-y-auto">
          <div className="container py-6 space-y-6">
            <div className="px-4">
              <CourseSearchBar />
            </div>

            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between py-3 px-4 font-medium hover:bg-gray-100 rounded-md transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span>{link.icon}</span>
                    <span>{link.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-4 px-4">
              {isLoginPage ? (
                <Link
                  href="/auth/signup"
                  onClick={closeMobileMenu}
                  className="text-white bg-indigo-600 rounded-md h-12 flex items-center justify-center"
                >
                  Sign Up
                </Link>
              ) : isSignupPage ? (
                <Link
                  href="/auth/login"
                  onClick={closeMobileMenu}
                  className="h-12 text-indigo-600 font-medium bg-white border border-indigo-300 rounded-md flex items-center justify-center"
                >
                  Log In
                </Link>
              ) : (
                <>
                  <Link
                    href="/auth/signup"
                    onClick={closeMobileMenu}
                    className="text-white bg-indigo-600 rounded-md h-12 flex items-center justify-center"
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="/auth/login"
                    onClick={closeMobileMenu}
                    className="h-12 text-indigo-600 font-medium bg-white border border-indigo-300 rounded-md flex items-center justify-center"
                  >
                    Log In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
