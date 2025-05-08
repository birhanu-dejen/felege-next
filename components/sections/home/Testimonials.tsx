import { testimonials } from "@/lib/constants";
import { Quote } from "lucide-react";

const Testimonials = () => {
  return (
    <section className="py-20 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-normal text-gray-800 tracking-tight text-center mb-12">
            Hear from Our Learners
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-left flex flex-col h-full"
            >
              <Quote className="text-indigo-600 w-6 h-6 mb-4" />
              <p className="text-gray-700 italic mb-6 text-base leading-relaxed">
                &quot;{item.text}&quot;
              </p>
              <div className="flex items-center mt-auto gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-indigo-100"
                />
                <div>
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  {/* Optional: You could add role or date here */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
