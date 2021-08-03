import { put, fork, takeLatest, call } from "redux-saga/effects";

import {
  constants as conferenceConstants,
  actions as conferenceActions,
} from "../actions/conference-actions";
import { actions as homeActions } from "../actions/home-actions";
import { searchConferenceLibrary, claimConferenceLibrary } from "../../api";

export function* getMoreConferenceLibrariesSaga({ payload }) {
  yield put(conferenceActions.setLoading(true));

  try {
    const response = yield call(searchConferenceLibrary, { ...payload });

    if (response.status === 200) {
      yield put(
        conferenceActions.setMoreConferenceLibraries(
          response.data.conferences.count,
          payload.filter.page,
          response.data.conferences.rows
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
          response.data.conferences.count,
          1,
          response.data.conferences.rows
        )
      );
    }

    yield put(homeActions.setLoading(false));
  } catch (error) {
    console.log(error);
    yield put(homeActions.setLoading(false));
  }
}

export function* claimConferenceLibrarySaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(claimConferenceLibrary, { ...payload });

    if (response.status === 200) {
      if (payload.callback) {
        payload.callback("");
      }
    }
  } catch (error) {
    if (payload.callback) {
      payload.callback(
        error.response.data || "Something went wrong, Please try again."
      );
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

function* watchConference() {
  yield takeLatest(
    conferenceConstants.GET_MORE_CONFERENCE_LIBRARIES,
    getMoreConferenceLibrariesSaga
  );
  yield takeLatest(
    conferenceConstants.SEARCH_CONFERENCE_LIBRARIES,
    searchConferenceLibrarySaga
  );
  yield takeLatest(
    conferenceConstants.CLAIM_CONFERENCE_LIBRARY,
    claimConferenceLibrarySaga
  );
}

export const conferenceSaga = [fork(watchConference)];
