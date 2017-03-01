const searchResults = (state=[], action) => {
  switch (action.type) {
    case "SEARCH_RESULTS":
      return [...state, ...action.searchResults]
    default:
      return state;
  }
}

export default searchResults;
