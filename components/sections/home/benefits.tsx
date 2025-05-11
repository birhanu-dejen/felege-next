"use client";

import { benefits } from "@/lib/constants";
const Benefits = () => {
  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-normal text-gray-800 tracking-tight text-center mb-6 md:mb-10 ">
          Invest in your spiritual growth
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 shadow rounded-lg">
              <div className="flex justify-center mb-4">{benefit.icon}</div>
              <h3 className="text-lg font-normal text-gray-800 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
