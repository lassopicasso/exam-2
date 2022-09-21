import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Contact from "./components/Contact/Contact";
import Login from "./components/Forms/Login";
import Nav from "./common/Nav";
import Footer from "./common/Footer";
import Details from "./components/DetailsPage/DetailsPage";
import Explore from "./components/Explore/Explore";
import { AuthProvider } from "./context/AuthContext";
import MessagePage from "./components/Admin/MessagePage";
import AddHotelPage from "./components/Admin/AddHotelPage";
function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
