import { put, fork, takeLatest, call, select } from "redux-saga/effects";

import {
  constants as blogPostConstants,
  actions as blogPostAction,
} from "../actions/blog-post-action";

import { actions as homeActions } from "../actions/home-actions";
import { logout } from "../actions/auth-actions";

import {
  createBlogPost,
  getBlogPostByChannelId,
  getAllBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from "../../api";

export function* createBlogPostSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(createBlogPost, { ...payload });

    if (response.status === 200 && payload.callback) {
      payload.callback();
    }
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    } else if (payload.callback) {
      const { msg } = error.response.data || {};
      payload.callback(msg || "Something went wrong, please try again.");
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* getAllBlogPostSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getAllBlogPost, { ...payload });

    if (response.status === 200) {
      yield put(blogPostAction.setAllBlogPosts(response.data.allBlogsPost));
    }
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    } else if (payload.callback) {
      const { msg } = error.response.data || {};
      payload.callback(msg || "Something went wrong, please try again.");
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* getBlogPostByChannelIdSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getBlogPostByChannelId, { ...payload });

    if (response.status === 200) {
      yield put(
        blogPostAction.setBlogsPostsByChannel(response.data.blogsPostByChannel)
      );
    }
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    } else if (payload.callback) {
      const { msg } = error.response.data || {};
      payload.callback(msg || "Something went wrong, please try again.");
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* updateBlogPostSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(updateBlogPost, { ...payload });

    if (response.status === 200) {
      const selectAllState = (state) => state;

      const allState = yield select(selectAllState);

      const blogsPostByChannel = allState.blogPost.get("blogsPostByChannel");

      const blogsPostByChannelUpdated = blogsPostByChannel.map((blogPost) =>
        blogPost.id === response.data.affectedRows.id
          ? response.data.affectedRows
          : blogPost
      );

      if (payload.callback) {
        payload.callback();
      }

      yield put(
        blogPostAction.setBlogsPostsByChannel(blogsPostByChannelUpdated)
      );
    }
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    } else if (payload.callback) {
      const { msg } = error.response.data || {};
      payload.callback(msg || "Something went wrong, please try again.");
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* deleteBlogPostSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(deleteBlogPost, { ...payload });

    if (response.status === 200) {
      if (payload.callback) {
        payload.callback();
      }
    }
  } catch (error) {
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

function* watchChannel() {
  yield takeLatest(blogPostConstants.CREATE_BLOG_POST, createBlogPostSaga);
  yield takeLatest(blogPostConstants.GET_ALL_BLOG_POSTS, getAllBlogPostSaga);
  yield takeLatest(
    blogPostConstants.GET_BLOGS_POSTS_BY_CHANNEL,
    getBlogPostByChannelIdSaga
  );

  yield takeLatest(blogPostConstants.UPDATE_BLOG_POST, updateBlogPostSaga);

  yield takeLatest(blogPostConstants.DELETE_BLOG_POST, deleteBlogPostSaga);
}

export const blogPostSaga = [fork(watchChannel)];
