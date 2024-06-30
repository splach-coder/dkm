import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LayoutMain from "./Layouts/LayoutMain";
import Home from "./views/Home";
import MSC from "./views/MSC";
import Invoice from "./views/Invoice";

const App = () => {
  return (
    <Router>
      <LayoutMain>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/msc" element={<MSC />} />
          <Route path="/invoice" element={<Invoice />} />
        </Routes>
      </LayoutMain>
    </Router>
  );
};

export default App;
