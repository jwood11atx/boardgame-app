import React from "react";
import {Link} from "react-router";

const Nav = () => {
  return(
    <div className="nav-bar">
      <Link to="/">
        <button>home</button>
      </Link>
      <Link to="/favorites">
        <button>favorites</button>
      </Link>
      <Link to="/recommendations">
        <button>recommendations</button>
      </Link>
    </div>
  )
}

export default Nav;
