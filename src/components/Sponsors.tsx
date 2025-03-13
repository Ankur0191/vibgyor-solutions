"use client";
import Image from "next/image";

const sponsors = ["/logo1.png", "/logo2.png", "/logo3.png", "/logo4.png"];

const Sponsors = () => {
  return (
    <section id="sponsors" className="py-20 bg-gray-100">
      <h2 className="text-center text-3xl font-bold text-gray-800">Our Sponsors & Investors</h2>
      <div className="mt-10 flex flex-wrap justify-center gap-10 px-6">
        {sponsors.map((src, index) => (
          <Image 
            key={index} 
            src={src} 
            alt="Sponsor Logo" 
            width={150} // Set width (adjust as needed)
            height={64} // Set height (adjust as needed)
            className="h-16"
          />
        ))}
      </div>
    </section>
  );
};

export default Sponsors;
