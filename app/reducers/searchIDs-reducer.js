const searchIDs = (state=[], action) => {
  switch (action.type) {
    case "SEARCH_IDS":
      return action.searchIDs
    default:
      return state;
  }
}

export default searchIDs;
