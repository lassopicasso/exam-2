import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

function NavDesktop({ auth, location, logout }) {
  const [dropAdminLinks, setDropAdminLinks] = useState(false);
  const dropDown = useRef(null);
  document.addEventListener("mousedown", checkClick);
  function checkClick(event) {
    if (dropDown.current && dropAdminLinks && !dropDown.current.contains(event.target)) {
      setDropAdminLinks(null);
    }
  }

  return (
    <>
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
        <div className="nav__admin--wrapper" onClick={() => setDropAdminLinks(!dropAdminLinks)} ref={dropDown}>
          <button className={`nav__button ${location === "/messages" || location === "/add_hotel" ? "nav__button-active" : ""}`}>
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
    </>
  );
}

export default NavDesktop;
