import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-5 shadow-xl md:px-10 bg-gradient-to-r from-blue-500/75 to-purple-500/75 fixed w-full h-12 rounded-b-3xl z-10">
      <div className="w-1/3 flex justify-start items-center mb-[-175px]">
        <Link to="/">
          <img
            className="w-48 h-48 rounded-full shadow-lg border-black border-6"
            src="/photos/logo.png"
            alt="Profile"
          />
        </Link>
      </div>

      <nav className="w-1/3 flex justify-center space-x-20">
        <a
          href="#"
          className="text-gray-800 hover:bg-indigo-500 hover:text-white px-2 py-2 rounded-md text-sm font-medium border border-2 bg-gray-600/20 w-28 h-10 text-center"
        >
          RSVP
        </a>
        <a
          href="#"
          className="text-gray-800 hover:bg-indigo-500 hover:text-white px-2 py-2 rounded-md text-sm font-medium border border-2 bg-gray-600/20 w-28 h-10 text-center"
        >
          Our Story
        </a>
        <a
          href="#"
          className="text-gray-800 hover:bg-indigo-500 hover:text-white px-2 py-2 rounded-md text-sm font-medium border border-2 bg-gray-600/20 w-28 h-10 text-center"
        >
          Help
        </a>
      </nav>

      <div className="w-1/3 text-right font-bold">June 15th, 2025</div>
    </header>
  );
};

export default Header;
