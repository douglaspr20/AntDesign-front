import { put, fork, takeLatest, call } from "redux-saga/effects";

import {
  constants as podcastConstants,
  actions as podcastActions,
} from "../actions/podcast-actions";
import { actions as homeActions } from "../actions/home-actions";

import {
  getAllPodcasts,
  addPodcastToChannel,
  searchChannelPodcast,
} from "../../api";

export function* getAllPodcastsSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getAllPodcasts, payload);

    if (response.status === 200) {
      yield put(podcastActions.setAllPodcasts(response.data.podcast));
    }
  } catch (error) {
    console.log(error);
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
  } finally {
    yield put(podcastActions.setLoading(false));
  }
}

function* watchPodcast() {
  yield takeLatest(podcastConstants.GET_ALL_PODCASTS, getAllPodcastsSaga);
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
}

export const podcastSaga = [fork(watchPodcast)];
