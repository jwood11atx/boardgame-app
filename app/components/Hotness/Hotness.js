import React from "react";
import HotnessContainer from "../../containers/HotnessContainer/HotnessContainer";

const Hotness = (props) => {

  const displayTheHotness = () => {
    return props.hotness.map((game, i) => {
      return <img key={i} src={game.thumbnail}/>
    })
  }

  return (
    <div>
      <h2>The Hotness!</h2>
      {displayTheHotness()}
    </div>
  )
}

export default HotnessContainer(Hotness);
