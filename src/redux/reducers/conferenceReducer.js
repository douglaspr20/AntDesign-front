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
  [conferenceConstants.UPDATE_CONFERENCE_VIEWED]: (state, { payload }) => {
    let allConferenceLibraries = state.get("allConferenceLibraries");
    const index = allConferenceLibraries.findIndex(
      (clibrary) => clibrary.id === payload.data.id
    );

    if (index >= 0) {
      allConferenceLibraries[index] = {
        ...payload.data,
      };
    }

    return state.merge({
      allConferenceLibraries: cloneDeep([...allConferenceLibraries]),
    });
  },
  [conferenceConstants.SET_CONFERENCE_LIBRARY]: (state, { payload }) => {
    return state.merge({
      conferenceLibrary: payload.data,
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
    conferenceLibrary: null,
  });

export default handleActions(reducers, initialState());
