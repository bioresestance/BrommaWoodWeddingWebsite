import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="flex flex-col justify-center items-center h-24 p-4 bg-gradient-to-r from-purple-500/75 to-blue-500/75 md:fixed w-full md:rounded-t-3xl z-10 bottom-0 text-sm md:text-md">
        <p className="text-center">Website Created by Aaron Bromma</p>
        <p className="text-center">&copy; 2024 AJB Technologies Inc.</p>
        <Link to="/privacy" className="text-white underline mt-2">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
