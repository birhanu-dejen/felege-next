import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="bg-[#f5f9ff] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-800 leading-tight">
            Access Timeless Orthodox Teachings with Ours
          </h2>
          <p className="text-lg text-gray-600">
            Deepen your understanding of the Orthodox faith. Learn anytime,
            anywhere—guided by scripture, tradition, and trusted spiritual
            educators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button className="bg-indigo-600 text-white px-8 py-4 text-lg rounded-md hover:bg-indigo-700 transition cursor-pointer">
              Start Free Spiritual Journey
            </button>
            <button className="text-indigo-600 bg-gray-50 px-8 py-4 text-lg border border-indigo-200 rounded-md hover:bg-indigo-100 transition cursor-pointer">
              Explore Lessons
            </button>
          </div>

          <div className="flex items-center space-x-4 pt-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((item) => (
                <Image
                  key={item}
                  src={`/avatars/avatar-${item}.jpg`}
                  alt="Faithful learners"
                  width={50}
                  height={50}
                  className="w-12 h-12 rounded-full border-2 border-white"
                />
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Join <span className="font-semibold">10,000+</span> faithful
              learners growing in spirit today.
            </p>
          </div>
        </div>

        <div className="lg:w-1/2 flex justify-center">
          <Image
            src="/coursera-illustration.png"
            alt="Spiritual learning illustration"
            width={800}
            height={600}
            className="object-contain max-w-full lg:max-w-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
