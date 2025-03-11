import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Events from "@/components/Events";
// import Sponsors from "@/components/Sponsors";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Benefits from "@/components/Benefits";
import Mentors from "@/components/Mentors";
import SupportedBy from "@/components/SupportedBy";
import SkillIndia from "@/components/SkillIndia";
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Events />
      <Benefits />
      <Mentors />
      <SupportedBy />
      <SkillIndia />
      {/* <Sponsors /> */}
      <Contact />
      <Footer />
    </>
  );
}
