import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 px-6 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-semibold">
          Task Management App
        </h1>

        <ul className="flex space-x-6 text-white font-medium">
          <Link to={"/login"} className="cursor-pointer hover:text-gray-200">
            Login
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
