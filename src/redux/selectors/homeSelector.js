import { createSelector } from "reselect";

const homeDataSelector = (state) => state.home;

const resultSelector = createSelector(homeDataSelector, (payload) => {
  return {
    loading: payload.get("loading"),
    userProfile: payload.get("userProfile"),
    setting: payload.get("setting"),
    allUsers: payload.get("allUsers"),
    userCount: payload.get("userCount"),
    inputUserSearchValue: payload.get("inputUserSearchValue"),
    searchedUsers: payload.get("searchedUsers"),
    totalUsers: payload.get("totalUsers"),
    userShow: payload.get("userShow"),
    visibleProfileUser: payload.get("visibleProfileUser"),
  };
});

export const homeSelector = (state) => ({
  ...resultSelector(state),
});
