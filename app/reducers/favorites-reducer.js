const favorites = (state=[], action) => {
  switch (action.type) {
    case "ADD_FAVORITE":
      return [...state, action.favorite];
    case "REMOVE_FAVORITE":
      return state.filter((fav) => {
        if (fav.id != action.favorite.id) {
          return fav;
        }
      })
    default:
      return state;
  }
}

export default favorites;
