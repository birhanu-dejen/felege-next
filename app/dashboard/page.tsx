"use client";
//todo this page shoud have 2 component sidebar and main content
import React, { useState, useEffect } from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import {
  Bell,
  BookOpen,
  Calendar,
  GraduationCap,
  FileText,
  LogOut,
  User,
  Settings,
  MessageCircle,
  Star,
  BarChart2,
  Timer,
  Sun,
  Moon,
} from "lucide-react";
import { logout } from "@/actions/logout";

const courses = [
  {
    title: "Introduction to Orthodox Christianity",
    progress: 80,
    instructor: "Abba Gebre Selassie",
  },
  {
    title: "Lives of the Saints",
    progress: 60,
    instructor: "Melake Genet Daniel",
  },
  {
    title: "The Divine Liturgy Explained",
    progress: 40,
    instructor: "Abba Tekle Haimanot",
  },
  {
    title: "Orthodox Fasting and Feasts",
    progress: 30,
    instructor: "Wondem Tewodros",
  },
];

const sidebarLinks = [
  {
    key: "completed",
    icon: GraduationCap,
    label: "Completed Courses",
    value: 4,
    color: "text-blue-500",
  },
  {
    key: "ongoing",
    icon: BookOpen,
    label: "Ongoing Courses",
    value: 2,
    color: "text-green-500",
  },
  {
    key: "events",
    icon: Calendar,
    label: "Upcoming Events",
    value: 3,
    color: "text-yellow-500",
  },
  {
    key: "assignments",
    icon: FileText,
    label: "Assignments Due",
    value: 5,
    color: "text-purple-500",
  },
  {
    key: "profile",
    icon: User,
    label: "Profile Settings",
    color: "text-indigo-500",
  },
  {
    key: "account",
    icon: Settings,
    label: "Account Settings",
    color: "text-gray-600 dark:text-gray-300",
  },
  {
    key: "discussions",
    icon: MessageCircle,
    label: "Discussions",
    color: "text-blue-400",
  },
  {
    key: "achievements",
    icon: Star,
    label: "Achievements",
    color: "text-yellow-400",
  },
  {
    key: "analytics",
    icon: BarChart2,
    label: "Analytics",
    color: "text-green-600",
  },
  { key: "timer", icon: Timer, label: "Study Timer", color: "text-pink-500" },
];

export default function StudentDashboard() {
  const [selectedSection, setSelectedSection] = useState("completed");
  const [isDark, setIsDark] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const router = useRouter();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "completed":
      case "ongoing":
        return (
          <>
            <h3 className="text-xl font-semibold mb-4">Your Courses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course, idx) => (
                <div
                  key={idx}
                  className="p-5 shadow rounded bg-white dark:bg-gray-800"
                >
                  <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Instructor: {course.instructor}
                  </p>
                  <div className="w-full bg-gray-200 rounded h-2 mb-2">
                    <div
                      className="bg-blue-500 h-2 rounded"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Progress: {course.progress}%
                  </p>
                </div>
              ))}
            </div>
          </>
        );
      default:
        return (
          <h3 className="text-xl font-semibold">{selectedSection} Section</h3>
        );
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isCollapsed ? "w-16" : "w-64"
        } transition-all duration-300 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent`}
      >
        <div className="flex items-center justify-between p-4">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <Image
                src={`/avatars/avatar-1.jpg`}
                alt="Faithful learners"
                width={50}
                height={50}
                className="w-12 h-12 rounded-full border-2 border-white"
              />
              <div>
                <h1 className="font-bold text-lg">Alex</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  profile
                </p>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            {isCollapsed ? "▶" : "◀"}
          </button>
        </div>

        <nav className="space-y-1 p-2">
          {sidebarLinks.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onClick={() => setSelectedSection(item.key)}
                className={`flex items-center gap-3 p-3 rounded-md cursor-pointer ${
                  selectedSection === item.key
                    ? "bg-gray-200 dark:bg-gray-700"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <Icon className={`h-6 w-6 ${item.color}`} />
                {!isCollapsed && (
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    {item.value && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {item.value} total
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 h-full flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex justify-end items-center gap-4 p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <button
            title="Notifications"
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            <Bell className="h-5 w-5 text-yellow-500" />
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            title="Toggle Dark Mode"
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-800" />
            )}
          </button>
          <button
            onClick={handleLogout}
            title="Logout"
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            <LogOut className="h-5 w-5 text-red-500" />
          </button>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
          <h2 className="text-2xl font-semibold capitalize mb-4">
            {selectedSection.replace("-", " ")} Overview
          </h2>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
