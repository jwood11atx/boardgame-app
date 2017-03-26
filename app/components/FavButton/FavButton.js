import React from "react";
import AppContainer from "../../containers/AppContainer/AppContainer";
import FavoritesContainer from "../../containers/FavoritesContainer/FavoritesContainer";

const FavButton = (props) => {
  let found = false;
  const {list, favID, favorites, removeFavorite} = props;

  const addToFavorites = (event, list) => {
    const game = event.target;
    event.stopPropagation();


    for(let i=0; list.length>i; i++){
      if(list[i].id == game.id){
        if(list[i].image){
          props.addFavorite(list[i])
          return;
        } else {
          fetch(`/api/v1/boardgame/${game.id}`)
            .then(res => res.json())
            .then(details => {
              console.log(details);
              props.addFavorite(
                Object.assign({}, list[i], details)
              );
            })
        }
      }
    }
  }
  favorites.forEach(fav => {
    if(fav.id === favID) found = fav;
  })

  if(!found){
    return(
      <button className="favorite-button"
        id={favID}
        onClick={e =>
          addToFavorites(e, list)}>favorite!</button>
        )
  } else {
    return(
      <button className="favorite-button"
        id={favID}
        onClick={e =>
          removeFavorite(found)}>remove favorite</button>
        )
  }

}

export default AppContainer(FavoritesContainer(FavButton));
