"use client";

import Image from "next/image";

const partners = [
  { title: "SUPPORTED BY", names: [
      { name: "Red Circle", logo: "/images/redcircle.png" },
      // { name: "Goog", logo: "/logos/goog.png" },
      { name: "DAP", logo: "/images/DAP.jpeg" }
    ] 
  },
  { title: "INCUBATION PARTNER", names: [
      { name: "ISB FITT I-RISE", logo: "/images/AIC-ISB-Logo-Black.png" },
      { name: "FITT", logo: "/images/fiit.png" },
      { name: "VENTURENEST", logo: "/images/cgc_venturenest_logo_n1 2.f5a6481180a336629ccc.png" },
      { name: "MBCIE", logo: "/images/1642749289926.jpeg" },
      { name: "BIRMINGHAM CITY", logo: "/images/birg.png" }
    ] 
  },
  { title: "INVESTOR NETWORK", names: [
      { name: "Punjab Angels Network", logo: "/images/punjabangelsnetwork_logo.jpeg" }
    ] 
  },
  { title: "ACCELERATOR PARTNER", names: [
      { name: "Marwari Catalysts", logo: "/images/logo black.png" }
    ] 
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
            <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">{partner.title}</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {partner.names.map((partnerDetail, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <Image 
                    src={partnerDetail.logo} 
                    alt={partnerDetail.name} 
                    width={100} 
                    height={100} 
                    className="rounded-lg"
                  />
                  <p className="mt-2 text-lg font-semibold text-gray-800">{partnerDetail.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SupportedBy;
