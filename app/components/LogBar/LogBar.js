import React from "react";
import {Link} from "react-router";

const LogBar = () => {
  return(
    <div className="log-bar">
      <Link to="/">
        <button className="log-button">sign in</button>
      </Link>
      <Link to="/">
        <button className="log-button">sign up</button>
      </Link>
    </div>
  )
}

export default LogBar;
