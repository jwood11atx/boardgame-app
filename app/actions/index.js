export const getHotness = (hotness) => {
  return {
    type: "GET_HOTNESS",
    hotness
  }
};

export const getSearchResults = (searchResults) => {
  return {
    type: "SEARCH_RESULTS",
    searchResults
  }
};

export const clearSearchResults = () => {
  return {
    type: "CLEAR_SEARCH_RESULTS"
  }
};

export const incDisplayed = () => {
  return {
    type: "INCREASE_DISPLAY"
  }
};

export const resetDisplayed = () => {
  return {
    type: "RESET_DISPLAY"
  }
};

export const removeFavorite = (favorite) => {
  return {
    type: "REMOVE_FAVORITE",
    favorite
  }
};

export const addFavorite = (favorite) => {
  return {
    type: "ADD_FAVORITE",
    favorite
  }
};

export const getRecommendations = (recommendations) => {
  return {
    type: "GET_RECOMMENDATIONS",
    recommendations
  }
};

export const getBGDetails = (bgDetails) => {
  return {
    type: "GET_BGDETAILS",
    bgDetails
  }
};

export const getUser = (user) => {
  return {
    type: "GET_USER",
    user
  }
}
