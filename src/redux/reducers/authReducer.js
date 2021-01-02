import { handleActions } from "redux-actions";
import { Map } from "immutable";
import storage from "store";

import { constants as authConstants } from "../actions/auth-actions";

export const reducers = {
  [authConstants.SET_AUTH]: (state, { payload }) => {
    console.log("*** payload", payload);
    storage.set("community", payload);
    return state.merge({ ...payload });
  },
};

export const initialState = () => {
  let community = storage.get("community");

  return Map({
    isAuthenticated: community ? community.isAuthenticated : false,
    loading: community ? community.loading : false,
    error: community ? community.error : null,
    accessToken: community ? community.accessToken : false,
    checkingAuth: community ? community.checkingAuth : false,
    firstName: community ? community.firstName : false,
    lastName: community ? community.lastName : false,
    email: community ? community.email : false,
    role: community ? community.role : false,
  });
};

export default handleActions(reducers, initialState());
