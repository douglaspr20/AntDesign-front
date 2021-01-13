import { createAction } from "redux-actions";

const GET_ALL_EVENTS = "GET_ALL_EVENTS";
const GET_EVENT = "GET_EVENT";
const SET_ALL_EVENTS = "SET_ALL_EVENTS";
const SET_EVENT = "SET_EVENT";
const SET_ERROR = "SET_ERROR";
const SET_LOADING = "SET_LOADING";

export const constants = {
  GET_ALL_EVENTS,
  GET_EVENT,
  SET_ALL_EVENTS,
  SET_EVENT,
  SET_ERROR,
  SET_LOADING,
};

// ------------------------------------
// Actions
// ------------------------------------
export const getAllEvent = createAction(GET_ALL_EVENTS);
export const getEvent = createAction(GET_EVENT, (id) => ({ id }));
export const setAllEvents = createAction(SET_ALL_EVENTS, (events) => ({
  events,
}));
export const setEvent = createAction(SET_EVENT, (event) => ({ event }));
export const setError = createAction(SET_ERROR, (error) => ({ error }));
export const setLoading = createAction(SET_LOADING, (loading) => ({ loading }));

export const actions = {
  getAllEvent,
  getEvent,
  setAllEvents,
  setEvent,
  setError,
  setLoading,
};
