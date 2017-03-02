import { combineReducers } from "redux";
import hotness from "./hotness-reducer";
import searchResults from "./searchResults-reducer";
import searchIDs from "./searchIDs-reducer";
import favoritesIDs from "./favoritesIDs-reducer";
import favorites from "./favorites-reducer";

const rootReducer = combineReducers({
  hotness,
  searchResults,
  searchIDs,
  favoritesIDs,
  favorites
})

export default rootReducer;
