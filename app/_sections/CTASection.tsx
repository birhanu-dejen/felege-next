const CallToAction = () => {
  return (
    <section className="bg-indigo-600 text-white py-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-semibold leading-tight mb-6">
          Deepen Your Faith with Felege Hiwot
        </h2>
        <p className="text-indigo-100 text-lg md:text-xl mb-8">
          Embark on a transformative spiritual journey. Discover timeless
          Orthodox teachings and grow in faith, wisdom, and community with our
          carefully crafted lessons.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button className="w-full sm:w-auto bg-white text-indigo-600 hover:bg-indigo-100 py-3 px-8 rounded-xl text-lg font-semibold transition duration-300 ease-in-out">
            Start Your Spiritual Journey
          </button>
          <button className="w-full sm:w-auto border-2 border-white text-white hover:bg-indigo-500 py-3 px-8 rounded-xl text-lg font-semibold transition duration-300 ease-in-out">
            Explore Our Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
