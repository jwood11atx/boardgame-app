import React from "react";
import AppContainer from "../../containers/AppContainer/AppContainer";
import FavoritesContainer from "../../containers/FavoritesContainer/FavoritesContainer";
import BoardgameCards from "../BoardgameCards/BoardgameCards";

class Favorites extends React.Component{
  render(){
    return (
      <div className="boardgames-container">
        <h2 className="page-title">Favorites!</h2>
        <BoardgameCards path={this.props.location.pathname}/>
      </div>
    )
  }
}

export default FavoritesContainer(AppContainer(Favorites))
