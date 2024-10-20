import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 min-h-[15vh] text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        
        {/* Footer Navigation Links */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-400">
            About
          </Link>
          <Link to="/contact" className="hover:text-gray-400">
            Contact
          </Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <FaFacebook className="text-2xl" />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <FaTwitter className="text-2xl" />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <FaInstagram className="text-2xl" />
          </a>
        </div>
      </div>

      {/* Footer Bottom Text */}
      <div className="container mx-auto text-center mt-4 text-gray-500 text-sm">
        © 2024 MyApp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
