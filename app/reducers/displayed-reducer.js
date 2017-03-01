const displayed = (state=10, action) => {
  switch (action.type) {
    case "INCREASE_DISPLAY":
      return state + 10;
    case "RESET_DISPLAY":
      return 10;
    default:
      return state;
  }
}

export default displayed
