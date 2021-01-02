import { createAction } from "redux-actions";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const SET_AUTH = "SET_AUTH";

export const constants = {
  LOGIN,
  LOGOUT,
  SET_AUTH,
};

// ------------------------------------
// Actions
// ------------------------------------
export const login = createAction(LOGIN, (email, password) => ({
  email,
  password,
}));
export const logout = createAction(LOGOUT, () => ({}));
export const setAuth = createAction(SET_AUTH);

export const actions = {
  login,
  logout,
  setAuth,
};
