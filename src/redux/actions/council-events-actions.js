import { createAction } from "redux-actions";

const UPSERT_COUNCIL_EVENT = "UPSERT_COUNCIL_EVENT";
const SET_COUNCIL_EVENT = "SET_COUNCIL_EVENT";
const GET_COUNCIL_EVENTS = "GET_COUNCIL_EVENTS";
const SET_COUNCIL_EVENTS = "SET_COUNCIL_EVENTS";
const DELETE_COUNCIL_EVENT = "DELETE_COUNCIL_EVENT";
const JOIN_COUNCIL_EVENT = "JOIN_COUNCIL_EVENT";
const SET_JOIN_COUNCIL_EVENT = "SET_JOIN_COUNCIL_EVENT";
const REMOVE_COUNCIL_EVENT_PANELIST = "REMOVE_COUNCIL_EVENT_PANELIST";
const COUNCIL_EVENT_SEARCH_USER = "COUNCIL_EVENT_SEARCH_USER";
const SET_SEARCHED_USERS_FOR_COUNCIL_EVENT =
  "SET_SEARCHED_USERS_FOR_COUNCIL_EVENT";

export const constants = {
  UPSERT_COUNCIL_EVENT,
  SET_COUNCIL_EVENT,
  GET_COUNCIL_EVENTS,
  SET_COUNCIL_EVENTS,
  DELETE_COUNCIL_EVENT,
  JOIN_COUNCIL_EVENT,
  SET_JOIN_COUNCIL_EVENT,
  REMOVE_COUNCIL_EVENT_PANELIST,
  COUNCIL_EVENT_SEARCH_USER,
  SET_SEARCHED_USERS_FOR_COUNCIL_EVENT,
};

const upsertCouncilEvent = createAction(
  UPSERT_COUNCIL_EVENT,
  (councilEvent) => ({ councilEvent })
);
const setUpsertCouncilEvent = createAction(
  SET_COUNCIL_EVENT,
  (councilEvent, isEdit) => ({ councilEvent, isEdit })
);
const getCouncilEvents = createAction(GET_COUNCIL_EVENTS);
const setCouncilEvents = createAction(SET_COUNCIL_EVENTS, (councilEvents) => ({
  councilEvents,
}));
const deleteCouncilEvent = createAction(
  DELETE_COUNCIL_EVENT,
  (councilEventId) => ({ councilEventId })
);
const joinCouncilEvent = createAction(
  JOIN_COUNCIL_EVENT,
  (councilEventPanelId, UserId, status) => ({
    councilEventPanelId,
    UserId,
    status,
  })
);
const setJoinCouncilEvent = createAction(
  SET_JOIN_COUNCIL_EVENT,
  (councilEventPanel) => ({ councilEventPanel })
);
const removeCouncilEventPanelist = createAction(
  REMOVE_COUNCIL_EVENT_PANELIST,
  (CouncilEventPanelId, CouncilEventPanelistId) => ({
    CouncilEventPanelId,
    CouncilEventPanelistId,
  })
);
const searchUserForCouncilEventPanelist = createAction(
  COUNCIL_EVENT_SEARCH_USER,
  (keyword) => ({ keyword })
);
const setSearchedUserForCouncilEventPanelist = createAction(
  SET_SEARCHED_USERS_FOR_COUNCIL_EVENT,
  (users) => ({ users })
);

export const actions = {
  upsertCouncilEvent,
  setUpsertCouncilEvent,
  getCouncilEvents,
  setCouncilEvents,
  deleteCouncilEvent,
  joinCouncilEvent,
  setJoinCouncilEvent,
  removeCouncilEventPanelist,
  searchUserForCouncilEventPanelist,
  setSearchedUserForCouncilEventPanelist,
};
