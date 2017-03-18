import React from "react";
import {Link} from "react-router";
import Nav from "../Nav/Nav";

const Header = () => {
  return (
    <div className="Header">
      <h1 className="logo">Boardgame It!</h1>
      <Nav />
    </div>
  );
}

export default Header;
