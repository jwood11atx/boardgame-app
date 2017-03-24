import React from "react";
import AppContainer from "../../containers/AppContainer/AppContainer";
import FavoritesContainer from "../../containers/FavoritesContainer/FavoritesContainer";

const FavButton = (props) => {
  let found = false;
  const {list, favID, favorites, removeFavorite} = props
  const addToFavorites = (event, list) => {
    const game = event.target;
    event.stopPropagation();

    for(let i=0; list.length>i; i++){
      if(list[i].id == game.id){
        props.addFavorite(list[i])
        return;
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
