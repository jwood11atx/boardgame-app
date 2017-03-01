import { combineReducers } from "redux";
import hotness from "./hotness-reducer"

const rootReducer = combineReducers({
  hotness,
})

export default rootReducer;
