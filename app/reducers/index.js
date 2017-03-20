import { combineReducers } from "redux";
import hotness from "./hotness-reducer";
import searchResults from "./searchResults-reducer";
import searchIDs from "./searchIDs-reducer";
import favorites from "./favorites-reducer";
import recommendations from "./recommendations-reducer";
import bgDetails from "./bgDetails-reducer";

const rootReducer = combineReducers({
  hotness,
  searchResults,
  searchIDs,
  favorites,
  recommendations,
  bgDetails
})

export default rootReducer;
