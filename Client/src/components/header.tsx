import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../authContext";

const Header: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
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
        <Link
          to="/rsvp"
          className="text-gray-800 hover:bg-indigo-500 hover:text-white px-2 py-2 rounded-md text-sm font-medium border border-2 bg-gray-600/20 w-28 h-10 text-center"
        >
          RSVP
        </Link>
        <Link
          to="/about"
          className="text-gray-800 hover:bg-indigo-500 hover:text-white px-2 py-2 rounded-md text-sm font-medium border border-2 bg-gray-600/20 w-28 h-10 text-center"
        >
          About
        </Link>
        <Link
          to="/faq"
          className="text-gray-800 hover:bg-indigo-500 hover:text-white px-2 py-2 rounded-md text-sm font-medium border border-2 bg-gray-600/20 w-28 h-10 text-center"
        >
          Help
        </Link>
      </nav>

      <div className="w-1/3 flex justify-end items-center space-x-20 font-bold">
        {/* TODO: Make this logout only appear when we are actually logged in */}
        {user && (
          <Link to="/">
            <button
              onClick={logout}
              className="bg-blue-400 rounded-full px-10 py-1"
            >
              Logout
            </button>
          </Link>
        )}
        <p>June 15th, 2025</p>
      </div>
    </header>
  );
};

export default Header;
