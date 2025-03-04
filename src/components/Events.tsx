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

const Events = () => {
  const { isSignedIn, user } = useUser();
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const selectedEvent = event; // Define selectedEvent

  const handleRegister = async () => {
    if (!selectedEvent || !user?.primaryEmailAddress?.emailAddress) {
      console.error("❌ Missing event or user in frontend.");
      return;
    }
  
    const payload = {
      event: {
        id: selectedEvent.id, // Ensure you send an `id`
        title: selectedEvent.title, // Ensure correct field name
      },
      user: user.primaryEmailAddress.emailAddress, // Send only email, not object
    };
  
    console.log("📤 Sending payload:", payload);
  
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  
    const data = await res.json();
    console.log("📩 Response:", data);
  };
  

  return (
    <section id="events" className="py-28 px-6 bg-gray-50">
      <h2 className="text-center text-4xl font-bold text-gray-900 mb-16">{event.title}</h2>
      <p className="text-center text-xl text-blue-600 font-medium">{event.date}</p>
      <div className="max-w-5xl mx-auto mt-6 bg-white p-8 rounded-xl shadow-lg">
        <p className="text-gray-700 whitespace-pre-line">{event.desc}</p>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleRegister}
            disabled={registered || loading}
            className={`px-6 py-3 rounded-lg text-white font-semibold transition ${
              registered ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Registering..." : registered ? "Registered" : "Register Now"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Events;
