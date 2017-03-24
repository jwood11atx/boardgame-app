import React from "react";
import AppContainer from "../../containers/AppContainer/AppContainer";
import BGDetailsContainer from "../../containers/BGDetailsContainer/BGDetailsContainer";
import FavoritesContainer from "../../containers/FavoritesContainer/FavoritesContainer";

const BGDetailPage = (props) => {
  const game = props.bgDetails;
  let display = [];
  const details = { "Categories": [],
                    "Mechanics": [],
                    "Family": [],
                    "Artists": [],
                    "Designers": [],
                    "Publishers": []
                  };

  const convertKey = (str) => {
    switch (str) {
      case "Mechanics":
        return "mechanisms"
      case "Categories":
        return "categories";
      case "Family":
        return "families";
      case "Designers":
        return "designers";
      case "Publishers":
        return "publishers";
      case "Artists":
        return "artists";
      default:
        break;
    }
  };

  if(Object.keys(game).length != 0){
    display =
    Object.keys(details).map((key, i) => {
      let list = [];
      key = convertKey(key);
      if(typeof game[key] === "object"){
        if(game[key].length > 0){
          game[key].forEach((e, i) => {
            list.push(<p key={i}>{e}</p>)
          })
        } else {
          list.push(<p key={1}>N/A</p>)
        }
      }
      return (
        <div className="detail-section"
             key={i}>
          <h3 className="detail-section-title">{key}:</h3>{list}
        </div>
      )
    })

    return (
      <div className="bg-details-page">
        <div className="left-container">
          <img className="detail-image" src={game.image}/>
        </div>
        <div className="right-container">
          <div className="game-details">
            <h2 className="game-title">{game.name}</h2>
            <p>players: {game.minplayers}-{game.maxplayers}</p>
            <p>playingtime: {game.playingtime}min</p>
            <div>{display}</div>
          </div>
          <button className="details-favorite-btn" onClick={() => props.addFavorite(game)}>add to favorite!</button>
        </div>
        <div className="bottom-container">
          <p className="game-description">
            {game.description}
          </p>
        </div>
      </div>
    )
  } else {
    return <div>loading...</div>
  }
}
export default FavoritesContainer(AppContainer(BGDetailPage));
