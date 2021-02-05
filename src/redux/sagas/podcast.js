import { put, fork, takeLatest, call } from "redux-saga/effects";

import {
  constants as podcastConstants,
  actions as podcastActions,
} from "../actions/podcast-actions";
import { actions as homeActions } from "../actions/home-actions";

import { getAllPodcasts } from "../../api";

export function* getAllPodcastsSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getAllPodcasts, payload);

    if (response.status === 200) {
      yield put(podcastActions.setAllPodcasts(response.data.podcast));
    }

    yield put(homeActions.setLoading(false));
  } catch (error) {
    console.log(error);
    yield put(homeActions.setLoading(false));
  }
}

function* watchPodcast() {
  yield takeLatest(podcastConstants.GET_ALL_PODCASTS, getAllPodcastsSaga);
}

export const podcastSaga = [fork(watchPodcast)];
