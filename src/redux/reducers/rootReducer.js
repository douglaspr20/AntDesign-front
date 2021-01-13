import { combineReducers } from "redux";

import homeReducer from "./homeReducer";
import envReducer from "./envReducer";
import authReducer from "./authReducer";
import eventReducer from "./eventReducer";

export default combineReducers({
  home: homeReducer,
  env: envReducer,
  auth: authReducer,
  event: eventReducer,
});
