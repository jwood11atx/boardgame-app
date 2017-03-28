import React from "react";
import {Link} from "react-router";
import LogBar from "../LogBar/LogBar";


const Nav = () => {
  return(
    <div className="nav-container">
      <div className="nav-bar">
        <Link to="/search">
          <button className="nav-button">search</button>
        </Link>
        <Link to="/favorites">
          <button className="nav-button">favorites</button>
        </Link>
        <Link to="/recommendations">
          <button className="nav-button">recommendations</button>
        </Link>
      </div>
      {/* <LogBar /> */}
    </div>
  )
}

export default Nav;
