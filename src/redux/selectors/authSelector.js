import { createSelector } from "reselect";

const authDataSelector = (state) => state.auth;

const resultSelector = createSelector(authDataSelector, (payload) => {
  return { ...payload };
});

export const authSelector = (state) => ({
  ...resultSelector(state),
});
