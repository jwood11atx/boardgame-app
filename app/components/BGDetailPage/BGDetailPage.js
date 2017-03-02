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
                    "Designers": []
                  };

  if(Object.keys(game).length != 0){
    game.link.forEach(e => {
      switch (e.type) {
        case "boardgamecategory":
          details.Categories.push(e.value);
          break;
        case "boardgamemechanic":
          details.Mechanics.push(e.value);
          break;
        case "boardgamefamily":
          details.Family.push(e.value);
          break;
        case "boardgamedesigner":
          details.Designers.push(e.value);
          break;
        case "boardgameartist":
          details.Artists.push(e.value);
          break;
        default:
          break;
      }
    })

    display =
    Object.keys(details).map((key, i) => {
      let list =
      details[key].map((e, i) => {
        return <p key={i}>{e}</p>
      })
      return (
        <div className="detail-section"
             key={i}>
          <h3 className="detail-section-title">{key}:</h3>{list}
        </div>
      )
    })

    const getName = () => {
      if(game.name.length){
        return game.name[0].value
      } else {
        return game.name.value
      }
    }

    return (
      <div className="bg-details-page">
        <div className="left-container">
          <img className="detail-image" src={game.image}/>
        </div>
        <div className="right-container">
          <div className="game-details">
            <h2 className="game-title">{getName()}</h2>
            <p>players: {game.minplayers.value}-{game.maxplayers.value}</p>
            <p>playingtime: {game.playingtime.value}min</p>
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
