"use client";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message Sent! (Backend to be integrated)");
  };

  return (
    <section id="contact" className="py-20 px-6">
      <h2 className="text-center text-3xl font-bold text-gray-800">Contact Us</h2>
      <form onSubmit={handleSubmit} className="mt-10 max-w-lg mx-auto bg-white shadow-md p-6 rounded-lg">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-md mb-4"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border rounded-md mb-4"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-3 border rounded-md mb-4"
          required
        />
        <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;
