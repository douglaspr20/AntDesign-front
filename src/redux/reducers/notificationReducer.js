import { handleActions } from "redux-actions";
import { Map } from "immutable";
import cloneDeep from "lodash/cloneDeep";

// Action Type Imports
import { constants as notificationConstants } from "../actions/notification-actions";

// Events's Reducer
export const reducers = {
  [notificationConstants.SET_NOTIFICATIONS]: (state, { payload }) => {
    return state.merge({
      notificationList: cloneDeep(payload.notificationList),
    });
  },
  [notificationConstants.SET_NOTIFICATION_LOADING]: (state, { payload }) => {
    return state.merge({ ...payload });
  },
};

export const initialState = () =>
  Map({
    loading: false,
    notificationList: [],
  });

export default handleActions(reducers, initialState());
