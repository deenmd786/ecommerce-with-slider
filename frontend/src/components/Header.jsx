import { Link, useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearUserDetail } from "../features/userSlice";
import fetchData from "../utils/api"; // Assuming API utility is available
import '../App.css'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state?.user?.user);
  const [isDashVisible, setIsDashVisible] = useState(true); // State to manage dashboard visibility
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle Login Button Click
  const handleLoginClick = () => {
    navigate("/login");
    toggleMobileMenu();
  };

  // Handle Dashboard Toggle
  const handleDashboardToggle = () => {
    const newValue = !isDashVisible;
    if (newValue) {
      navigate("/admin-panel");
    } else {
      navigate("/");
    }
    setIsDashVisible(newValue);
  };

  // Handle Logout
  const handleLogoutClick = async () => {
    try {
      await fetchData("/auth/logout", "POST", null, true);
      dispatch(clearUserDetail());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
    toggleMobileMenu();
  };

  // Toggle Mobile Menu
  const toggleMobileMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className="h-[10vh] bg-gray-900 relative">
      <nav className="container h-full text-white shadow-md mx-auto flex items-center justify-between p-2">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/">MyApp</Link>
        </div>

        {/* Desktop Links - Centered Navigation */}
        <div className="hidden md:flex space-x-6 justify-center flex-1">
          <Link to="/" className="hover:text-gray-400 transition duration-300">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-400 transition duration-300">
            About
          </Link>
          <Link to="/contact" className="hover:text-gray-400 transition duration-300">
            Contact
          </Link>
        </div>

        {/* Profile and Login/Logout */}
        <div className="flex items-center space-x-3 md:space-x-6">
          <Link
            to={isDashVisible ? "/" : "/admin-panel"}
            className="flex items-center space-x-2 shadow-sm rounded-full cursor-pointer border-2 md:hover:border-gray-400 border-white p-1"
            onClick={handleDashboardToggle}
          >
            {user ? (
              <img
                src={user.profilePic}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <FaUser className="text-lg m-1" />
            )}
          </Link>
          <CustomButton
            name={user ? "Logout" : "Login"}
            onClick={user ? handleLogoutClick : handleLoginClick}
            className={'max-md:hidden'}
          />
          <div className="md:hidden">
            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className={`menu-icon ${isOpen ? 'open' : ''}`}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      
  <div className={`md:hidden bg-gray-900 text-white space-y-2 p-4 rounded-lg mobile-menu ${isOpen ? 'open' : ''}`}
  >
    <Link
      to="/"
      className="block hover:text-gray-400 transition duration-300"
      onClick={toggleMobileMenu}
    >
      Home
    </Link>
    <Link
      to="/about"
      className="block hover:text-gray-400 transition duration-300"
      onClick={toggleMobileMenu}
    >
      About
    </Link>
    <Link
      to="/contact"
      className="block hover:text-gray-400 transition duration-300"
      onClick={toggleMobileMenu}
    >
      Contact
    </Link>
    <CustomButton
      name={user ? "Logout" : "Login"}
      onClick={user ? handleLogoutClick : handleLoginClick}
    />
  </div>

    </header>
  );
};

export default Header;
