import HeroSection from "@/components/sections/home/Hero ";
import CoursesSection from "@/components/sections/home/Featured";
import TestimonialsSection from "@/components/sections/home/Testimonials";
import WhyOursSection from "@/components/sections/home/WhyUs";
import CTASection from "@/components/sections/home/CallToAction";

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
