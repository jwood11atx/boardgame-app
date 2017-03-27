import { combineReducers } from "redux";
import hotness from "./hotness-reducer";
import searchResults from "./searchResults-reducer";
import favorites from "./favorites-reducer";
import recommendations from "./recommendations-reducer";
import bgDetails from "./bgDetails-reducer";
import user from "./user-reducer";

const rootReducer = combineReducers({
  hotness,
  searchResults,
  favorites,
  recommendations,
  bgDetails,
  user
})

export default rootReducer;
