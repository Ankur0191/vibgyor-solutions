"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";

const events = [
  { title: "Hackathon 2025", date: "March 10, 2025", desc: "Compete with the best minds in AI & blockchain." },
  { title: "Startup Summit", date: "April 15, 2025", desc: "Pitch your startup idea to investors & mentors." },
  { title: "Tech Workshop", date: "May 5, 2025", desc: "Hands-on training in AI, IoT, & Cloud Computing." },
];

const Events = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [loading, setLoading] = useState<string | null>(null);

  const handleRegister = async (eventTitle: string) => {
    if (!isSignedIn || !user) {
      window.location.href = "/sign-in"; // Redirect to sign-in if not logged in
      return;
    }

    setLoading(eventTitle); // Show loading state for button

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        userEmail: user.primaryEmailAddress,
        eventTitle,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      setRegisteredEvents((prev) => [...prev, eventTitle]); // Mark as registered
    } else {
      alert(data.message); // Show error message if already registered
    }

    setLoading(null);
  };

  return (
    <section id="events" className="py-28 px-6 bg-gray-50">
      <h2 className="text-center text-4xl font-bold text-gray-900 mb-16">Upcoming Events</h2>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 max-w-7xl mx-auto">
        {events.map((event, index) => (
          <motion.div
            key={index}
            className="relative bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 25, delay: index * 0.1 }}
          >
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">{event.title}</h3>
              <p className="text-xl text-blue-600 font-medium">{event.date}</p>
              <p className="text-gray-700 mt-4">{event.desc}</p>
              <button
                onClick={() => handleRegister(event.title)}
                disabled={registeredEvents.includes(event.title) || loading === event.title}
                className={`mt-4 px-6 py-2 rounded-lg text-white font-semibold transition ${
                  registeredEvents.includes(event.title)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading === event.title ? "Registering..." : registeredEvents.includes(event.title) ? "Registered" : "Register Now"}
              </button>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10"></div>
            <div className="absolute inset-0 border-l-4 border-blue-500 rounded-xl"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Events;
