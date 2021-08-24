import { put, fork, takeLatest, call } from "redux-saga/effects";

import {
  constants as postConstants,
  actions as postActions,
} from "../actions/post-actions";
import { actions as homeActions } from "../actions/home-actions";
import { logout } from "../actions/auth-actions";
import { post } from "../../api/module/post";

export function* addPostSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(post, payload.post);

    if (response.status === 200) {
      // yield put(journeyActions.setShowForm(false));
      // yield put(journeyActions.getAllJourneys());
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
}

export const postSaga = [fork(watchLogin)];
