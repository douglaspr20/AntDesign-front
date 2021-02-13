import { createSelector } from "reselect";

const journeyDataSelector = (state) => state.journey;

const resultSelector = createSelector(journeyDataSelector, (payload) => {
  return {
    loading: payload.get("loading"),
    allJourneys: payload.get("allJourneys"),
  };
});

export const journeySelector = (state) => ({
  ...resultSelector(state),
});
