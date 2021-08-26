import { createAction } from "redux-actions";

const GET_ALL_POST = "GET_ALL_POST";
const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";
const SET_POSTS = "SET_POSTS";
const SET_POST = "SET_POST";
const SET_POST_LIKE = "SET_POST_LIKE";
const DELETE_POST_LIKE = "DELETE_POST_LIKE";
const ADD_POST_COMMENT = "ADD_POST_COMMENT";

export const constants = {
  GET_ALL_POST,
  GET_POST,
  ADD_POST,
  SET_POST,
  SET_POSTS,
  SET_POST_LIKE,
  DELETE_POST_LIKE,
  ADD_POST_COMMENT,
};

// ------------------------------------
// Actions
// ------------------------------------
export const getAllPost = createAction(GET_ALL_POST);
export const getPost = createAction(GET_POST, (id) => ({ id }));
export const addPost = createAction(ADD_POST, (post) => ({ post }));
export const setPost = createAction(SET_POST, (post) => ({ post }));
export const setPosts = createAction(SET_POSTS, (posts) => ({ posts }));
export const setPostLike = createAction(SET_POST_LIKE, (data) => ({ data }));
export const deletePostLike = createAction(DELETE_POST_LIKE, (id) => (id));
export const addPostComment = createAction(ADD_POST_COMMENT, (data) => ({ data }));

export const actions = {
  getAllPost,
  getPost,
  setPost,
  addPost,
  setPosts,
  setPostLike,
  deletePostLike,
  addPostComment,
};
