import React from "react";
import AppContainer from "../../containers/AppContainer/AppContainer";
import FavoritesContainer from "../../containers/FavoritesContainer/FavoritesContainer";
import BoardgameCards from "../BoardgameCards/BoardgameCards";

class Favorites extends React.Component{
  componentDidMount(){
    console.log(this.props);
  }

  render(){
    return (
      <div className="boardgames-container">
        <BoardgameCards path={this.props.location.pathname}/>
      </div>
    )
  }
}

export default FavoritesContainer(AppContainer(Favorites))
