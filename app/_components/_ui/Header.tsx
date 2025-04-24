"use client";
import React, { useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import navLinks from "@/app/_constants/NavLinkText";
import Logo from "@/app/_components/_ui/Logo";
import CourseSearchBar from "@/app/_components/_ui/SearchBar";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="font-montserrat sticky top-0 z-50 w-full bg-white">
      <div className="container flex h-[70px] items-center justify-between px-4">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-between w-full ml-6">
          {/* Nav Links */}
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

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-3">
            <CourseSearchBar />
          </div>

          {/* Auth Buttons */}
          <div className="flex gap-4 ml-auto lg:mr-16">
            <button className="h-12 px-6 text-indigo-600 font-medium bg-white border border-indigo-200 rounded-md hover:bg-indigo-100 transition-colors duration-200 shadow-sm">
              Log In
            </button>

            <button className="text-white bg-indigo-600 rounded-sm h-12 px-6 cursor-pointer">
              Sign Up
            </button>
          </div>
        </nav>

        {/* Mobile Icons */}
        <div className="md:hidden flex items-center gap-6 ml-auto">
          {/* Auth Buttons for Mobile (only visible when mobile menu is closed) */}
          {!mobileOpen && (
            <div className="flex gap-6 mr-4">
              <button className="text-indigo-600 bg-gray-50 rounded-sm h-12 px-4 cursor-pointer">
                Log In
              </button>
              <button className="text-white bg-indigo-600 rounded-sm h-12 px-4 cursor-pointer">
                Sign Up
              </button>
            </div>
          )}

          {/* Hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={30} />}
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-white z-40 overflow-y-auto">
          <div className="container py-4 space-y-4">
            {/* Mobile Search Bar */}
            <div className="px-4">
              <CourseSearchBar />
            </div>

            {/* Navigation Links */}
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

            {/* Auth Buttons in Mobile Menu */}
            <div className="flex gap-4 px-4 items-center justify-center">
              <button className="text-white bg-indigo-600 rounded-md h-12 px-4 cursor-pointer">
                Sign Up
              </button>
              <button className="h-12 px-6 text-indigo-600 font-medium bg-white rounded-sm ">
                Log In
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
