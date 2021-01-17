import { put, fork, takeLatest, call } from "redux-saga/effects";

import {
  constants as libraryConstants,
  actions as libraryActions,
} from "../actions/library-actions";
import { actions as homeActions } from "../actions/home-actions";
import { addLibrary, getLibrary, searchLibrary } from "../../api";

export function* getAllLibrariesSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(searchLibrary, { ...payload });

    if (response.status === 200) {
      yield put(libraryActions.setAllLibraries(response.data.libraries.rows));
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
      yield put(libraryActions.setLibrary(response.data.library));
    }
    yield put(homeActions.setLoading(false));
  } catch (error) {
    console.log(error);
    yield put(homeActions.setLoading(false));
  }
}

export function* getLibrarySaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getLibrary, { ...payload });

    if (response.status === 200) {
      yield put(libraryActions.setLibrary(response.data.library));
    }
    yield put(homeActions.setLoading(false));
  } catch (error) {
    console.log(error);
    yield put(homeActions.setLoading(false));
  }
}

export function* searchLibrarySaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(searchLibrary, { ...payload });

    if (response.status === 200) {
      yield put(
        libraryActions.setSearchLibraries(
          response.data.libraries.count,
          1,
          response.data.libraries.rows
        )
      );
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
  yield takeLatest(libraryConstants.GET_LIBRARY, getLibrarySaga);
  yield takeLatest(libraryConstants.SEARCH_LIBRARIES, searchLibrarySaga);
}

export const librarySaga = [fork(watchLogin)];
