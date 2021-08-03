import { createSelector } from "reselect";

const sessionDataSelector = (state) => state.session;

const resultSelector = createSelector(sessionDataSelector, (payload) => {
  return {
    sessionLoading: payload.get("sessionLoading"),
    allSessions: payload.get("allSessions"),
  };
});

export const sessionSelector = (state) => ({
  ...resultSelector(state),
});
