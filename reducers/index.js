import { combineReducers } from "redux";
import { favouritesReducer } from "./favourites";
import { deviceReducer } from "./device";

export default combineReducers({
  favourites: favouritesReducer,
  deviceType: deviceReducer,
});
