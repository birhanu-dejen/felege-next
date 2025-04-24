"use client";
import Image from "next/image";
import React from "react";
import featuredCourses from "@/app/_constants/FeaturedCoursesDemo";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function FeaturedCourses() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-12">
          Explore Our Featured Teachings
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredCourses.map((course, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex"
            >
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow flex flex-col h-full w-full cursor-pointer">
                <div className="p-4 pb-0">
                  <Image
                    src={course.image}
                    alt={course.title}
                    className="rounded-lg w-full h-48 object-cover"
                    width={300}
                    height={200}
                  />
                </div>
                <div className="p-6 pt-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {course.description}
                  </p>
                  <div className="text-sm text-gray-500 mt-auto">
                    <p className="mb-1">👤 {course.instructor}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>⏱ {course.duration}</span>
                      <span className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-400" />
                        {course.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <button className="mt-12 text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-100 font-semibold px-6 py-2 rounded-sm transition duration-300">
            Show 3 more
          </button>
        </div>
      </div>
    </section>
  );
}
