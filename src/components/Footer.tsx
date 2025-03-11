"Use client";
import React from "react";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold text-white">Vibgyor Solutions</h2>
          <p className="mt-3 text-gray-400">
          At Vibgyor Solution, we ignite change through next-generation education, empowering individuals with cutting-edge tools and skills.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold text-white">Quick Links</h2>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href="/about" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-white transition">
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-white transition">
                Careers
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-bold text-white">Follow Us</h2>
          <div className="mt-3 flex space-x-4">
            <a href="#" className="hover:text-white transition">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaLinkedinIn size={20} />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Vibgyor Solutions. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
