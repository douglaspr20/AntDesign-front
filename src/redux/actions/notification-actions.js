import { createAction } from "redux-actions";

const GET_NOTIFICATIONS = "GET_NOTIFICATIONS";
const SET_NOTIFICATIONS = "SET_NOTIFICATIONS";
const SET_NOTIFICATION_LOADING = "SET_NOTIFICATION_LOADING";
const SET_NOTIFICATION_MORE_LOADING = "SET_NOTIFICATION_MORE_LOADING";
const PUSH_NOTIFICATION = "PUSH_NOTIFICATION";
const MARK_NOTIFICATION_TO_READ = "MARK_NOTIFICATION_TO_READ";
const UPDATE_NOTIFICATION_TO_READ = "UPDATE_NOTIFICATION_TO_READ";

export const constants = {
  GET_NOTIFICATIONS,
  SET_NOTIFICATIONS,
  SET_NOTIFICATION_LOADING,
  SET_NOTIFICATION_MORE_LOADING,
  PUSH_NOTIFICATION,
  MARK_NOTIFICATION_TO_READ,
  UPDATE_NOTIFICATION_TO_READ,
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
  (countOfResults, currentPage, notificationList, readCount) => ({
    countOfResults,
    currentPage,
    notificationList,
    readCount,
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
export const pushNotification = createAction(PUSH_NOTIFICATION, (data) => ({
  data,
}));
export const marketNotificationToRead = createAction(
  MARK_NOTIFICATION_TO_READ,
  (notifications, userId) => ({ notifications, userId })
);
export const updateNotificationToRead = createAction(
  UPDATE_NOTIFICATION_TO_READ,
  (userId) => ({ userId })
);

export const actions = {
  getNotifications,
  setNotifications,
  setNotificationLoading,
  setNotificationMoreLoading,
  pushNotification,
  marketNotificationToRead,
  updateNotificationToRead,
};
