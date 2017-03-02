import React from "react";
import HotnessContainer from "../../containers/HotnessContainer/HotnessContainer";
import BoardgameCards from "../BoardgameCards/BoardgameCards";

const Hotness = (props) => {
  return (
    <div className="boardgames-container">
      <h2>The Hotness!</h2>
      <BoardgameCards />
    </div>
  )
}

export default Hotness;
