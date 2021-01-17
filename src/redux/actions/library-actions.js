import { createAction } from "redux-actions";

const GET_ALL_LIBRARIES = "GET_ALL_LIBRARIES";
const SET_ALL_LIBRARIES = "SET_ALL_LIBRARIES";
const ADD_LIBRARY = "ADD_LIBRARY";
const SET_LIBRARY = "SET_LIBRARY";
const GET_LIBRARY = "GET_LIBRARY";
const SEARCH_LIBRARIES = "SEARCH_LIBRARIES";
const SET_SEARCH_LIBRARIES = "SET_SEARCH_LIBRARIES";

export const constants = {
  GET_ALL_LIBRARIES,
  SET_ALL_LIBRARIES,
  ADD_LIBRARY,
  SET_LIBRARY,
  GET_LIBRARY,
  SEARCH_LIBRARIES,
  SET_SEARCH_LIBRARIES,
};

// ------------------------------------
// Actions
// ------------------------------------
export const getAllLibraries = createAction(GET_ALL_LIBRARIES, (filter) => ({
  filter,
}));
export const setAllLibraries = createAction(SET_ALL_LIBRARIES, (libraries) => ({
  libraries,
}));
export const addLibrary = createAction(ADD_LIBRARY, (library) => ({ library }));
export const setLibrary = createAction(SET_LIBRARY, (library) => ({ library }));
export const getLibrary = createAction(GET_LIBRARY, (id) => ({ id }));
export const searchLibraries = createAction(SEARCH_LIBRARIES, (filter) => ({
  filter,
}));
export const setSearchLibraries = createAction(
  SET_SEARCH_LIBRARIES,
  (libraries) => ({ libraries })
);

export const actions = {
  getAllLibraries,
  setAllLibraries,
  addLibrary,
  setLibrary,
  getLibrary,
  searchLibraries,
  setSearchLibraries,
};
