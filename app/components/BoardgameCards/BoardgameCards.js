import React from "react";
import AppContainer from "../../containers/AppContainer/AppContainer";
import FavoritesContainer from "../../containers/FavoritesContainer/FavoritesContainer";
import BGDetailsContainer from "../../containers/BGDetailsContainer/BGDetailsContainer";
import FavButton from "../FavButton/FavButton"
import {Link} from "react-router";

const BoardgameCard = (props) => {
  let display = [];

  const { searchResults,
          favorites,
          recommendations,
          hotness,
          path} = props;

  if(hotness.length === 0){
    return <p className="loading">loading...</p>

  } else if(path === "/search") {
      searchResults.map((game, i) => {
        if(game.name){
          display.push(
            <div key={i} className="bg-card">
              <Link to={game.name[0] ? `/boardgame/${game.name}`
              : `/boardgame/details`}
              onClick={() => addBGDetails(game.id, searchResults)}>
              <img className="bg-image"
                src={game.image}/>
              </Link>
                <FavButton favID={game.id}
                           list={searchResults}/>
            </div>
          )
        } else {
          display = <div key={1}>Nothing Found!</div>;
        }
      })

  } else if(path === "/favorites") {
    favorites.map((game, i) => {
      display.push(
        <div key={i} className="bg-card">
          <Link to={game.name[0] ? `/boardgame/${game.name}`
                                 : `/boardgame/details`}
                onClick={() => addBGDetails(game.id, favorites)}>
            <img className="bg-image"
                 src={game.image}/>
          </Link>
          <FavButton favID={game.id}
                     list={favorites}/>
        </div>
      )
    })

  } else if(path === "/recommendations") {
    recommendations.map((game, i) => {
      display.push(
        <div key={i} className="bg-card">
          <Link to={game.name[0] ? `/boardgame/${game.name}`
                                 : `/boardgame/details`}
                onClick={() => addBGDetails(game.id, recommendations)}>
            <img className="bg-image"
                 src={game.image}/>
          </Link>
          <FavButton favID={game.id}
                     list={recommendations}/>
        </div>
      )
    })

  } else {
    hotness.map((game, i) => {
      display.push(
        <div key={i} className="bg-card"
                     id={game.id}>
            <Link to={game.name.value ? `/boardgame/${game.name.value}`
                                   : `/boardgame/details`}
                  onClick={() => addBGDetails(game.id, hotness)}>
              <img className="bg-thumbnail"
                   src={game.thumbnail.value}/>
             </Link>
             <FavButton favID={game.id}
                        list={hotness}/>
        </div>
      )
    })
  }


  const addBGDetails = (id, list) => {
    fetch(`/api/v1/bg-details?id=${id}`)
      .then(res => res.json())
      .then(details => {
        list.forEach(game => {
          if(game.id === id){
            Object.assign(game, details);
            props.getBGDetails(game);
          }
        })
      })
  }

  return (
    <section className="bg-img-container">
      {display}
    </section>
  )
}

export default BGDetailsContainer(AppContainer(FavoritesContainer(BoardgameCard)));
