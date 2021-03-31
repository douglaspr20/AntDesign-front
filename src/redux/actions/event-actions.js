import { createAction } from "redux-actions";

const GET_ALL_EVENTS = "GET_ALL_EVENTS";
const GET_EVENT = "GET_EVENT";
const SET_ALL_EVENTS = "SET_ALL_EVENTS";
const SET_EVENT = "SET_EVENT";
const SET_ERROR = "SET_ERROR";
const SET_LOADING = "SET_EVENT_LOADING";
const ADD_TO_MY_EVENT_LIST = "ADD_TO_MY_EVENT_LIST";
const REMOVE_FROM_MY_EVENT_LIST = "REMOVE_FROM_MY_EVENT_LIST";
const GET_MY_EVENTS = "GET_MY_EVENTS";
const SET_MY_EVENTS = "SET_MY_EVENTS";
const UPDATE_EVENT_STATUS = "UPDATE_EVENT_STATUS";
const CREATE_CHANNEL_EVENT = "CREATE_CHANNEL_EVENT";
const GET_CHANNEL_EVENTS = "GET_CHANNEL_EVENTS";
const SET_CHANNEL_EVENTS = "SET_CHANNEL_EVENTS";
const DELETE_EVENT = "DELETE_EVENT";

export const constants = {
  GET_ALL_EVENTS,
  GET_EVENT,
  SET_ALL_EVENTS,
  SET_EVENT,
  SET_ERROR,
  SET_LOADING,
  ADD_TO_MY_EVENT_LIST,
  REMOVE_FROM_MY_EVENT_LIST,
  GET_MY_EVENTS,
  SET_MY_EVENTS,
  UPDATE_EVENT_STATUS,
  CREATE_CHANNEL_EVENT,
  GET_CHANNEL_EVENTS,
  SET_CHANNEL_EVENTS,
  DELETE_EVENT,
};

// ------------------------------------
// Actions
// ------------------------------------
export const getAllEvent = createAction(GET_ALL_EVENTS);
export const getEvent = createAction(GET_EVENT, (id, callback) => ({
  id,
  callback,
}));
export const setAllEvents = createAction(SET_ALL_EVENTS, (events) => ({
  events,
}));
export const setEvent = createAction(SET_EVENT, (event) => ({ event }));
export const setError = createAction(SET_ERROR, (error) => ({ error }));
export const setLoading = createAction(SET_LOADING, (loading) => ({ loading }));
export const addToMyEventList = createAction(ADD_TO_MY_EVENT_LIST, (event) => ({
  event,
}));
export const removeFromMyEventList = createAction(
  REMOVE_FROM_MY_EVENT_LIST,
  (event) => ({ event })
);
export const getMyEvents = createAction(GET_MY_EVENTS);
export const setMyEvents = createAction(SET_MY_EVENTS, (myEvents) => ({
  myEvents,
}));
export const updateEventStatus = createAction(
  UPDATE_EVENT_STATUS,
  (event, status) => ({
    event,
    status,
  })
);
export const createChannelEvent = createAction(
  CREATE_CHANNEL_EVENT,
  (data, callback) => ({ data, callback })
);
export const getChannelEvents = createAction(GET_CHANNEL_EVENTS, (filter) => ({
  filter,
}));
export const setChannelEvents = createAction(
  SET_CHANNEL_EVENTS,
  (channelEvents) => ({ channelEvents })
);
export const deleteEvent = createAction(DELETE_EVENT, (event, callback) => ({
  event,
  callback,
}));

export const actions = {
  getAllEvent,
  getEvent,
  setAllEvents,
  setEvent,
  setError,
  setLoading,
  addToMyEventList,
  removeFromMyEventList,
  getMyEvents,
  setMyEvents,
  updateEventStatus,
  createChannelEvent,
  getChannelEvents,
  setChannelEvents,
  deleteEvent,
};
