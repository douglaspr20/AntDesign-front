import { createAction } from "redux-actions";

const GET_ALL_SESSIONS = "GET_ALL_SESSIONS";
const SET_ALL_SESSIONS = "SET_ALL_SESSIONS";
const GET_SESSION = "GET_SESSION";
const SET_SESSION = "SET_SESSION";
const GET_SESSION_CLASSES = "GET_SESSION_CLASSES";
const SET_SESSION_CLASSES = "SET_SESSION_CLASSES";
const GET_SESSIONS_ADDED_BY_USER = "GET_SESSIONS_ADDED_BY_USER ";
const SET_SESSIONS_ADDED_BY_USER = "SET_SESSIONS_ADDED_BY_USER";
const GET_SESSIONS_USER_JOINED = "GET_SESSIONS_USER_JOINED";
const SET_SESSIONS_USER_JOINED = "SET_SESSIONS_USER_JOINED";
const GET_PARTICIPANTS = "GET_PARTICIPANTS";
const SET_PARTICIPANTS = "SET_PARTICIPANTS";
const GET_RECOMMENDED_PARTICIPANTS = "GET_RECOMMENDED_PARTICIPANTS";
const SET_RECOMMENDED_PARTICIPANTS = "SET_RECOMMENDED_PARTICIPANTS";
const RECOMMENDED_AGENDA = "RECOMMENDED_AGENDA";
const SET_RECOMMENDED_AGENDA = "SET_RECOMMENDED_AGENDA";
const SET_SESSION_LOADING = "SET_SESSION_LOADING";
const SET_MESSAGE_ERROR = "SET_MESSAGE_ERROR";

export const constants = {
  GET_ALL_SESSIONS,
  SET_ALL_SESSIONS,
  GET_SESSION,
  SET_SESSION,
  GET_SESSION_CLASSES,
  SET_SESSION_CLASSES,
  GET_SESSIONS_ADDED_BY_USER,
  SET_SESSIONS_ADDED_BY_USER,
  GET_SESSIONS_USER_JOINED,
  SET_SESSIONS_USER_JOINED,
  GET_PARTICIPANTS,
  SET_PARTICIPANTS,
  GET_RECOMMENDED_PARTICIPANTS,
  SET_RECOMMENDED_PARTICIPANTS,
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

export const getSession = createAction(GET_SESSION, (id) => ({ id }));

export const setSession = createAction(SET_SESSION, (session) => ({ session }));

export const getSessionClasses = createAction(GET_SESSION_CLASSES, (id) => ({
  id,
}));
export const setSessionClasses = createAction(
  SET_SESSION_CLASSES,
  (classes) => ({
    classes,
  })
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

export const getSessionsUserJoined = createAction(
  GET_SESSIONS_USER_JOINED,
  (sessionsId) => ({ sessionsId })
);
export const setSessionsUserJoined = createAction(
  SET_SESSIONS_USER_JOINED,
  (sessionsUserJoined) => ({
    sessionsUserJoined,
  })
);

export const getParticipants = createAction(GET_PARTICIPANTS, (userId) => ({
  userId,
}));

export const setParticipants = createAction(
  SET_PARTICIPANTS,
  (participants) => ({
    participants,
  })
);

export const getRecommendedParticipants = createAction(
  GET_RECOMMENDED_PARTICIPANTS,
  (filters) => filters
);

export const setRecomnendedParticipants = createAction(
  SET_RECOMMENDED_PARTICIPANTS,
  (recommendedParticipants) => ({
    recommendedParticipants,
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
  getSession,
  setSession,
  getSessionClasses,
  setSessionClasses,
  getSessionsAddedbyUser,
  setSessionsAddedByUser,
  getSessionsUserJoined,
  setSessionsUserJoined,
  getParticipants,
  setParticipants,
  getRecommendedParticipants,
  setRecomnendedParticipants,
  recommendedAgenda,
  setRecommendedAgenda,
  setSessionLoading,
  setMessageError,
};
