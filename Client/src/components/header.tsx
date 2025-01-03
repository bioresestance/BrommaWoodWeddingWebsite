import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../authContext";

const Header: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const links = [
    { to: "/rsvp", label: "RSVP" },
    { to: "/venue", label: "Venue" },
    { to: "/hotels", label: "Hotels" },
    { to: "/rules", label: "Rules" },
    { to: "/faq", label: "FAQ" },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-400/75 to-purple-400/75 sm:fixed w-full z-10 md:shadow-xl">
      <div className="container mx-auto flex items-center justify-between p-3 md:m-1 md:px-10 h-auto rounded-b-3xl max-w-full">
        <div className="flex justify-start items-center 2xl:mb-[-175px]">
          <Link to="/">
            <img
              className="w-16 h-16 md:w-24 md:h-24 2xl:w-48 2xl:h-48 rounded-full shadow-lg border-black border-2 2xl:border-6"
              src="/photos/logo.png"
              alt="Profile"
            />
          </Link>
        </div>

        <nav className="hidden lg:grid lg:grid-cols-3 2xl:flex justify-center space-y-2 md:space-x-6 lg:space-x-10 xl:space-x-15 ">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-gray-800 hover:bg-indigo-500 hover:text-white px-2 py-2 rounded-md text-sm sm:text-base md:text-xl font-medium border-2 bg-gray-600/20 w-16 sm:w-20 md:w-36 h-8 md:h-10 text-center"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex justify-end items-center space-x-4 md:space-x-15 font-bold text-xl md:text-2xl">
          <p>June 15th, 2025</p>
          {user && (
            <Link to="/">
              <button
                onClick={logout}
                className="bg-blue-400 rounded-full px-4 py-1 md:px-10 md:py-1"
              >
                Logout
              </button>
            </Link>
          )}
        </div>

        <div className="lg:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-800 hover:text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute right-0 w-full bg-blue-100 shadow-lg rounded-b-3xl z-20">
          <nav className="flex flex-col items-center space-y-2 py-2">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-800 hover:bg-indigo-500 hover:text-white px-2 py-2 rounded-md text-xl font-medium border-2 bg-gray-600/20 w-36 h-10 text-center"
                onClick={toggleMenu}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
