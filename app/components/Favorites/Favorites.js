import React from "react";
import AppContainer from "../../containers/AppContainer/AppContainer";
import FavoritesContainer from "../../containers/FavoritesContainer/FavoritesContainer";
import BoardgameCards from "../BoardgameCards/BoardgameCards";

const Favorites = (props) => {
  return (
    <div className="boardgames-container">
      hello?
    </div>
  )
}

export default FavoritesContainer(AppContainer(Favorites))
