"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";

const event = {
  id: "1",
  title: "Path Finder 2.0",
  date: "April 11-12, 2025",
  desc: `Path Finder 2.0 is more than just an event—it's an ecosystem designed to foster 
  innovation and entrepreneurship. Similar to Shark Tank India, it provides budding 
  entrepreneurs the opportunity to pitch their startup ideas in front of Angel Investors and 
  Venture Capitalists. Investors will evaluate these ideas and offer funding support to young 
  innovators. The event also features networking sessions, keynote speeches, and a 
  thrilling bike riders' entry showcase. 
  
  As the sun sets on Day 2, the energy shifts to an electrifying War of DJs, where top DJs will 
  battle it out in an epic competition, delivering high-energy beats, insane drops, and a 
  crowd-pumping showdown to conclude the event with a grand celebration.`
};

const eventFlow = [
  {
    title: "📊 Business Aptitude Test (BAT)",
    description: `A test designed to evaluate basic business skills. All participants receive an evaluation result 
    and a Vibgyor Solution E-Cell Certificate.`,
  },
  {
    title: "📋 Path Finder 2.0 Registration",
    description: `Registration Fee: ₹6,000. Participants work on case studies to convert raw business ideas into 
    a working prototype or MVP.`,
  },
  {
    title: "🎓 Mentoring Workshop",
    description: `Students get mentorship on delivering a business pitch, personality development, and 
    communication skills. Workshops are available online and offline in Chandigarh.`,
  },
  {
    title: "💰 Investment Pitching",
    description: `Finalists pitch their business ideas to a panel of investors in Chandigarh. Top 50 ideas get funding 
    up to ₹10 Cr, with digital, tech, and office setup support.`,
  },
];

const awards = [
  {
    category: "🏆 Foundation Wing (Class 6th-10th)",
    prize: "1st Prize: ₹1,00,000 | 2nd Prize: ₹51,000 | 3rd Prize: ₹25,000",
    details: "50% cash + 50% corporate design, web hosting, incubation, certificates, trophies, and medals.",
  },
  {
    category: "🎓 Senior Wing (Class 11th-UG)",
    prize: "1st Prize: ₹1,00,000 | 2nd Prize: ₹51,000 | 3rd Prize: ₹25,000",
    details: "50% cash + 50% corporate design, web hosting, incubation, certificates, trophies, and medals.",
  },
  {
    category: "📢 Social Media Star",
    prize: "₹25,000",
    details: "50% cash + 50% corporate design, web hosting, incubation.",
  },
  {
    category: "📜 First Round Participants",
    prize: "E-Cell Certification",
    details: "All participants receive a Vibgyor Solution E-Cell Certificate.",
  },
];

const Events = () => {
  const { isSignedIn, user } = useUser();
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!event || !user?.primaryEmailAddress?.emailAddress) {
      console.error("❌ Missing event or user in frontend.");
      return;
    }

    const payload = {
      event: { id: event.id, title: event.title },
      user: user.primaryEmailAddress.emailAddress,
    };

    console.log("📤 Sending payload:", payload);

    setLoading(true);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setLoading(false);
    if (data.success) setRegistered(true);
    console.log("📩 Response:", data);
  };

  return (
    <section id="events" className="py-20 px-6 bg-gray-50">
      {/* Event Title */}
      <motion.h2 
        className="text-center text-4xl font-bold text-gray-900 mb-6" 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}>
        {event.title}
      </motion.h2>
      
      <p className="text-center text-xl text-blue-600 font-medium">{event.date}</p>

      {/* Event Description */}
      <motion.div 
        className="max-w-5xl mx-auto mt-6 bg-white p-8 rounded-xl shadow-lg" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}>
        <p className="text-gray-700 whitespace-pre-line">{event.desc}</p>
      </motion.div>

      {/* Event Flow Section */}
      <div className="max-w-5xl mx-auto mt-12">
        <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">📅 Event Timeline</h3>
        <div className="space-y-6">
          {eventFlow.map((step, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md" 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: index * 0.2 }}>
              <h4 className="text-xl font-semibold text-blue-700">{step.title}</h4>
              <p className="text-gray-700 mt-2">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Awards & Funding Section */}
      <div className="max-w-5xl mx-auto mt-12">
        <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">🏅 Awards & Funding</h3>
        <div className="space-y-6">
          {awards.map((award, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md" 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: index * 0.2 }}>
              <h4 className="text-xl font-semibold text-green-700">{award.category}</h4>
              <p className="text-gray-800 mt-2 font-medium">{award.prize}</p>
              <p className="text-gray-600 mt-1">{award.details}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Registration Button */}
      <div className="text-center mt-12">
        <motion.button 
          onClick={handleRegister} 
          disabled={registered || loading} 
          className={`px-6 py-3 rounded-lg text-white font-semibold transition ${
            registered ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          initial={{ scale: 0.9 }} 
          animate={{ scale: 1 }} 
          transition={{ duration: 0.5 }}>
          {loading ? "Registering..." : registered ? "Registered" : "Register Now"}
        </motion.button>
      </div>
    </section>
  );
};

export default Events;
