import testimonialsDemo from "@/app/_lib/constants/TestimonialsDemo";

const Testimonials = () => {
  return (
    <section className="py-12 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold mb-10">
          What learners are saying about Felege Hiwot
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialsDemo.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 shadow-sm p-6 space-y-4 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
