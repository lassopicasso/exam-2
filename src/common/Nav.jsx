import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
function Nav() {
  const [dropLinks, setDropLinks] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const location = useLocation().pathname;

  const navigate = useNavigate();

  function logout() {
    console.log(auth);
    setAuth(null);
    navigate("/");
  }

  return (
    <nav className="nav">
      <div className="nav__container">
        <Link to="/" className="nav__logo">
          Holidaze
        </Link>
        <div className="nav__links">
          <Link to="/" className={`nav__link${location === "/" ? "-active" : ""}`}>
            Home
          </Link>
          <Link to="/explore" className={`nav__link${location === "/explore" ? "-active" : ""}`}>
            Explore
          </Link>
          <Link to="/contact" className={`nav__link${location === "/contact" ? "-active" : ""}`}>
            <i className="fas fa-user"></i>
          </Link>
        </div>
        <div className="nav__hamburger" onClick={() => setDropLinks(!dropLinks)}>
          <i className="fas fa-bars"></i>
          {dropLinks && (
            <div className="hamburger__links">
              <Link className={`hamburger__link${location === "/" ? "-active" : ""}`} to="/">
                Home
              </Link>
              <Link className={`hamburger__link${location === "/explore" ? "-active" : ""}`} to="/explore">
                Explore
              </Link>
              <Link className={`hamburger__link${location === "/contact" ? "-active" : ""}`} to="/contact">
                Contact
              </Link>
              {auth ? (
                <>
                  {auth.user.username === "Admin" ? (
                    <>
                      <Link className={`hamburger__link${location === "/messages" ? "-active" : ""}`} to="/messages">
                        Messages
                      </Link>
                      <Link className={`hamburger__link${location === "/add_hotel" ? "-active" : ""}`} to="/add_hotel">
                        Add Hotel
                      </Link>
                    </>
                  ) : (
                    <Link className={`hamburger__link${location === "/messages" ? "-active" : ""}`} to="/messages">
                      Enquiries
                    </Link>
                  )}

                  <button className="hamburger__link" onClick={logout}>
                    Logout
                  </button>
                </>
              ) : (
                <Link className={`hamburger__link${location === "/login" ? "-active" : ""}`} to="/login">
                  Login
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
