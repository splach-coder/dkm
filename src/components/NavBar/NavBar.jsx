import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header className="w-full px-6 py-3">
      <div className="text-xl font-extrabold ">
        <Link to="/">
          DKM{" "}
          <span className="text-sm font-bold text-gray-700 ms-[-6px]">
            <big>S</big>olutions
          </span>
        </Link>
      </div>
    </header>
  );
};

export default NavBar;
