import { createAction } from "redux-actions";

const GET_MORE_LIBRARIES = "GET_MORE_LIBRARIES";
const SET_MORE_LIBRARIES = "SET_MORE_LIBRARIES";
const ADD_LIBRARY = "ADD_LIBRARY";
const SET_LIBRARY = "SET_LIBRARY";
const GET_LIBRARY = "GET_LIBRARY";
const SEARCH_LIBRARIES = "SEARCH_LIBRARIES";
const SET_SEARCH_LIBRARIES = "SET_SEARCH_LIBRARIES";
const SET_LOADING = "SET_LIBRARY_LOADING";
const GET_RECOMMENDATIONS = "GET_RECOMMENDATIONS";
const SET_RECOMMENDATIONS = "SET_RECOMMENDATIONS";

export const constants = {
  GET_MORE_LIBRARIES,
  SET_MORE_LIBRARIES,
  ADD_LIBRARY,
  SET_LIBRARY,
  GET_LIBRARY,
  SEARCH_LIBRARIES,
  SET_SEARCH_LIBRARIES,
  SET_LOADING,
  GET_RECOMMENDATIONS,
  SET_RECOMMENDATIONS,
};

// ------------------------------------
// Actions
// ------------------------------------
export const getMoreLibraries = createAction(
  GET_MORE_LIBRARIES,
  (filter, order) => ({
    filter,
    order,
  })
);
export const setMoreLibraries = createAction(
  SET_MORE_LIBRARIES,
  (countOfResults, currentPage, libraries) => ({
    countOfResults,
    currentPage,
    libraries,
  })
);
export const addLibrary = createAction(ADD_LIBRARY, (library) => ({ library }));
export const setLibrary = createAction(SET_LIBRARY, (library) => ({ library }));
export const getLibrary = createAction(GET_LIBRARY, (id) => ({ id }));
export const searchLibraries = createAction(
  SEARCH_LIBRARIES,
  (filter, order) => ({
    filter,
    order,
  })
);
export const setSearchLibraries = createAction(
  SET_SEARCH_LIBRARIES,
  (countOfResults, currentPage, libraries) => ({
    countOfResults,
    currentPage,
    libraries,
  })
);
export const setLoading = createAction(SET_LOADING, (loading) => ({ loading }));
export const getRecommendations = createAction(GET_RECOMMENDATIONS);
export const setRecommendations = createAction(
  SET_RECOMMENDATIONS,
  (libraries) => ({ libraries })
);

export const actions = {
  getMoreLibraries,
  setMoreLibraries,
  addLibrary,
  setLibrary,
  getLibrary,
  searchLibraries,
  setSearchLibraries,
  setLoading,
  getRecommendations,
  setRecommendations,
};
