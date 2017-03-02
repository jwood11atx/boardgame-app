const bgDetails = (state={}, action) => {
  switch (action.type) {
    case "GET_BGDETAILS":
      return action.bgDetails;
    default:
      return state;
  }
}

export default bgDetails;
