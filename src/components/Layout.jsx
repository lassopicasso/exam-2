import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Contact from "./Forms/Contact";
import Login from "./Forms/Login";
import Nav from "../common/Nav/Nav";
import Footer from "../common/Footer";
import Details from "./DetailsPage/DetailsPage";
import Explore from "./Explore/Explore";
import MessagePage from "./Admin/MessagePage";
import AddHotelPage from "./Admin/AddHotelPage/AddHotelPage";

function Layout() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="details/:id" element={<Details />} />
        <Route path="explore" element={<Explore />} />
        <Route path="messages" element={<MessagePage />} />
        <Route path="add_hotel" element={<AddHotelPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default Layout;
