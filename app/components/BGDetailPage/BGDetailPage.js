import React from "react";
import AppContainer from "../../containers/AppContainer/AppContainer";
import BGDetailsContainer from "../../containers/BGDetailsContainer/BGDetailsContainer";
import FavoritesContainer from "../../containers/FavoritesContainer/FavoritesContainer";

const BGDetailPage = (props) => {
  const game = props.bgDetails;
  let display = [];

  const types = ["artists", "designers", "publishers", "categories", "mechanisms", "families"];

  if(!game.image && game.id){
    fetch(`/api/v1/boardgame/${game.id}`)
      .then(res => res.json())
      .then(details1 => {
        fetch(`/api/v1/bg-details/${game.id}`)
          .then(res => res.json())
          .then(details2 => {
            const boardgame = Object.assign({}, details1, details2);
            props.getBGDetails(boardgame)
          })
      })
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
    types.map((type, i) => {
      let list = [];
        if(!game[type]) game[type] = 0;

        if(game[type].length > 0){
          game[type].forEach((e, i) => {
            list.push(<p key={i}>{e}</p>)
          })
        } else {
          list.push(<p key={1}>N/A</p>)
        }
      return (
        <div className="detail-section"
             key={i}>
          <h3 className="detail-section-title">{type}:</h3>
            {list}
        </div>
      )
    })
    return (
      <div className="bg-details-page">
        <div className="left-container">
          <img className="detail-image" src={game.image}/>
        </div>
        <div className="right-container">
          <div className="game-details-container">
            <h2 className="game-title">{game.name}</h2>
            <p>players: {game.minplayers}-{game.maxplayers}</p>
            <p>playingtime: {game.playingtime}min</p>
            <div className="game-details">{display}</div>
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
export default BGDetailsContainer(FavoritesContainer(AppContainer(BGDetailPage)));
