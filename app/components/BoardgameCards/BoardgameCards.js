import React from "react";
import AppContainer from "../../containers/AppContainer/AppContainer";
import FavoritesContainer from "../../containers/FavoritesContainer/FavoritesContainer";

const BoardgameCard = (props) => {
  let display = [];

  if(props.hotness.length === 0){
    return <p className="loading">loading...</p>

  } else if(props.path === "/search") {
    props.searchResults.map((game, i) => {
      display.push(
        <div key={i} className="bg-card">
            <img className="bg-image"
                 src={game.image}/>
               <button className="favorite-button">favorite!</button>
        </div>
      )
    })

  } else {
    props.hotness.map((game, i) => {
      display.push(
        <div key={i} className="bg-card"
                     id={game.id}>
            <img className="bg-thumbnail"
                 src={game.thumbnail}/>
               <button className="favorite-button"
                       id={game.gameId}
                       onClick={(e) => addToFavorites(e.target)}>favorite!</button>
        </div>
      )
    })
  }

  const addToFavorites = (game) => {
    props.addFavorite(game.id)
  }

  return (
    <section className="bg-img-container">
      {display}
    </section>
  )
}

export default AppContainer(FavoritesContainer(BoardgameCard));
