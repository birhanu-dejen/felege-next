"use client";

import { useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import navLinks from "@/app/_constants/NavLinkText";
import Logo from "@/app/_components/ui/Logo";
import CourseSearchBar from "@/app/_components/ui/SearchBar";
import Link from "next/link";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isLoginPage = pathname === "/auth/login";
  const isSignupPage = pathname === "/auth/signup";

  return (
    <header className="font-montserrat sticky top-0 z-50 w-full bg-white">
      <div className="container flex h-[70px] items-center justify-between px-4">
        <Logo />

        <nav className="hidden md:flex items-center justify-between w-full ml-6">
          <div className="flex gap-6 mr-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-gray-800 hover:text-indigo-600 transition duration-200 ease-in-out px-2 py-1 rounded-lg"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex-1 max-w-xl mx-3">
            <CourseSearchBar />
          </div>

          <div className="flex gap-4 ml-auto lg:mr-16">
            {isLoginPage ? (
              <Link href="/auth/signup">
                <button className="text-white bg-indigo-600 rounded-sm h-12 px-6 cursor-pointer">
                  Sign Up
                </button>
              </Link>
            ) : isSignupPage ? (
              <Link href="/auth/login">
                <button className="h-12 px-6 text-indigo-600 font-medium bg-white border border-indigo-200 rounded-md hover:bg-indigo-100 transition-colors duration-200 shadow-sm cursor-pointer">
                  Log In
                </button>
              </Link>
            ) : (
              <>
                <Link href="/auth/login">
                  <button className="h-12 px-6 text-indigo-600 font-medium bg-white border border-indigo-200 rounded-md hover:bg-indigo-100 transition-colors duration-200 shadow-sm cursor-pointer">
                    Log In
                  </button>
                </Link>
                <Link href="/auth/signup">
                  <button className="text-white bg-indigo-600 rounded-sm h-12 px-6 cursor-pointer">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </nav>

        <div className="md:hidden flex items-center gap-6 ml-auto">
          {!mobileOpen && (
            <div className="flex gap-6 mr-4">
              {isLoginPage ? (
                <Link href="/auth/signup">
                  <button className="text-white bg-indigo-600 rounded-sm h-12 px-4 cursor-pointer">
                    Sign Up
                  </button>
                </Link>
              ) : isSignupPage ? (
                <Link href="/auth/login">
                  <button className="text-indigo-600 bg-gray-50 rounded-sm h-12 px-4 cursor-pointer">
                    Log In
                  </button>
                </Link>
              ) : (
                <>
                  <Link href="/auth/login">
                    <button className="text-indigo-600 bg-gray-50 rounded-sm h-12 px-4 cursor-pointer">
                      Log In
                    </button>
                  </Link>
                  <Link href="/auth/signup">
                    <button className="text-white bg-indigo-600 rounded-sm h-12 px-4 cursor-pointer">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>
          )}

          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={30} />}
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-white z-40 overflow-y-auto">
          <div className="container py-4 space-y-4">
            <div className="px-4">
              <CourseSearchBar />
            </div>

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="flex py-2 px-4 font-medium hover:bg-accent rounded-md items-center justify-between"
                onClick={() => setMobileOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <span>{link.icon}</span>
                  <span>{link.name}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </a>
            ))}

            <div className="flex gap-4 px-4 items-center justify-center">
              {isLoginPage ? (
                <Link href="/auth/signup">
                  <button className="text-white bg-indigo-600 rounded-md h-12 px-4 cursor-pointer">
                    Sign Up
                  </button>
                </Link>
              ) : isSignupPage ? (
                <Link href="/auth/login">
                  <button className="h-12 px-6 text-indigo-600 font-medium bg-white rounded-sm">
                    Log In
                  </button>
                </Link>
              ) : (
                <>
                  <Link href="/auth/signup">
                    <button className="text-white bg-indigo-600 rounded-md h-12 px-4 cursor-pointer">
                      Sign Up
                    </button>
                  </Link>
                  <Link href="/auth/login">
                    <button className="h-12 px-6 text-indigo-600 font-medium bg-white rounded-sm">
                      Log In
                    </button>
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
