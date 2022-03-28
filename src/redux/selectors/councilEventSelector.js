import { createSelector } from "reselect";

const councilEventDataSelector = (state) => state.councilEvent;

const resultSelector = createSelector(councilEventDataSelector, (payload) => {
  return {
    allCouncilEvents: payload.get("allCouncilEvents"),
    councilEvent: payload.get("councilEvent"),
    searchedUsersForCouncilEvent: payload.get("searchedUsersForCouncilEvent")
  };
});

export const councilEventSelector = (state) => ({
  ...resultSelector(state),
});
