import { handleActions } from "redux-actions";
import { Map } from "immutable";
import cloneDeep from "lodash/cloneDeep";

// Action Type Imports
import { constants as conferenceConstants } from "../actions/conference-actions";

// Events's Reducer
export const reducers = {
  [conferenceConstants.SET_MORE_CONFERENCE_LIBRARIES]: (state, { payload }) => {
    const allConferenceLibraries = state.get("allConferenceLibraries");
    return state.merge({
      allConferenceLibraries: cloneDeep([
        ...allConferenceLibraries,
        ...payload.libraries,
      ]),
      currentPage: payload.currentPage,
      countOfResults: payload.countOfResults,
    });
  },
  [conferenceConstants.SET_SEARCH_CONFERENCE_LIBRARIES]: (
    state,
    { payload }
  ) => {
    return state.merge({
      allConferenceLibraries: cloneDeep([...payload.libraries]),
      currentPage: payload.currentPage,
      countOfResults: payload.countOfResults,
    });
  },
  [conferenceConstants.SET_LOADING]: (state, { payload }) => {
    return state.merge({
      loading: payload.loading,
    });
  },
};

export const initialState = () =>
  Map({
    loading: false,
    error: null,
    allConferenceLibraries: [],
    countOfResults: 0,
    currentPage: 1,
  });

export default handleActions(reducers, initialState());
