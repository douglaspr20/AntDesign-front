import { createSelector } from "reselect";

const homeDataSelector = (state) => state.home;

const resultSelector = createSelector(homeDataSelector, (payload) => {
  return {
    loading: payload.get("loading"),
    userProfile: payload.get("userProfile"),
    setting: payload.get("setting"),
    allUsers: payload.get("allUsers")
  };
});

export const homeSelector = (state) => ({
  ...resultSelector(state),
});
