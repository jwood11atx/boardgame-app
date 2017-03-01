import React from "react";
import {Link} from "react-router";

const logStuff = () => {
  console.log("clicked!");
}

const Header = () => {
  return (
    <div className="Header">
      <h1>Boardgame App</h1>
      <Link to="/favorites">
        <button>go to favorites</button>
      </Link>
    </div>
  );
}

export default Header;
