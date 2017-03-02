const searchIDs = (state=[], action) => {
  switch (action.type) {
    case "SEARCH_IDS":
      return action.searchIDs;
    case "CLEAR_SEARCH_IDS":
      return [];
    default:
      return state;
  }
}

export default searchIDs;
