import React from "react";
import {Link} from "react-router";
import Nav from "../Nav/Nav";
import LogBar from "../LogBar/LogBar";


const Header = (path) => {
  const clearNavSelection = () => {
    // document.getElementsByClassName("selected")[0].classList.remove("selected");

  }

  return (
    <div className="Header">
      <Link to="/"
            className="logo"
            onClick={() => clearNavSelection()}>
        <h1 className="logo-text">Boardgame It!</h1>
      </Link>
      <Nav />
      <LogBar />
    </div>
  );
}

export default Header;
