import React from "react";

function Header({ header, type }) {
  let headerType = <h1>{header}</h1>;
  if (type === "sub") {
    headerType = <h2>{header}</h2>;
  }
  if (type === "content") {
    headerType = <h3>{header}</h3>;
  }
  return headerType;
}

export default Header;
