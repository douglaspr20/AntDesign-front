import { createAction } from "redux-actions";

const CREATE_BLOG_POST = "CREATE_BLOG_POST";
const GET_ALL_BLOG_POSTS = "GET_ALL_BLOG_POSTS";
const SET_ALL_BLOG_POSTS = "SET_ALL_BLOG_POSTS";
const GET_BLOGS_POSTS_BY_CHANNEL = "GET_BLOGS_POSTS_BY_CHANNEL";
const SET_BLOGS_POSTS_BY_CHANNEL = "SET_BLOGS_POSTS_BY_CHANNEL";
const UPDATE_BLOG_POST = "UPDATE_BLOG_POST";
const DELETE_BLOG_POST = "DELETE_BLOG_POST";

export const constants = {
  CREATE_BLOG_POST,
  GET_ALL_BLOG_POSTS,
  SET_ALL_BLOG_POSTS,
  GET_BLOGS_POSTS_BY_CHANNEL,
  SET_BLOGS_POSTS_BY_CHANNEL,
  UPDATE_BLOG_POST,
  DELETE_BLOG_POST,
};
// ------------------------------------
// Actions
// ------------------------------------
export const createBlogPost = createAction(
  CREATE_BLOG_POST,
  (blogpost, callback) => ({
    blogpost,
    callback,
  })
);

export const getAllBlogPosts = createAction(GET_ALL_BLOG_POSTS);

export const setAllBlogPosts = createAction(
  SET_ALL_BLOG_POSTS,
  (allBlogsPost) => ({ allBlogsPost })
);

export const getBlogsPostsByChannel = createAction(
  GET_BLOGS_POSTS_BY_CHANNEL,
  (ChannelId) => ({ ChannelId })
);

export const setBlogsPostsByChannel = createAction(
  SET_BLOGS_POSTS_BY_CHANNEL,
  (blogsPostByChannel) => ({ blogsPostByChannel })
);

export const updateBlogPost = createAction(
  UPDATE_BLOG_POST,
  (blogPostId, data, callback) => ({ blogPostId, data, callback })
);

export const deleteBlogPost = createAction(
  DELETE_BLOG_POST,
  (blogPostId, callback) => ({
    blogPostId,
    callback,
  })
);

export const actions = {
  createBlogPost,
  getAllBlogPosts,
  setAllBlogPosts,
  getBlogsPostsByChannel,
  setBlogsPostsByChannel,
  updateBlogPost,
  deleteBlogPost,
};
