import React from "react";
import HotnessContainer from "../../containers/HotnessContainer/HotnessContainer";

const Hotness = (props) => {

  const displayTheHotness = () => {
    return props.hotness.map((game, i) => {
      return <img key={i}
                  className="bg-image"
                  src={game.thumbnail}/>
    })
  }

  return (
    <div className="boardgames-container">
      <h2>The Hotness!</h2>
      <section className="bg-img-container">
        {displayTheHotness()}
      </section>
    </div>
  )
}

export default HotnessContainer(Hotness);
