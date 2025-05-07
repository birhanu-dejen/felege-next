import { FaGraduationCap, FaTags, FaBook } from "react-icons/fa";
import { Book, Users, ScrollText } from "lucide-react";
export const navLinks = [
  {
    name: "All Courses",
    href: "#courses",
    icon: <FaGraduationCap />,
  },

  {
    name: "Plans & Pricing",
    href: "#pricing",
    icon: <FaTags />,
  },
  {
    name: "Learning Resources",
    href: "#resources",
    icon: <FaBook />,
  },
];
export const benefits = [
  {
    icon: <Book className="h-6 w-6 text-indigo-600" />,
    title: "500+ Orthodox Learning Programs",
    description:
      "Explore Church teachings, lives of saints, and liturgy—authentic and traditional.",
  },
  {
    icon: <Users className="h-6 w-6 text-indigo-600" />,
    title: "Guided by Spiritual Mentors",
    description:
      "Learn through trusted clergy and a supportive faith community.",
  },
  {
    icon: <ScrollText className="h-6 w-6 text-indigo-600" />,
    title: "Earn Spiritual Certificates",
    description:
      "Get recognition for your learning. Certificates with spiritual value.",
  },
];
export const featuredCourses = [
  {
    title: "Introduction to Orthodox Theology",
    image: "/democourse-images/theology.jpg",
    description:
      "Explore the foundations of Orthodox Christian theology through scripture and tradition.",
    instructor: "Fr. Daniel Kebede",
    duration: "5h 30m",
    rating: 4.8,
  },
  {
    title: "The Lives of Saints",
    image: "/democourse-images/saints.jpeg",
    description:
      "Learn from the lives of saints who have inspired generations of Orthodox faithful.",
    instructor: "Sr. Hanna Alem",
    duration: "3h 45m",
    rating: 4.7,
  },
  {
    title: "Orthodox Christian Spirituality",
    image: "/democourse-images/ortodox-peoples.webp",
    description:
      "Understand prayer, fasting, and ascetic practices that deepen spiritual growth.",
    instructor: "Dr. Yohannes Tesfaye",
    duration: "6h 15m",
    rating: 4.9,
  },
];
export const testimonials = [
  {
    name: "Mekdes Teshome",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "Felege Hiwot has become a vital part of my spiritual routine. The teachings are grounded in Orthodox tradition and presented in a way that’s both engaging and accessible. I feel more connected to my faith every day.",
  },
  {
    name: "Abba Mulugeta",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    text: "As a servant of the Church, I highly appreciate Felege Hiwot's commitment to preserving the richness of Orthodox teachings. The platform is well-structured, authentic, and spiritually nourishing for believers at every stage.",
  },
  {
    name: "Selamawit Endale",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "Felege Hiwot allows me to grow spiritually in the midst of a busy life. The content is inspiring and faithful to our Orthodox values. I’ve recommended it to many friends and family members.",
  },
];
export const footerLinks = [
  {
    title: "Explore",
    links: ["Courses", "About", "Community", "Blog"],
  },
  {
    title: "Support",
    links: ["Help Center", "Contact Us", "Terms & Privacy"],
  },
];
