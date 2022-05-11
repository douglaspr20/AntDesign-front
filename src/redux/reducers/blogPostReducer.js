import { handleActions } from "redux-actions";
import { Map } from "immutable";

import { constants as blogPostConstants } from "../actions/blog-post-action";

export const reducers = {
  [blogPostConstants.SET_BLOGS_POSTS_BY_CHANNEL]: (state, { payload }) => {
    return state.merge({
      blogsPostByChannel: payload.blogsPostByChannel,
    });
  },
  [blogPostConstants.SET_ALL_BLOG_POSTS]: (state, { payload }) => {
    return state.merge({
      allBlogsPost: payload.allBlogsPost,
    });
  },
};

export const initialState = () =>
  Map({
    loading: false,
    error: null,
    allBlogsPost: [],
    blogsPostByChannel: [],
    countOfResults: 0,
    currentPage: 1,
  });

export default handleActions(reducers, initialState());
