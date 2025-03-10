"use client";

import Image from "next/image";

const partners = [
  { 
    title: "SUPPORTED BY", 
    names: ["Rod Circle", "Goog", "DAP"], 
    image: "/images/supported_by.jpg"
  },
  { 
    title: "INCUBATION PARTNER", 
    names: ["ISB FITT I-RISE", "VENTURENEST", "MBCIE", "BIRMINGHAM CITY"], 
    image: "/images/incubation_partner.jpg"
  },
  { 
    title: "INVESTOR NETWORK", 
    names: ["Punjab Angels Network"], 
    image: "/images/investor_network.jpg"
  },
  { 
    title: "ACCELERATOR PARTNER", 
    names: ["Marwari Catalysts"], 
    image: "/images/accelerator_partner.jpg"
  },
];

const SupportedBy = () => {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900">Our Support & Partners</h1>
        <p className="mt-4 text-lg text-gray-700">
          We are proud to be backed by industry leaders and innovation-driven organizations.
        </p>
      </div>

      <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-2 gap-10">
        {partners.map((partner, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
            <Image 
              src={partner.image} 
              alt={partner.title} 
              width={500} 
              height={300} 
              className="rounded-lg mb-4 w-full object-cover"
            />
            <h2 className="text-2xl font-bold text-blue-600 mb-4">{partner.title}</h2>
            <ul className="text-gray-700 space-y-2">
              {partner.names.map((name, idx) => (
                <li key={idx} className="text-lg">✅ {name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SupportedBy;
