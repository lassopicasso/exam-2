import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Nav() {
  const [dropLinks, setDropLinks] = useState(false);

  const location = useLocation().pathname;

  return (
    <nav className="nav">
      <div className="nav__container">
        <Link to="/" className="nav__logo">
          Holidaze
        </Link>
        {/* <div className="nav__links">
          <Link to="/">Home</Link>
          <Link to="contact">Contact</Link>
        </div> */}
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
              <Link className={`hamburger__link${location === "/login" ? "-active" : ""}`} to="/login">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
