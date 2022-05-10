import React from "react";
import Navbar from "./components/Nav/Navbar";
import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
// import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./components/BlogDetails/BlogDetails";



const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <Router>
      <Container maxWidth='xl'>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Navigate to="/posts" />} />
          <Route exact path="/posts" element={<Home />} />
          <Route exact path="/posts/search" element={<Home />} />
          <Route exact path="/posts/:id" element={<BlogDetails />} />
          {/* <Route exact path="/auth" element={<Auth />} /> */}
          {!user ? (<Route path="/auth" exact element={<Auth />} />) : (<Route path="/auth" exact element={<Navigate to="/posts" />} />)}
        </Routes>
      </Container>
    </Router>

  );
};
export default App;
