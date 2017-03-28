import React from "react";
import {Link} from "react-router";

const Nav = () => {
  const highlight = (tag) => {
  //   const navArr = document.getElementsByClassName("nav-button");
  //
  //   for (var i = 0; i < navArr.length; i++) {
  //     navArr[i].classList.remove("selected");
  //
  //     if (tag.innerHTML === navArr[i].innerHTML) {
  //       navArr[i].classList.add("selected");
  //     }
  //   }
  }

  return(
    <div className="nav-bar">
      <Link to="/search">
        <button className="nav-button"
                onClick={(e) => highlight(e.target)}
                >search</button>
      </Link>
      <Link to="/favorites">
        <button className="nav-button"
                onClick={(e) => highlight(e.target)}
                >favorites</button>
      </Link>
      <Link to="/recommendations">
        <button className="nav-button"
                onClick={(e) => highlight(e.target)}
                >recommendations</button>
      </Link>
    </div>
  )
}

export default Nav;
