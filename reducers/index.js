import { combineReducers } from "redux";
import { favouritesReducer } from "./favourites";

export default combineReducers({
  favourites: favouritesReducer,
});
