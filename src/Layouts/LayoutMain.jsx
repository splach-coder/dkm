import React from "react";
import NavBar from "../components/NavBar/NavBar";

const LayoutMain = ({ children }) => {
  return (
    <div>
      <NavBar />
      <section className="mx-[15%]">{children}</section>
    </div>
  );
};

export default LayoutMain;
