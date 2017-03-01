import { combineReducers } from "redux";
import hotnessReducer from "./hotness-reducer"

const rootReducer = combineReducers({
  hotnessReducer,
})

export default rootReducer;
