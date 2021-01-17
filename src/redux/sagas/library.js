import { put, fork, takeLatest, call } from "redux-saga/effects";

import { constants as libraryConstants, actions as libraryActions } from "../actions/library-actions";
import { actions as homeActions } from "../actions/home-actions";
import { getAllLibraries, addLibrary } from "../../api";

export function* getAllLibrariesSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getAllLibraries, { ...payload });

    if (response.status === 200) {

    }
    yield put(homeActions.setLoading(false));
  } catch (error) {
    console.log(error);
    yield put(homeActions.setLoading(false));
  }
}

export function* addLibrarySaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(addLibrary, { ...payload });

    if (response.status === 200) {
      console.log('')
    }
    yield put(homeActions.setLoading(false));
  } catch (error) {
    console.log(error);
    yield put(homeActions.setLoading(false));
  }
}

function* watchLogin() {
  yield takeLatest(libraryConstants.GET_ALL_LIBRARIES, getAllLibrariesSaga);
  yield takeLatest(libraryConstants.ADD_LIBRARY, addLibrarySaga);
}

export const librarySaga = [fork(watchLogin)];
