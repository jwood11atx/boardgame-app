import React from "react";
import AppContainer from "../../containers/AppContainer/AppContainer";
import FavoritesContainer from "../../containers/FavoritesContainer/FavoritesContainer";
import BGDetailsContainer from "../../containers/BGDetailsContainer/BGDetailsContainer";
import {Link} from "react-router";

const BoardgameCard = (props) => {
  let display = [];

  if(props.hotness.length === 0){
    return <p className="loading">loading...</p>

  } else if(props.path === "/search") {
    props.searchResults.map((game, i) => {
      display.push(
        <div key={i} className="bg-card">
          <Link to={game.name[0] ? `/boardgame/${game.name[0].value}`
                                 : `/boardgame/details`}
                onClick={() => addBGDetails(game.id)}>
            <img className="bg-image"
                 src={game.image}/>
          </Link>
            <button className="favorite-button"
                    id={game.id}
                    onClick={e =>
                      addToFavorites(e)}>favorite!</button>
          </div>
      )
    })

  } else if(props.path === "/favorites") {
    props.favorites.map((game, i) => {
      display.push(
        <div key={i} className="bg-card">
          <Link to={game.name[0] ? `/boardgame/${game.name[0].value}`
                                 : `/boardgame/details`}
                onClick={() => addBGDetails(game.id)}>
            <img className="bg-image"
                 src={game.image}/>
          </Link>
            <button className="favorite-button"
                    id={game.id}
                    onClick={e =>
                      addToFavorites(e)}>favorite!</button>
        </div>
      )
    })

  } else if(props.path === "/recommendations") {
    props.recommendations.map((game, i) => {
      display.push(
        <div key={i} className="bg-card">
          <Link to={game.name[0] ? `/boardgame/${game.name[0].value}`
                                 : `/boardgame/details`}
                onClick={() => addBGDetails(game.id)}>
            <img className="bg-image"
                 src={game.image}/>
          </Link>

            <button className="favorite-button"
                    id={game.id}
                    onClick={e =>
                      addToFavorites(e)}>favorite!</button>
        </div>
      )
    })

  } else {
    props.hotness.map((game, i) => {
      display.push(
        <div key={i} className="bg-card"
                     id={game.gameId}>
            <Link to={game.name[0] ? `/boardgame/${game.name}`
                                   : `/boardgame/details`}
                  onClick={() => addBGDetails(game.gameId)}>
              <img className="bg-thumbnail"
                   src={game.thumbnail}/>
           </Link>
            <button className="favorite-button"
                    id={game.gameId}
                    onClick={e =>
                     addToFavorites(e)}>favorite!</button>
        </div>
      )
    })
  }

  const addToFavorites = (event) => {
    const game = event.target;
    event.stopPropagation();
    props.addFavoriteIDs(game.id);


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

  const addBGDetails = (id) => {
    fetch(`http://localhost:3000/list?id=${id}`)
    .then(res => res.json())
    .then(game => {
      props.getBGDetails(game);
    })
  }

  return (
    <section className="bg-img-container">
      {display}
    </section>
  )
}

export default BGDetailsContainer(AppContainer(FavoritesContainer(BoardgameCard)));
