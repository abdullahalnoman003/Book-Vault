import React from 'react';
import { FaFacebookF, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { FaSquareXTwitter } from "react-icons/fa6";
import { TfiBook } from 'react-icons/tfi';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className=" z-10 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 py-8 px-4 rounded-t-2xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Branding */}
        <div className="text-center sm:text-left">
          <h2 className="text-3xl font-extrabold  flex items-center justify-center sm:justify-start gap-2 text-primary">
            <TfiBook className="text-4xl" />
            Book<span className="text-secondary">Vault</span>
          </h2>
          <p className="mt-2 text-sm">
            Your personal digital library. Organize, review, and track your books in one place.
          </p>
          <p className="text-xs mt-4">
            &copy; {new Date().getFullYear()} BookVault. All rights reserved.
          </p>
        </div>

        {/* Contact */}
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
          <p className="text-sm">📧 support@bookvault.com</p>
          <p className="text-sm">📞 +880 1234-567890</p>
          <p className="text-sm mt-1">🏢 Dhaka, Bangladesh</p>
        </div>

        {/* Legal */}
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-semibold mb-2">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/terms" className="hover:text-primary transition-colors duration-200">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-primary transition-colors duration-200">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
          <div className="flex justify-center sm:justify-start gap-5 mt-3 text-2xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF className="hover:text-blue-500 transition-colors duration-200" />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X">
              <FaSquareXTwitter className="hover:text-black transition-colors duration-200" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="hover:text-pink-500 transition-colors duration-200" />
            </a>
            <a href="mailto:support@bookvault.com" aria-label="Email">
              <FaEnvelope className="hover:text-red-500 transition-colors duration-200" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
