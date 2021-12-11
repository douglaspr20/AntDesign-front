import { createAction } from "redux-actions";

const GET_ALL_SESSIONS = "GET_ALL_SESSIONS";
const SET_ALL_SESSIONS = "SET_ALL_SESSIONS";
const GET_SESSIONS_ADDED_BY_USER = "GET_SESSIONS_ADDED_BY_USER ";
const SET_SESSIONS_ADDED_BY_USER = "SET_SESSIONS_ADDED_BY_USER";
const GET_PARTICIPANTS = "GET_PARTICIPANTS";
const SET_PARTICIPANTS = "SET_PARTICIPANTS";
const RECOMMENDED_AGENDA = "RECOMMENDED_AGENDA";
const SET_RECOMMENDED_AGENDA = "SET_RECOMMENDED_AGENDA";
const SET_SESSION_LOADING = "SET_SESSION_LOADING";
const SET_MESSAGE_ERROR = "SET_MESSAGE_ERROR";

export const constants = {
  GET_ALL_SESSIONS,
  SET_ALL_SESSIONS,
  GET_SESSIONS_ADDED_BY_USER,
  SET_SESSIONS_ADDED_BY_USER,
  GET_PARTICIPANTS,
  SET_PARTICIPANTS,
  RECOMMENDED_AGENDA,
  SET_RECOMMENDED_AGENDA,
  SET_SESSION_LOADING,
  SET_MESSAGE_ERROR,
};

// ------------------------------------
// Actions
// ------------------------------------
export const getAllSessions = createAction(
  GET_ALL_SESSIONS,
  (startTime, endTime, meta) => ({ startTime, endTime, meta })
);

export const setAllSessions = createAction(SET_ALL_SESSIONS, (allSessions) => ({
  allSessions,
}));

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

export const getParticipants = createAction(
  GET_PARTICIPANTS,
  (filters) => filters
);

export const setParticipants = createAction(
  SET_PARTICIPANTS,
  (participants) => ({
    participants,
  })
);

export const recommendedAgenda = createAction(
  RECOMMENDED_AGENDA,
  (filters) => ({ filters })
);

export const setRecommendedAgenda = createAction(
  SET_RECOMMENDED_AGENDA,
  (recommendedAgendaSessions) => ({ recommendedAgendaSessions })
);

export const setSessionLoading = createAction(
  SET_SESSION_LOADING,
  (loading) => ({ loading })
);

export const setMessageError = createAction(SET_MESSAGE_ERROR, (message) => ({
  message,
}));

export const actions = {
  getAllSessions,
  setAllSessions,
  getSessionsAddedbyUser,
  setSessionsAddedByUser,
  getParticipants,
  setParticipants,
  recommendedAgenda,
  setRecommendedAgenda,
  setSessionLoading,
  setMessageError,
};
