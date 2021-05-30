import { handleActions } from "redux-actions";
import { Map } from "immutable";
import cloneDeep from "lodash/cloneDeep";

// Action Type Imports
import { constants as notificationConstants } from "../actions/notification-actions";

// Events's Reducer
export const reducers = {
  [notificationConstants.SET_NOTIFICATIONS]: (state, { payload }) => {
    const notificationList = state.get("notificationList");
    return state.merge({
      notificationList: cloneDeep(
        payload.currentPage === 1
          ? payload.notificationList
          : [
              ...notificationList,
              ...payload.notificationList.filter(
                (noti) => !notificationList.find((item) => item.id === noti.id)
              ),
            ]
      ),
      currentPage: payload.currentPage,
      countOfResults: payload.countOfResults,
      unreadCount: payload.unreadCount,
    });
  },
  [notificationConstants.SET_NOTIFICATION_LOADING]: (state, { payload }) => {
    return state.merge({ ...payload });
  },
  [notificationConstants.SET_NOTIFICATION_MORE_LOADING]: (
    state,
    { payload }
  ) => {
    return state.merge({ moreLoading: payload.loading });
  },
  [notificationConstants.PUSH_NOTIFICATION]: (state, { payload }) => {
    const notificationList = state.get("notificationList");
    const countOfResults = state.get("countOfResults");

    return state.merge({
      notificationList: [payload.data, ...notificationList],
      countOfResults: countOfResults + 1,
    });
  },
};

export const initialState = () =>
  Map({
    loading: false,
    moreLoading: false,
    notificationList: [],
    countOfResults: 0,
    currentPage: 1,
    unreadCount: 0,
  });

export default handleActions(reducers, initialState());
