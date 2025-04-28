const CallToAction = () => {
  return (
    <section className="bg-indigo-600 text-white py-12">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-semibold leading-tight mb-6">
          Start Learning. Grow Spiritually.
        </h2>
        <p className="text-indigo-100 text-lg md:text-xl mb-8">
          Access powerful Orthodox lessons and build a stronger faith today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button className="w-full sm:w-auto bg-white text-indigo-600 hover:bg-indigo-100 py-3 px-8 rounded-sm text-lg font-semibold transition duration-300 ease-in-out cursor-pointer">
            Get Started
          </button>
          <button className="w-full sm:w-auto border-2 border-white text-white hover:bg-indigo-500 py-3 px-8 rounded-sm text-lg font-semibold transition duration-300 ease-in-out cursor-pointer">
            View Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
