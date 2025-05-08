import Hero from "@/components/sections/home/hero";
import Courses from "@/components/sections/home/features";
import Testimonials from "@/components/sections/home/Testimonials";
import Benefits from "@/components/sections/home/benefits";
import CallToAction from "@/components/sections/home/calltoaction";

export default function Home() {
  return (
    <>
      <Hero />
      <Benefits />
      <Courses />
      <Testimonials />
      <CallToAction />
    </>
  );
}
