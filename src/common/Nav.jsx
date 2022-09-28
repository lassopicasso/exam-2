import React, { useState, useContext, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
function Nav() {
  const [dropBurgerLinks, setDropBurgerLinks] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const [dropAdminLinks, setDropAdminLinks] = useState(false);
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const dropDownAdmin = useRef(null);
  const dropDownBurger = useRef(null);
  document.addEventListener("mousedown", checkClick);
  function checkClick(event) {
    if (dropDownAdmin.current && dropAdminLinks && !dropDownAdmin.current.contains(event.target)) {
      setDropAdminLinks(false);
    }
    if (dropDownBurger.current && dropBurgerLinks && !dropDownBurger.current.contains(event.target)) {
      setDropBurgerLinks(false);
    }
  }

  function logout() {
    const confirmSignOut = window.confirm(`${auth.user.username}, are you sure you want to sign out?`);
    if (confirmSignOut) {
      setAuth(null);
      navigate("/");
    }
  }

  return (
    <nav className="nav">
      <div className="nav__container">
        <Link to="/" className="nav__logo">
          Holidaze
        </Link>
        <div className="nav__links">
          <Link to="/explore" className={`nav__link${location === "/explore" ? "-active" : ""}`}>
            Explore
          </Link>
          <Link to="/contact" className={`nav__link${location === "/contact" ? "-active" : ""}`}>
            Contact
          </Link>
          {!auth ? (
            <Link to="/login" className={`nav__link${location === "/login" ? "-active" : ""}`}>
              <i className="fas fa-user"></i>
            </Link>
          ) : (
            <div className="nav__admin--wrapper" ref={dropDownAdmin}>
              <button className={`nav__button ${location === "/messages" || location === "/add_hotel" ? "nav__button-active" : ""}`} onClick={() => setDropAdminLinks(!dropAdminLinks)}>
                <span>{auth.user.username}</span> <i className={`${dropAdminLinks ? "fas fa-caret-up" : "fas fa-caret-down"}`}></i>
              </button>
              {dropAdminLinks && (
                <div className="admin__links">
                  {auth.user.username === "Admin" ? (
                    <>
                      <Link className={`admin__link${location === "/messages" ? "-active" : ""}`} to="/messages" onClick={() => setDropAdminLinks(!dropAdminLinks)}>
                        Messages
                      </Link>
                      <Link className={`admin__link${location === "/add_hotel" ? "-active" : ""}`} to="/add_hotel" onClick={() => setDropAdminLinks(!dropAdminLinks)}>
                        Add Hotel
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link className={`admin__link${location === "/messages" ? "-active" : ""}`} to="/messages" onClick={() => setDropAdminLinks(!dropAdminLinks)}>
                        Enquiries
                      </Link>
                    </>
                  )}
                  <button className="admin__logout admin__link" onClick={logout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div onClick={() => setDropBurgerLinks(!dropBurgerLinks)}>
          <div className="nav__hamburger" ref={dropDownBurger}>
            <i className="fas fa-bars"></i>
            {dropBurgerLinks && (
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
      </div>
    </nav>
  );
}

export default Nav;
