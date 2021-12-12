import { handleActions } from "redux-actions";
import { Map } from "immutable";

// Action Type Imports
import { constants as sessionConstants } from "../actions/session-actions";
import { cloneDeep } from "lodash";

// Session's Reducer
export const reducers = {
  [sessionConstants.SET_ALL_SESSIONS]: (state, { payload }) => {
    return state.merge({
      allSessions: payload.allSessions,
    });
  },
  [sessionConstants.SET_SESSION]: (state, { payload }) => {
    return state.merge({
      session: payload.session,
    });
  },
  [sessionConstants.SET_SESSIONS_ADDED_BY_USER]: (state, { payload }) => {
    return state.merge({
      sessionsUser: payload.sessionsUser,
    });
  },
  [sessionConstants.SET_PARTICIPANTS]: (state, { payload }) => {
    return state.merge({
      participants: cloneDeep(payload.participants),
    });
  },
  [sessionConstants.SET_RECOMMENDED_AGENDA]: (state, { payload }) => {
    return state.merge({
      recommendedAgendaSessions: cloneDeep(payload.recommendedAgendaSessions),
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
    session: {},
    sessionsUser: [],
    participants: [],
    recommendedAgendaSessions: [],
  });

export default handleActions(reducers, initialState());
