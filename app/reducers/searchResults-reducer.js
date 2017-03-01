const searchResults = (state=[], action) => {
  switch (action.type) {
    case "SEARCH_RESULTS":
    console.log(state);
      return [...state, ...action.searchResults];
    case "CLEAR_SEARCH_RESULTS":
      return [];
    default:
      return state;
  }
}

export default searchResults;
