// components/Footer.jsx

import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-0 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold mb-2">✈️ SkyReserve</h2>
          <p className="text-gray-400">
            Your trusted partner in affordable and reliable air travel. Fly smart. Fly safe. SkyReserve.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
            <li><a href="/faq" className="hover:text-white">FAQ</a></li>
            <li><a href="/terms" className="hover:text-white">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/" className="hover:text-blue-500"><FaFacebookF /></a>
            <a href="https://twitter.com/" className="hover:text-blue-400"><FaTwitter /></a>
            <a href="https://www.instagram.com/" className="hover:text-pink-500"><FaInstagram /></a>
            <a href="https://www.linkedin.com/" className="hover:text-blue-600"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} FlyNow. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;