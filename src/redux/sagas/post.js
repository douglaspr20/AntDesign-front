import { put, fork, takeLatest, call } from "redux-saga/effects";

import {
  constants as postConstants,
  actions as postActions,
  addPostComment,
} from "../actions/post-actions";
import { actions as homeActions } from "../actions/home-actions";
import { logout } from "../actions/auth-actions";
import { getAllPosts, post } from "../../api/module/post";
import {
  post as postLike,
  remove as removeLike,
} from "../../api/module/postLike";
import {
  post as postComment,
} from "../../api/module/postComment";

export function* getAllPostSaga() {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getAllPosts);

    if (response.status === 200) {
      yield put(postActions.setPosts(response.data.posts));
    }
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* addPostSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(post, payload.post);

    if (response.status === 200) {
      yield put(postActions.getAllPost());
    }
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* setPostLikeSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(postLike, payload.data);

    if (response.status === 200) {
      yield put(postActions.getAllPost());
    }
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* deletePostLikeSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(removeLike, payload.id);

    if (response.status === 200) {
      yield put(postActions.getAllPost());
    }
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* addPostCommentSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(postComment, payload.data);

    if (response.status === 200) {
      yield put(postActions.getAllPost());
    }
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

function* watchLogin() {
  yield takeLatest(postConstants.ADD_POST, addPostSaga);
  yield takeLatest(postConstants.GET_ALL_POST, getAllPostSaga);
  yield takeLatest(postConstants.SET_POST_LIKE, setPostLikeSaga);
  yield takeLatest(postConstants.DELETE_POST_LIKE, deletePostLikeSaga);
  yield takeLatest(postConstants.ADD_POST_COMMENT, addPostCommentSaga);
}

export const postSaga = [fork(watchLogin)];
