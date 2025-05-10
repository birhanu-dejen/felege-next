import Image from "next/image";
import { heroButton } from "@/lib/constants/buttonstyles";

const Hero = () => {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-5xl font-normal text-gray-800 tracking-tight">
            Access Timeless Orthodox Teachings with Ours
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Deepen your understanding of the Orthodox faith. Learn anytime,
            anywhere—guided by scripture, tradition, and trusted spiritual
            educators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button className={heroButton.primary}>
              Start Free Spiritual Journey
            </button>
            <button className={heroButton.secondary}>Explore Lessons</button>
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

export default Hero;
