export const getHotness = (hotness) => {
  return {
    type: "GET_HOTNESS",
    hotness
  }
}

export const getSearchResults = (searchResults) => {
  return {
    type: "SEARCH_RESULTS",
    searchResults
  }
}

export const getSearchIDs = (searchIDs) => {
  return {
    type: "SEARCH_IDS",
    searchIDs
  }
}
