import { createAction } from "redux-actions";

const GET_ALL_POST = "GET_ALL_POST";
const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";
const UPDATE_POST = "UPDATE_POST";
const DELETE_POST = "DELETE_POST";
const SET_ALL_POSTS = "SET_ALL_POSTS";
const SET_POSTS = "SET_POSTS";
const SET_POST = "SET_POST";
const SET_POST_LIKE = "SET_POST_LIKE";
const DELETE_POST_LIKE = "DELETE_POST_LIKE";
const ADD_POST_COMMENT = "ADD_POST_COMMENT";
const SET_LOADING = "SET_POST_LOADING";

export const constants = {
  GET_ALL_POST,
  GET_POST,
  ADD_POST,
  SET_POST,
  SET_POSTS,
  SET_POST_LIKE,
  DELETE_POST_LIKE,
  ADD_POST_COMMENT,
  SET_LOADING,
  SET_ALL_POSTS,
  UPDATE_POST,
  DELETE_POST,
};

// ------------------------------------
// Actions
// ------------------------------------
export const getAllPost = createAction(GET_ALL_POST, (filter) => ({ filter }));
export const getPost = createAction(GET_POST, (id) => ({ id }));
export const addPost = createAction(ADD_POST, (post) => ({ post }));
export const updatePost = createAction(UPDATE_POST, (post) => ({ post }));
export const deletePost = createAction(DELETE_POST, (post) => ({ post }));
export const setPost = createAction(SET_POST, (post) => ({ post }));
export const setAllPosts = createAction(
  SET_ALL_POSTS,
  (total, page, posts) => ({
    total,
    page,
    posts,
  })
);
export const setPosts = createAction(SET_POSTS, (posts) => ({ posts }));
export const setPostLike = createAction(SET_POST_LIKE, (data) => ({ data }));
export const deletePostLike = createAction(DELETE_POST_LIKE, (id) => id);
export const addPostComment = createAction(ADD_POST_COMMENT, (data) => ({
  data,
}));
export const setLoading = createAction(SET_LOADING, (loading) => ({ loading }));

export const actions = {
  getAllPost,
  getPost,
  setPost,
  addPost,
  setPosts,
  setPostLike,
  deletePostLike,
  addPostComment,
  setLoading,
  setAllPosts,
  updatePost,
  deletePost,
};
