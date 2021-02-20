import { put, fork, takeLatest, call } from "redux-saga/effects";

import {
  constants as conferenceConstants,
  actions as conferenceActions,
} from "../actions/library-actions";
import { actions as homeActions } from "../actions/home-actions";
import { searchConferenceLibrary } from "../../api";

export function* getMoreConferenceLibrariesSaga({ payload }) {
  yield put(conferenceActions.setLoading(true));

  try {
    const response = yield call(searchConferenceLibrary, { ...payload });

    if (response.status === 200) {
      yield put(
        conferenceActions.setMoreConferenceLibraries(
          response.data.libraries.count,
          payload.filter.page,
          response.data.libraries.rows
        )
      );
    }
    yield put(conferenceActions.setLoading(false));
  } catch (error) {
    console.log(error);
    yield put(conferenceActions.setLoading(false));
  }
}

export function* searchConferenceLibrarySaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(searchConferenceLibrary, { ...payload });

    if (response.status === 200) {
      yield put(
        conferenceActions.setSearchConferenceLibraries(
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
  yield takeLatest(
    conferenceConstants.GET_MORE_LIBRARIES,
    getMoreConferenceLibrariesSaga
  );
  yield takeLatest(
    conferenceConstants.SEARCH_LIBRARIES,
    searchConferenceLibrarySaga
  );
}

export const librarySaga = [fork(watchLogin)];
