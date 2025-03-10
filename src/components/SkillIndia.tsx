"use client";

import Image from "next/image";

const SkillIndia = () => {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900">Skill India Initiative</h1>
        <p className="mt-4 text-lg text-gray-700">कौशल भारत कुशल भारत | आत्मनिर्भर भारत</p>
      </div>

      <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-2 gap-10">
        {/* Organized By */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <Image 
            src="/images/Vibgyor_logo.png"  // ✅ Corrected path
            alt="Vibgyor Solution" 
            width={500} 
            height={300} 
            className="rounded-lg mb-4 w-full object-cover"
          />
          <h2 className="text-2xl font-bold text-blue-600 mb-4">ORGANIZED BY</h2>
          <p className="text-gray-700 text-lg">Vibgyor Solution</p>
          <p className="text-gray-600">A Google Agency Franchise</p>
        </div>

        {/* Initiative For */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <Image 
            src="/images/initiative.jpg"  // ✅ Corrected path
            alt="Initiative for Sustainable Development" 
            width={500} 
            height={300} 
            className="rounded-lg mb-4 w-full object-cover"
          />
          <h2 className="text-2xl font-bold text-blue-600 mb-4">INITIATIVE FOR</h2>
          <ul className="text-gray-700 space-y-2">
            <li>📢 <strong>VOCAL</strong></li>
            <li>🌍 <strong>SUSTAINABLE DEVELOPMENT GOALS</strong></li>
            <li>📌 <strong>LOCAL G2 भारत 2023 INDIA</strong></li>
          </ul>
        </div>
      </div>

      {/* Startup India */}
      <div className="max-w-5xl mx-auto text-center mt-12">
        <Image 
          src="/images/png-clipart-skill-india-logo-government-of-india-skill-india-ministry-of-skill-development-and-entrepreneurship-skill-text-logo.png"  // ✅ Corrected path
          alt="#StartupIndia" 
          width={600} 
          height={350} 
          className="rounded-lg mx-auto object-cover"
        />
        <h2 className="text-3xl font-bold text-green-600 mt-6">#StartupIndia</h2>
      </div>
    </section>
  );
};

export default SkillIndia;
