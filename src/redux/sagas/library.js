import { put, fork, takeLatest, call } from "redux-saga/effects";

import {
  constants as libraryConstants,
  actions as libraryActions,
} from "../actions/library-actions";
import { actions as homeActions } from "../actions/home-actions";
import {
  addLibrary,
  getLibrary,
  searchLibrary,
  searchChannelLibrary,
  getRecommendations,
  addChannelLibrary,
  deleteChannelLibrary,
  updateChannelLibrary,
  shareChannelLibrary,
} from "../../api";

export function* getMoreLibrariesSaga({ payload }) {
  yield put(libraryActions.setLoading(true));

  try {
    const response = yield call(searchLibrary, { ...payload });

    if (response.status === 200) {
      yield put(
        libraryActions.setMoreLibraries(
          response.data.libraries.count,
          payload.filter.page,
          response.data.libraries.rows
        )
      );
    }
    yield put(libraryActions.setLoading(false));
  } catch (error) {
    console.log(error);
    yield put(libraryActions.setLoading(false));
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

export function* getRecommendationsSaga() {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getRecommendations);

    if (response.status === 200) {
      yield put(libraryActions.setRecommendations(response.data));
    }

    yield put(homeActions.setLoading(false));
  } catch (error) {
    console.log(error);
    yield put(homeActions.setLoading(false));
  }
}

export function* addChannelLibrarySaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(addChannelLibrary, { ...payload });

    if (response.status === 200) {
      if (payload.callback) {
        payload.callback();
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* updateChannelLibrarySaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(updateChannelLibrary, { ...payload });

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

export function* getFirstChannelLibraryList({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(searchChannelLibrary, { ...payload });

    if (response.status === 200) {
      yield put(
        libraryActions.setFirstChannelLibraryList(
          response.data.libraries.count,
          1,
          response.data.libraries.rows
        )
      );
    }
  } catch (error) {
    console.log(error);
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* getMoreChannelLibraryList({ payload }) {
  yield put(libraryActions.setLoading(true));

  try {
    const response = yield call(searchChannelLibrary, { ...payload });

    if (response.status === 200) {
      yield put(
        libraryActions.setMoreChannelLibraryList(
          response.data.libraries.count,
          payload.filter.page,
          response.data.libraries.rows
        )
      );
    }
  } catch (error) {
    console.log(error);
  } finally {
    yield put(libraryActions.setLoading(false));
  }
}

export function* deleteChannelLibrarySaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(deleteChannelLibrary, { ...payload });

    if (response.status === 200 && payload.callback) {
      payload.callback("");
    }
  } catch (error) {
    console.log(error);
    if (payload.callback) {
      payload.callback("Something went wrong. Please try again.");
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* shareChannelLibrarySaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(shareChannelLibrary, { ...payload });

    if (response.status === 200 && payload.callback) {
      payload.callback("");
    }
  } catch (error) {
    console.log(error);
    if (payload.callback) {
      payload.callback("Something went wrong. Please try again.");
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

function* watchLogin() {
  yield takeLatest(libraryConstants.GET_MORE_LIBRARIES, getMoreLibrariesSaga);
  yield takeLatest(libraryConstants.ADD_LIBRARY, addLibrarySaga);
  yield takeLatest(libraryConstants.GET_LIBRARY, getLibrarySaga);
  yield takeLatest(libraryConstants.SEARCH_LIBRARIES, searchLibrarySaga);
  yield takeLatest(
    libraryConstants.GET_RECOMMENDATIONS,
    getRecommendationsSaga
  );
  yield takeLatest(libraryConstants.ADD_CHANNEL_LIBRARY, addChannelLibrarySaga);
  yield takeLatest(
    libraryConstants.UPDATE_CHANNEL_LIBRARY,
    updateChannelLibrarySaga
  );
  yield takeLatest(
    libraryConstants.GET_FIRST_CHANNEL_LIBRARY_LIST,
    getFirstChannelLibraryList
  );
  yield takeLatest(
    libraryConstants.GET_MORE_CHANNEL_LIBRARY_LIST,
    getMoreChannelLibraryList
  );
  yield takeLatest(
    libraryConstants.DELETE_CHANNEL_LIBRARY,
    deleteChannelLibrarySaga
  );
  yield takeLatest(libraryConstants.SHARE_CHANNEL_LIBRARY, shareChannelLibrarySaga);
}

export const librarySaga = [fork(watchLogin)];
