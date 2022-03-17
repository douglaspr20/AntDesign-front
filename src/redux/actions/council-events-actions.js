import { createAction } from "redux-actions";

const UPSERT_COUNCIL_EVENT = "UPSERT_COUNCIL_EVENT";
const SET_COUNCIL_EVENT = "SET_COUNCIL_EVENT";
const GET_COUNCIL_EVENTS = "GET_COUNCIL_EVENTS";
const SET_COUNCIL_EVENTS = "SET_COUNCIL_EVENTS";
const DELETE_COUNCIL_EVENT = "DELETE_COUNCIL_EVENT";
const JOIN_COUNCIL_EVENT = "JOIN_COUNCIL_EVENT";
const SET_JOIN_COUNCIL_EVENT = "SET_JOIN_COUNCIL_EVENT";

export const constants = {
  UPSERT_COUNCIL_EVENT,
  SET_COUNCIL_EVENT,
  GET_COUNCIL_EVENTS,
  SET_COUNCIL_EVENTS,
  DELETE_COUNCIL_EVENT,
  JOIN_COUNCIL_EVENT,
  SET_JOIN_COUNCIL_EVENT,
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
  (councilEventPanelId, status) => ({
    councilEventPanelId,
    status,
  })
);
const setJoinCouncilEvent = createAction(
  SET_JOIN_COUNCIL_EVENT,
  (councilEventPanel) => ({ councilEventPanel })
);

export const actions = {
  upsertCouncilEvent,
  setUpsertCouncilEvent,
  getCouncilEvents,
  setCouncilEvents,
  deleteCouncilEvent,
  joinCouncilEvent,
  setJoinCouncilEvent,
};
