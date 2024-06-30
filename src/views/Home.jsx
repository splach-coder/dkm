import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main>
      <div className="flex gap-5">
        <button
          className=" px-5 py-3 rounded-md bg-slate-800 text-white "
          type="button">
          <span>
            <Link to="/msc">MSC extractor</Link>
          </span>
        </button>
        <button
          className=" px-5 py-3 rounded-md bg-slate-800 text-white "
          type="button">
          <span>
            <Link to="/invoice">INVOICE extractor</Link>
          </span>
        </button>
      </div>
    </main>
  );
};

export default Home;
