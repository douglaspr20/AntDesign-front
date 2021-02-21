import { createAction } from "redux-actions";

const GET_MORE_CONFERENCE_LIBRARIES = "GET_MORE_CONFERENCE_LIBRARIES";
const SET_MORE_CONFERENCE_LIBRARIES = "SET_MORE_CONFERENCE_LIBRARIES";
const SEARCH_CONFERENCE_LIBRARIES = "SEARCH_CONFERENCE_LIBRARIES";
const SET_SEARCH_CONFERENCE_LIBRARIES = "SET_SEARCH_CONFERENCE_LIBRARIES";
const SET_LOADING = "SET_CONFERENCE_LIBRARY_LOADING";

export const constants = {
  GET_MORE_CONFERENCE_LIBRARIES,
  SET_MORE_CONFERENCE_LIBRARIES,
  SEARCH_CONFERENCE_LIBRARIES,
  SET_SEARCH_CONFERENCE_LIBRARIES,
  SET_LOADING,
};

// ------------------------------------
// Actions
// ------------------------------------
export const getMoreConferenceLibraries = createAction(
  GET_MORE_CONFERENCE_LIBRARIES,
  (filter) => ({
    filter,
  })
);
export const setMoreConferenceLibraries = createAction(
  SET_MORE_CONFERENCE_LIBRARIES,
  (countOfResults, currentPage, libraries) => ({
    countOfResults,
    currentPage,
    libraries,
  })
);
export const searchConferenceLibraries = createAction(
  SEARCH_CONFERENCE_LIBRARIES,
  (filter) => ({
    filter,
  })
);
export const setSearchConferenceLibraries = createAction(
  SET_SEARCH_CONFERENCE_LIBRARIES,
  (countOfResults, currentPage, libraries) => ({
    countOfResults,
    currentPage,
    libraries,
  })
);
export const setLoading = createAction(SET_LOADING, (loading) => ({ loading }));

export const actions = {
  getMoreConferenceLibraries,
  setMoreConferenceLibraries,
  searchConferenceLibraries,
  setSearchConferenceLibraries,
  setLoading,
};
