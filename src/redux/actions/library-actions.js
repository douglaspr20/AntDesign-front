import { createAction } from "redux-actions";

const GET_ALL_LIBRARIES = "GET_ALL_LIBRARIES";
const SET_ALL_LIBRARIES = "SET_ALL_LIBRARIES";
const ADD_LIBRARY = "ADD_LIBRARY";

export const constants = {
  GET_ALL_LIBRARIES,
  SET_ALL_LIBRARIES,
  ADD_LIBRARY,
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

export const actions = {
  getAllLibraries,
  setAllLibraries,
  addLibrary,
};
