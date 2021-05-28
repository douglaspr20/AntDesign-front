import { createSelector } from "reselect";

const notificatioinDataSelector = (state) => state.notification;

const resultSelector = createSelector(notificatioinDataSelector, (payload) => {
  return {
    notificationList: payload.get("notificationList"),
    loading: payload.get("loading"),
  };
});

export const notificationSelector = (state) => ({
  ...resultSelector(state),
});
