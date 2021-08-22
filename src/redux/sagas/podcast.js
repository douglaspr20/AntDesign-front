import { put, fork, takeLatest, call } from "redux-saga/effects";

import {
  constants as podcastConstants,
  actions as podcastActions,
} from "../actions/podcast-actions";
import { actions as homeActions } from "../actions/home-actions";
import { logout } from "../actions/auth-actions";

import {
  getAllPodcasts,
  addPodcastToChannel,
  searchChannelPodcast,
  deleteChannelPodcast,
  updateChannelPodcast,
  getAllPodcastSeries,
  getPodcastSeries,
  claimPodcastSeries,
  markPodcastseriesViewed,
} from "../../api";

export function* getAllPodcastsSaga({ payload }) {
  if (payload.page === 1) {
    yield put(homeActions.setLoading(true));
  } else {
    yield put(podcastActions.setLoading(true));
  }

  try {
    const response = yield call(getAllPodcasts, payload);

    if (response.status === 200) {
      yield put(
        podcastActions.setAllPodcasts(
          response.data.podcasts.count,
          payload.filter.page || 1,
          response.data.podcasts.rows
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
    yield put(podcastActions.setLoading(false));
  }
}

export function* getAllPodcastSeriesSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getAllPodcastSeries, { ...payload });

    if (response.status === 200) {
      yield put(
        podcastActions.setAllPodcastSeries(response.data.podcastSeries)
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

export function* getPodcastSeriesSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getPodcastSeries, { ...payload });

    if (response.status === 200) {
      yield put(podcastActions.setPodcastSeries(response.data.podcastSeries));
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

export function* addPodcastToChannelSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(addPodcastToChannel, payload);

    if (response.status === 200) {
      if (payload.callback) {
        payload.callback();
      }
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

export function* getFirstChannelPodcastList({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(searchChannelPodcast, { ...payload });

    if (response.status === 200) {
      yield put(
        podcastActions.setFirstChannelPodcastList(
          response.data.podcasts.count,
          1,
          response.data.podcasts.rows
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

export function* getMoreChannelPodcastList({ payload }) {
  yield put(podcastActions.setLoading(true));

  try {
    const response = yield call(searchChannelPodcast, { ...payload });

    if (response.status === 200) {
      yield put(
        podcastActions.setMoreChannelPodcastList(
          response.data.podcasts.count,
          payload.filter.page,
          response.data.podcasts.rows
        )
      );
    }
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    }
  } finally {
    yield put(podcastActions.setLoading(false));
  }
}

export function* deleteChannelPodcastSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(deleteChannelPodcast, { ...payload });

    if (response.status === 200 && payload.callback) {
      payload.callback("");
    }
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    } else if (payload.callback) {
      payload.callback("Something went wrong. Please try again.");
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* updateChannelPodcastSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(updateChannelPodcast, { ...payload });

    if (response.status === 200) {
      if (payload.callback) {
        payload.callback("");
      }
    }
  } catch (error) {
    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    } else if (payload.callback) {
      payload.callback(
        error.response.data || "Something went wrong, Please try again."
      );
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* claimPodcastSeriesSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(claimPodcastSeries, { ...payload });

    if (response.status === 200) {
      if (payload.callback) {
        payload.callback("");
      }
    }
  } catch (error) {
    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    } else if (payload.callback) {
      payload.callback(
        error.response.data || "Something went wrong, Please try again."
      );
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* markPodcastSeriesViewedSaga({ payload }) {
  try {
    const response = yield call(markPodcastseriesViewed, { ...payload });

    if (response.status === 200) {
      yield put(podcastActions.updatePodcastseriesViewed(response.data.affectedRows));
    }
  } catch (error) {
    console.log(error);
    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    }
  }
}

function* watchPodcast() {
  yield takeLatest(podcastConstants.GET_ALL_PODCASTS, getAllPodcastsSaga);
  yield takeLatest(
    podcastConstants.GET_ALL_PODCAST_SERIES,
    getAllPodcastSeriesSaga
  );
  yield takeLatest(podcastConstants.GET_PODCAST_SERIES, getPodcastSeriesSaga);
  yield takeLatest(
    podcastConstants.ADD_PODCAST_TO_CHANNEL,
    addPodcastToChannelSaga
  );
  yield takeLatest(
    podcastConstants.GET_FIRST_CHANNEL_PODCAST_LIST,
    getFirstChannelPodcastList
  );
  yield takeLatest(
    podcastConstants.GET_MORE_CHANNEL_PODCAST_LIST,
    getMoreChannelPodcastList
  );
  yield takeLatest(
    podcastConstants.DELETE_CHANNEL_PODCAST,
    deleteChannelPodcastSaga
  );
  yield takeLatest(
    podcastConstants.UPDATE_CHANNEL_PODCAST,
    updateChannelPodcastSaga
  );
  yield takeLatest(
    podcastConstants.CLAIM_PODCAST_SERIES,
    claimPodcastSeriesSaga
  );
  yield takeLatest(
    podcastConstants.SET_PODCAST_SERIES_VIEWED,
    markPodcastSeriesViewedSaga
  );
}

export const podcastSaga = [fork(watchPodcast)];
