import { handleActions } from "redux-actions";
import { Map } from "immutable";
import cloneDeep from "lodash/cloneDeep";
import moment from "moment";

// Action Type Imports
import { constants as eventConstants } from "../actions/event-actions";

// Events's Reducer
export const reducers = {
  [eventConstants.SET_ALL_EVENTS]: (state, { payload }) => {
    return state.merge({ allEvents: cloneDeep(payload.events) });
  },
  [eventConstants.SET_EVENT]: (state, { payload }) => {
    const allEvents = state.get("allEvents");
    let index = allEvents.findIndex((item) => item.id === payload.event.id);
    if (index >= 0) {
      allEvents[index] = payload.event;
    }
    let myEvents = state.get("myEvents");
    if (!payload.event.status || payload.event.status === "attend") {
      myEvents = myEvents.filter((item) => item.id !== payload.event.id);
    } else {
      index = myEvents.findIndex((item) => item.id === payload.event.id);
      if (index >= 0) {
        myEvents[index] = payload.event;
      } else {
        myEvents.push(payload.event);
        myEvents.sort((a, b) => {
          return moment(a.date, "YYYY.MM.DD h:mm a").isBefore(
            moment(b.date, "YYYY.MM.DD h:mm a")
          )
            ? -1
            : 1;
        });
      }
    }
    return state.merge({
      allEvents: [...allEvents],
      myEvents: [...myEvents],
      updatedEvent: { ...payload.event },
    });
  },
  [eventConstants.SET_ERROR]: (state, { payload }) => {
    return state.merge({ ...payload });
  },
  [eventConstants.SET_LOADING]: (state, { payload }) => {
    return state.merge({ ...payload });
  },
  [eventConstants.SET_MY_EVENTS]: (state, { payload }) => {
    return state.merge({ ...payload });
  },
  [eventConstants.SET_CHANNEL_EVENTS]: (state, { payload }) => {
    return state.merge({ ...payload });
  },
};

export const initialState = () =>
  Map({
    loading: false,
    error: null,
    allEvents: [],
    myEvents: [],
    updatedEvent: {},
    channelEvents: [],
  });

export default handleActions(reducers, initialState());
