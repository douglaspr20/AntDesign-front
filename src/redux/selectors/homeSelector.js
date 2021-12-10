import { createSelector } from "reselect";

const homeDataSelector = (state) => state.home;

const resultSelector = createSelector(homeDataSelector, (payload) => {
  return {
    loading: payload.get("loading"),
    userProfile: payload.get("userProfile"),
    councilMembers: payload.get("councilMembers"),
    setting: payload.get("setting"),
  };
});

export const homeSelector = (state) => ({
  ...resultSelector(state),
});
