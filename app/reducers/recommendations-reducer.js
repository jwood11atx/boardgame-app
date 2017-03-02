const recommendations = (state=[], action) => {
  switch (action.type) {
    case "GET_RECOMMENDATIONS":
      return action.recommendations;
    default:
      return state;
  }
}

export default recommendations;
