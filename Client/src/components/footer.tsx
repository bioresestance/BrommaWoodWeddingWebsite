import React from "react";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="flex flex-col justify-center items-center h-16 bg-gradient-to-r from-purple-500/75 to-blue-500/75 fixed w-full rounded-t-3xl z-10 bottom-0">
        <p>Website Created by Aaron Bromma </p>
        <p>&copy; 2024 AJB Technologies Inc.</p>
      </div>
    </footer>
  );
};

export default Footer;
