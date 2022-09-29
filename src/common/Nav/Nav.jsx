import React, { useState, useContext, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import NavDesktop from "./NavDesktop";
import NavPhone from "./NavPhone";

function Nav() {
  const [dropBurgerLinks, setDropBurgerLinks] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const dropDown = useRef(null);

  //Check if user click outside of menu, if so, close menu
  document.addEventListener("mousedown", checkClick);
  function checkClick(event) {
    if (dropDown.current && dropBurgerLinks && !dropDown.current.contains(event.target)) {
      setDropBurgerLinks(null);
    }
  }

  //Navigate to homepage when logging out
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
          <NavDesktop auth={auth} location={location} logout={logout} />
        </div>
        <div className="nav__hamburger" onClick={() => setDropBurgerLinks(!dropBurgerLinks)} ref={dropDown}>
          <NavPhone auth={auth} location={location} logout={logout} dropBurgerLinks={dropBurgerLinks} />
        </div>
      </div>
    </nav>
  );
}

export default Nav;
