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
            <button className="favorite-button"
                    id={game.id}
                    onClick={e =>
                      addToFavorites(e.target)}>favorite!</button>
        </div>
      )
    })

  } else if(props.path === "/favorites") {
    props.favorites.map((game, i) => {
      display.push(
        <div key={i} className="bg-card">
            <img className="bg-image"
                 src={game.image}/>
            <button className="favorite-button"
                    id={game.id}
                    onClick={e =>
                      addToFavorites(e.target)}>favorite!</button>
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
                    onClick={e =>
                     addToFavorites(e.target)}>favorite!</button>
        </div>
      )
    })
  }

  const addToFavorites = (game) => {
    props.addFavoriteIDs(game.id)

    if(props.path === "/search"){
      let list = props.searchResults;
      for(let i=0; list.length>i; i++){
        if(list[i].id == game.id){
          props.addFavorite(list[i])
          return;
        }
      }
    } else {
      fetch(`http://localhost:3000/list?id=${game.id}`)
      .then(res => res.json())
      .then(game => {
        props.addFavorite(game)
      })
    }
  }

  return (
    <section className="bg-img-container">
      {display}
    </section>
  )
}

export default AppContainer(FavoritesContainer(BoardgameCard));
