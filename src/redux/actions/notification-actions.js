import { createAction } from "redux-actions";

const GET_NOTIFICATIONS = "GET_NOTIFICATIONS";
const SET_NOTIFICATIONS = "SET_NOTIFICATIONS";
const SET_NOTIFICATION_LOADING = "SET_NOTIFICATION_LOADING";
const SET_NOTIFICATION_MORE_LOADING = "SET_NOTIFICATION_MORE_LOADING";

export const constants = {
  GET_NOTIFICATIONS,
  SET_NOTIFICATIONS,
  SET_NOTIFICATION_LOADING,
  SET_NOTIFICATION_MORE_LOADING,
};

// ------------------------------------
// Actions
// ------------------------------------
export const getNotifications = createAction(
  GET_NOTIFICATIONS,
  (page, num) => ({ page, num })
);
export const setNotifications = createAction(
  SET_NOTIFICATIONS,
  (countOfResults, currentPage, notificationList) => ({
    countOfResults,
    currentPage,
    notificationList,
  })
);
export const setNotificationLoading = createAction(
  SET_NOTIFICATION_LOADING,
  (loading) => ({ loading })
);
export const setNotificationMoreLoading = createAction(
  SET_NOTIFICATION_MORE_LOADING,
  (loading) => ({ loading })
);

export const actions = {
  getNotifications,
  setNotifications,
  setNotificationLoading,
  setNotificationMoreLoading,
};
