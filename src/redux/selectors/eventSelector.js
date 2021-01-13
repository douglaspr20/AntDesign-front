import { createSelector } from "reselect";

const eventDataSelector = (state) => state.event;

const resultSelector = createSelector(eventDataSelector, (payload) => {
  return {
    loading: payload.get("loading"),
    allEvents: payload.get("allEvents"),
    event: payload.get("event"),
    error: payload.get("error"),
  };
});

export const eventSelector = (state) => ({
  ...resultSelector(state),
});
