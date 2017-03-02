const searchResults = (state=[], action) => {
  switch (action.type) {
    case "SEARCH_RESULTS":
    if(action.searchResults.length){
      return [...state, ...action.searchResults];
    } else {
      return [action.searchResults]
    }
    case "CLEAR_SEARCH_RESULTS":
      return [];
    default:
      return state;
  }
}

export default searchResults;
