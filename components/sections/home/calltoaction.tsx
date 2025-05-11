import { heroButton } from "@/lib/constants/buttonstyles";
const CallToAction = () => {
  return (
    <section className="bg-indigo-600 text-white py-12 md:py-16 ">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-normal text-white tracking-tight text-center mb-8 md:mb-10">
          Start Learning. Grow Spiritually.
        </h2>
        <p className="text-indigo-100 text-lg md:text-xl mb-6">
          Access powerful Orthodox lessons and build a stronger faith today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button className={heroButton.primary}>Get Started</button>
          <button className={heroButton.secondary}>View Courses</button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
