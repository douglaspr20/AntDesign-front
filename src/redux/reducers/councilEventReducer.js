import { handleActions } from "redux-actions";
import { Map } from "immutable";

import { constants as councilEventConstants } from "../actions/council-events-actions";

export const reducers = {
  [councilEventConstants.SET_COUNCIL_EVENTS]: (state, { payload }) => {
    return state.merge({
      allCouncilEvents: payload.councilEvents,
    });
  },
  [councilEventConstants.SET_UPSERT_COUNCIL_EVENT]: (state, { payload }) => {
    const allCouncilEvents = state.get("allCouncilEvents");
    let transformedCouncilEvents = [...allCouncilEvents];

    if (payload.isEdit) {
      const index = allCouncilEvents.findIndex(
        (event) => event.id === payload.councilEvent.id
      );

      if (index >= 0) {
        transformedCouncilEvents[index] = payload.councilEvent;
      }
    } else {
      transformedCouncilEvents = [
        ...transformedCouncilEvents,
        payload.councilEvent,
      ];
    }

    return state.merge({
      allCouncilEvents: transformedCouncilEvents,
    });
  },
};

export const initialState = () =>
  Map({
    allCouncilEvents: [],
    councilEvent: {},
  });

export default handleActions(reducers, initialState());
