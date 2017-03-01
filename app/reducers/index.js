import { combineReducers } from "redux";
import hotness from "./hotness-reducer";
import searchResults from "./searchResults-reducer";
import searchIDs from "./searchIDs-reducer";

const rootReducer = combineReducers({
  hotness,
  searchResults,
  searchIDs,
})

export default rootReducer;
