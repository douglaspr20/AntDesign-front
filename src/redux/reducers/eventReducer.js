import { handleActions } from "redux-actions";
import { Map } from "immutable";
import cloneDeep from "lodash/cloneDeep";

// Action Type Imports
import { constants as eventConstants } from "../actions/event-actions";

// Events's Reducer
export const reducers = {
  [eventConstants.SET_ALL_EVENTS]: (state, { payload }) => {
    return state.merge({ allEvents: cloneDeep(payload.events) });
  },
  [eventConstants.SET_EVENT]: (state, { payload }) => {
    return state.merge({ ...payload });
  },
  [eventConstants.SET_ERROR]: (state, { payload }) => {
    return state.merge({ ...payload });
  },
  [eventConstants.SET_LOADING]: (state, { payload }) => {
    return state.merge({ ...payload });
  },
};

export const initialState = () =>
  Map({
    loading: false,
    error: null,
    allEvents: [],
    myEvents: [],
    event: {},
  });

export default handleActions(reducers, initialState());
