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
          : [...notificationList, ...payload.notificationList]
      ),
      currentPage: payload.currentPage,
      countOfResults: payload.countOfResults,
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
};

export const initialState = () =>
  Map({
    loading: false,
    moreLoading: false,
    notificationList: [],
    countOfResults: 0,
    currentPage: 1,
  });

export default handleActions(reducers, initialState());
