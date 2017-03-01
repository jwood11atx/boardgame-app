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

export const getSearchIDs = (searchIDs) => {
  return {
    type: "SEARCH_IDS",
    searchIDs
  }
};

export const clearSearchIDs = () => {
  return {
    type: "CLEAR_SEARCH_IDS"
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

export const addFavorite = (favorite) => {
  return {
    type: "ADD_FAVORITE",
    favorite
  }
};
