import React from "react";
import HotnessContainer from "../../containers/HotnessContainer/HotnessContainer";

const Hotness = (props) => {

  const displayTheHotness = () => {
    const hotness = props.hotness.map((game, i) => {
      return <img key={i} src={game.thumbnail}/>
    })
    return hotness;
  }

  return (
    <p>{displayTheHotness()}</p>
  )
}

export default HotnessContainer(Hotness);
