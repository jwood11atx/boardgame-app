import React from "react";
import {Link} from "react-router";
import Nav from "../Nav/Nav";


const Header = (path) => {
  return (
    <div className="Header">
      <Link to="/"
            className="logo"
            onClick={() => clearNavSelection()}>
        <h1 className="logo-text">Boardgame It!</h1>
      </Link>
      <Nav />
    </div>
  );
}

export default Header;
