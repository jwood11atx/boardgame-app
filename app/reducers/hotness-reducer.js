const hotness = (state=[], action) => {
  console.log(action);
  switch (action.type) {
    case "GET_HOTNESS":
      return action.hotness;
    default:
      return state;
  };
};

export default hotness;
