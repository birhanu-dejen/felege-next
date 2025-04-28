import HeroSection from "@/app/_components/sections/home/Hero ";
import CoursesSection from "@/app/_components/sections/home/Featured";
import TestimonialsSection from "@/app/_components/sections/home/Testimonials";
import WhyOursSection from "@/app/_components/sections/home/WhyUs";
import CTASection from "@/app/_components/sections/home/CallToAction";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyOursSection />
      <CoursesSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
