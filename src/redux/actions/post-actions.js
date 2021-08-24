import { createAction } from "redux-actions";

const GET_ALL_POST = "GET_ALL_POST";
const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";
const SET_POST = "SET_POST";

export const constants = {
  GET_ALL_POST,
  GET_POST,
  ADD_POST,
  SET_POST,
};

// ------------------------------------
// Actions
// ------------------------------------
export const getAllPost = createAction(GET_ALL_POST);
export const getPost = createAction(GET_POST, (id) => ({ id }));
export const addPost = createAction(ADD_POST, (post) => ({ post }));
export const setPost = createAction(ADD_POST, (post) => ({ post }));

export const actions = {
  getAllPost,
  getPost,
  setPost,
  addPost,
};
