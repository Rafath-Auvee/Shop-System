import { combineReducers } from "redux";
import { filterReducer } from "./filterReducers.js";
import productReducer from "./productReducer";

const rootReducers = combineReducers({
  product: productReducer,
  filter: filterReducer,
});

export default rootReducers;
