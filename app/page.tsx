import HeroSection from "@/app/_sections/HeroSection ";
import CoursesSection from "@/app/_sections/CoursesSection";
import TestimonialsSection from "@/app/_sections/TestimonialsSection";
import WhyOursSection from "@/app/_sections/WhyUsSection";
import CTASection from "@/app/_sections/CTASection";

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
