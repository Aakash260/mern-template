import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SelectStore from "./pages/SelectStore";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HandleLabel from "./pages/HandleLabel";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" Component={SelectStore} />
        <Route path="/change-discount" Component={HandleLabel} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
