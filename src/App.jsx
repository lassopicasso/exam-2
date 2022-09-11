import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Contact from "./components/Contact/Contact";
import Login from "./components/Forms/Login";
import Nav from "./common/Nav";
import Footer from "./common/Footer";
import Details from "./components/DetailsPage/DetailsPage";
import Explore from "./components/Explore/Explore";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="details/:id" element={<Details />} />
        <Route path="explore" element={<Explore />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
