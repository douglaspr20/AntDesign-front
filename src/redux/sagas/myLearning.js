import { put, fork, call, takeLatest } from "redux-saga/effects";

import {
  constants as myLearningConstants,
  actions as myLearningActions,
} from "../actions/myLearning-actions";

import { getAllCompleted, getAllSaved } from "../../api";

import { logout } from "../actions/auth-actions";
import { actions as homeActions } from "../actions/home-actions";

export function* getAllCompletedSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getAllCompleted, { ...payload });

    if (response.status === 200) {
      yield put(myLearningActions.setAllCompleted(response.data.allCompleted));
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

export function* getMoreCompletedSaga({ payload }) {
  yield put(myLearningActions.setLoading(true));

  try {
    const response = yield call(getAllCompleted, { ...payload });

    if (response.status === 200) {
      yield put(
        myLearningActions.setAllCompleted(
          response.data.allCompleted.count,
          payload.filter.page,
          response.data.allCompleted.rows
        )
      );
    }
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    }
  } finally {
    yield put(myLearningActions.setLoading(false));
  }
}

export function* getAllSavedSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getAllSaved, { ...payload });

    if (response.status === 200) {
      yield put(myLearningActions.setAllSaved(response.data.allSaved));
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


function* watchLearning() {
  yield takeLatest(myLearningConstants.GET_ALL_COMPLETED, getAllCompletedSaga);
  yield takeLatest(
    myLearningConstants.GET_MORE_COMPLETED,
    getMoreCompletedSaga
  );
  yield takeLatest(myLearningConstants.GET_ALL_SAVED, getAllSavedSaga);
}

export const learningSaga = [fork(watchLearning)];
