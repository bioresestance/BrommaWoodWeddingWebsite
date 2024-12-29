import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-400/75 to-blue-400/75 w-full text-lg md:text-md">
      <div className="flex flex-col justify-center items-center h-24 p-4 md:rounded-t-3xl z-10">
        <p className="text-center">Website Created by Aaron Bromma</p>
        <p className="text-center">
          &copy; {new Date().getFullYear()} AJB Technologies Inc.
        </p>
        <Link to="/privacy" className="text-white underline mt-2">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
