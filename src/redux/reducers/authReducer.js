import { handleActions } from "redux-actions";
import { Map } from "immutable";

import { constants as authConstants } from "../actions/auth-actions";

export const reducers = {
  [authConstants.SET_AUTH]: (state, { payload }) => {
    console.log("*** payload", payload);
    return state.merge({ ...payload });
  },
};

export const initialState = () =>
  Map({
    isAuthenticated: false,
    loading: false,
    error: null,
    accessToken: null,
    checkingAuth: false,
    firstName: null,
    lastName: null,
    email: null,
    role: null,
  });

export default handleActions(reducers, initialState());
