import { createSelector } from "reselect";

const blogPostDataSelector = (state) => state.blogPost;

const resultSelector = createSelector(blogPostDataSelector, (payload) => {
  return {
    loading: payload.get("loading"),
    allBlogsPost: payload.get("allBlogsPost"),
    blogsPostByChannel: payload.get("blogsPostByChannel"),
    error: payload.get("error"),
    countOfResults: payload.get("countOfResults"),
    currentPage: payload.get("currentPage"),
  };
});

export const blogPostSelector = (state) => ({
  ...resultSelector(state),
});
