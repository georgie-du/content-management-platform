import React from "react";
import Navbar from "./components/Nav/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import CreateBlog from "./pages/CreateBlog";



const App = () => {

  return (
    <Router>

      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/auth" element={<Auth />} />
        <Route exact path="/createBlog" element={<CreateBlog />} />
      </Routes>
    </Router>
  );
};
export default App;
