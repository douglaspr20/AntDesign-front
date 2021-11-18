import { put, fork, call, takeLatest } from "redux-saga/effects";

import {
  constants as myLearningConstants,
  actions as myLearningActions,
} from "../actions/myLearning-actions";

import {
  getAllCompleted,
  getAllSaved,
  getAllItemsWithHRCredits,
  getEventVideos,
} from "../../api";

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

export function* getAllItemsWithHRCreditsSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getAllItemsWithHRCredits, { ...payload });

    if (response.status === 200) {
      yield put(
        myLearningActions.setAllItemsWithHRCredits(
          response.data.itemsWithHRCredits
        )
      );
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

export function* getMoreItemsWithHRCreditsSaga({ payload }) {
  yield put(myLearningActions.setLearningLoading(true));

  try {
    const response = yield call(getAllItemsWithHRCredits, { ...payload });
    if (response.status === 200) {
      yield put(
        myLearningActions.setMoreItemsWithHrCredits(
          response.data.itemsWithHRCredits,
          payload.filter.page
        )
      );
    }
  } catch (error) {
  } finally {
    yield put(myLearningActions.setLearningLoading(false));
  }
}

export function* getEventVideosSaga() {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getEventVideos);

    if (response.status === 200) {
      yield put(myLearningActions.setAllEventVideos(response.data.libraries));
    }
  } catch (error) {
    console.error(error);
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* getMoreEventVideoSaga({ payload }) {
  yield put(myLearningActions.setLoading(true));

  try {
    const response = yield call(getEventVideos, { ...payload });

    if (response.status === 200) {
      yield put(
        myLearningActions.setMoreEventVideos(
          response.data.libraries,
          payload.page
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

function* watchLearning() {
  yield takeLatest(myLearningConstants.GET_ALL_COMPLETED, getAllCompletedSaga);
  yield takeLatest(
    myLearningConstants.GET_MORE_COMPLETED,
    getMoreCompletedSaga
  );
  yield takeLatest(myLearningConstants.GET_ALL_SAVED, getAllSavedSaga);
  yield takeLatest(
    myLearningConstants.GET_ALL_ITEMS_WITH_HR_CREDITS,
    getAllItemsWithHRCreditsSaga
  );
  yield takeLatest(
    myLearningConstants.GET_MORE_ITEMS_WITH_HR_CREDITS,
    getMoreItemsWithHRCreditsSaga
  );
  yield takeLatest(
    myLearningConstants.GET_ALL_EVENT_VIDEOS,
    getEventVideosSaga
  );
  yield takeLatest(
    myLearningConstants.GET_MORE_ALL_EVENT_VIDEOS,
    getMoreEventVideoSaga
  );
}

export const learningSaga = [fork(watchLearning)];
