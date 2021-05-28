import { handleActions } from "redux-actions";
import { Map } from "immutable";

// Action Type Imports
import { constants as sessionConstants } from "../actions/session-actions";

// Session's Reducer
export const reducers = {
  [sessionConstants.SET_ALL_SESSIONS]: (state, { payload }) => {
    return state.merge({
      allSessions: payload.allSessions,
    });
  },
  [sessionConstants.SET_SESSION_LOADING]: (state, { payload }) => {
    return state.merge({
      sessionLoading: payload.loading,
    });
  },
};

export const initialState = () =>
  Map({
    sessionLoading: false,
    allSessions: [],
  });

export default handleActions(reducers, initialState());
