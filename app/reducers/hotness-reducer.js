const hotness = (state=[], action) => {
  switch (action.type) {
    case "GET_HOTNESS":
      return action.hotness;
    default:
      return state;
  };
};

export default hotness;
