import { createSelector } from "reselect";

const authDataSelector = (state) => state.auth;

const resultSelector = createSelector(authDataSelector, (payload) => ({
  isAuthenticated: payload.get("isAuthenticated"),
  loading: payload.get("loading"),
  error: payload.get("error"),
  accessToken: payload.get("accessToken"),
  checkingAuth: payload.get("checkingAuth"),
  firstName: payload.get("firstName"),
  lastName: payload.get("lastName"),
  email: payload.get("email"),
  role: payload.get("role"),
}));

export const authSelector = (state) => ({
  ...resultSelector(state),
});
