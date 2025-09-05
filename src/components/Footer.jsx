import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = ({user}) => {
  return (
    <div className="fixed bottom-0 w-full">
      <footer className="bg-base-300 text-center p-4 flex flex-col sm:flex-row items-center justify-between relative overflow-hidden">
        
        <p className="text-sm">© 2025 Tindora. All rights reserved.</p>

        {user && (<div className="absolute left-1/2 transform -translate-x-1/2 w-full overflow-hidden">
          <span className="disclaimer-text">
            ⚠️ Disclaimer: All photos are taken from Pinterest for demonstration purposes only ⚠️
          </span>
        </div>)}

        <div className="flex gap-5 mt-2 sm:mt-0 text-lg">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400 transition-colors"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700 transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
