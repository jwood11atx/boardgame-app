const favoritesIDs = (state=[], action) => {
  switch (action.type) {
    case "ADD_FAVORITE_ID":
      return [...state, action.favoriteIDs]
    default:
      return state;
  }
}

export default favoritesIDs;
