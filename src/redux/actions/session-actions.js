import { createAction } from "redux-actions";

const GET_ALL_SESSIONS = "GET_ALL_SESSIONS";
const GET_SESSIONS_ADDED_BY_USER = "GET_SESSIONS_ADDED_BY_USER ";
const SET_SESSIONS_ADDED_BY_USER = "SET_SESSIONS_ADDED_BY_USER";
const SET_ALL_SESSIONS = "SET_ALL_SESSIONS";
const SET_SESSION_LOADING = "SET_SESSION_LOADING";

export const constants = {
  GET_ALL_SESSIONS,
  GET_SESSIONS_ADDED_BY_USER,
  SET_SESSIONS_ADDED_BY_USER,
  SET_ALL_SESSIONS,
  SET_SESSION_LOADING,
};

// ------------------------------------
// Actions
// ------------------------------------
export const getAllSessions = createAction(
  GET_ALL_SESSIONS,
  (startTime, endTime) => ({ startTime, endTime })
);

export const getSessionsAddedbyUser = createAction(
  GET_SESSIONS_ADDED_BY_USER,
  (id) => ({ id })
);
export const setSessionsAddedByUser = createAction(
  SET_SESSIONS_ADDED_BY_USER,
  (sessionsUser) => ({
    sessionsUser,
  })
);
export const setAllSessions = createAction(SET_ALL_SESSIONS, (allSessions) => ({
  allSessions,
}));
export const setSessionLoading = createAction(
  SET_SESSION_LOADING,
  (loading) => ({ loading })
);

export const actions = {
  getAllSessions,
  getSessionsAddedbyUser,
  setSessionsAddedByUser,
  setAllSessions,
  setSessionLoading,
};
