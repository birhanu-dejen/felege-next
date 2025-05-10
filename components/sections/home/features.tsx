"use client";
import Image from "next/image";
import { featuredCourses } from "@/lib/constants";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function FeaturedCourses() {
  return (
    <section
      className="bg-gradient-to-r from-gray-50 to-white

 py-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-normal text-gray-800 tracking-tight text-center mb-12">
          Explore Our Featured courses
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredCourses.map((course, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform-gpu"
            >
              <div className="relative p-4 pb-0">
                <Image
                  src={course.image}
                  alt={course.title}
                  className="rounded-lg w-full h-48 object-cover transform transition duration-300 ease-in-out hover:scale-105"
                  width={300}
                  height={200}
                />
              </div>
              <div className="p-6 pt-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 transition-all duration-300 ease-in-out hover:text-indigo-600">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {course.description}
                </p>
                <div className="text-sm text-gray-500 mt-auto">
                  <p className="mb-2 text-gray-800 font-semibold">
                    👤 {course.instructor}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <span className="flex items-center gap-1 text-indigo-600">
                      <Star size={14} className="text-yellow-400" />
                      {course.rating.toFixed(1)}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-gray-400">⏱</span>
                      {course.duration}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <button className="mt-12 text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-100 font-semibold px-6 py-2 rounded-sm transition duration-300 cursor-pointer">
            Show 3 more
          </button>
        </div>
      </div>
    </section>
  );
}
