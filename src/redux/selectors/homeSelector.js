import { createSelector } from "reselect";

const homeDataSelector = (state) => state.home;

const resultSelector = createSelector(homeDataSelector, (payload) => {
  return {
    loading: payload.get("loading"),
    planUpdated: payload.get("planUpdated"),
    userProfile: payload.get("userProfile"),
    events: payload.get("events"),
    myEvents: payload.get("myEvents"),
    setting: payload.get("setting"),
    myPastEvents: payload.get("myPastEvents"),
  };
});

export const homeSelector = (state) => ({
  ...resultSelector(state),
});
