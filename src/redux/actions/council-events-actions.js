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
const COUNCIL_EVENT_PANEL_COMMENT = "COUNCIL_EVENT_PANEL_COMMENT";

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
  COUNCIL_EVENT_PANEL_COMMENT,
};

export const upsertCouncilEvent = createAction(
  UPSERT_COUNCIL_EVENT,
  (councilEvent) => ({ councilEvent })
);
export const setUpsertCouncilEvent = createAction(
  SET_COUNCIL_EVENT,
  (councilEvent, isEdit) => ({ councilEvent, isEdit })
);
export const getCouncilEvents = createAction(GET_COUNCIL_EVENTS);
export const setCouncilEvents = createAction(
  SET_COUNCIL_EVENTS,
  (councilEvents) => ({
    councilEvents,
  })
);
export const deleteCouncilEvent = createAction(
  DELETE_COUNCIL_EVENT,
  (councilEventId) => ({ councilEventId })
);
export const joinCouncilEvent = createAction(
  JOIN_COUNCIL_EVENT,
  (
    councilEventPanelId,
    UserId,
    status,
    isAddedByAdmin = false,
    isModerator = false
  ) => ({
    councilEventPanelId,
    UserId,
    status,
    isAddedByAdmin,
    isModerator,
  })
);
export const setJoinCouncilEvent = createAction(
  SET_JOIN_COUNCIL_EVENT,
  (councilEventPanel) => ({ councilEventPanel })
);
export const removeCouncilEventPanelist = createAction(
  REMOVE_COUNCIL_EVENT_PANELIST,
  (CouncilEventPanelId, CouncilEventPanelistId) => ({
    CouncilEventPanelId,
    CouncilEventPanelistId,
  })
);
export const searchUserForCouncilEventPanelist = createAction(
  COUNCIL_EVENT_SEARCH_USER,
  (keyword) => ({ keyword })
);
export const setSearchedUserForCouncilEventPanelist = createAction(
  SET_SEARCHED_USERS_FOR_COUNCIL_EVENT,
  (users) => ({ users })
);
export const upsertCommentCouncilEventPanel = createAction(
  COUNCIL_EVENT_PANEL_COMMENT,
  (councilEventPanelComment) => ({ councilEventPanelComment })
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
  upsertCommentCouncilEventPanel,
};
