import { createAction } from "redux-actions";

const GET_ALL_SAVED = "GET_ALL_SAVED";
const GET_ALL_COMPLETED = "GET_ALL_COMPLETED";
const GET_MORE_COMPLETED = "GET_MORE_COMPLETED";
const SET_ALL_SAVED = "SET_ALL_SAVED";
const SET_ALL_COMPLETED = "SET_ALL_COMPLETED";
const UPDATE_SAVE_FOR_LATER_LIBRARY = "UPDATE_SAVE_FOR_LATER_LIBRARY";
const UPDATE_COMPLETED_LIBRARY = "UPDATE_COMPLETED_LIBRARY"

export const constants = {
  GET_ALL_SAVED,
  GET_ALL_COMPLETED,
  GET_MORE_COMPLETED,
  SET_ALL_SAVED,
  SET_ALL_COMPLETED,
  UPDATE_SAVE_FOR_LATER_LIBRARY,
  UPDATE_COMPLETED_LIBRARY,
};

const getAllSaved = createAction(GET_ALL_SAVED, (filter) => ({ filter }));
const getAllCompleted = createAction(GET_ALL_COMPLETED, (filter) => ({
  filter,
}));
const getMoreCompleted = createAction(GET_ALL_COMPLETED, (filter) => ({
  filter,
}));

const setAllSaved = createAction(SET_ALL_SAVED, (allSaved) => ({
  allSaved,
}));

const setAllCompleted = createAction(SET_ALL_COMPLETED, (allCompleted) => ({
  allCompleted,
}));

const updateSaveForLaterLibrary = createAction(
  UPDATE_SAVE_FOR_LATER_LIBRARY,
  (data, item) => ({ data, item })
);

const updateCompletedLibrary = createAction(UPDATE_COMPLETED_LIBRARY, (data, item) => ({ data, item }))

export const actions = {
  getAllSaved,
  getAllCompleted,
  getMoreCompleted,
  setAllSaved,
  setAllCompleted,
  updateSaveForLaterLibrary,
  updateCompletedLibrary,
};
