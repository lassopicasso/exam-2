import React from "react";
import { Link } from "react-router-dom";
function NavPhone({ auth, location, logout, dropBurgerLinks }) {
  return (
    <>
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
    </>
  );
}

export default NavPhone;
