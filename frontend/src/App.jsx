import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Error from "./pages/Error";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" Component={DashBoard} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="*" Component={Error} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
