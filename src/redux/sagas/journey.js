import { put, fork, takeLatest, call } from "redux-saga/effects";

import {
  constants as journeyConstants,
  actions as journeyActions,
} from "../actions/journey-actions";
import { actions as homeActions } from "../actions/home-actions";
import {
  getAllJourneys,
  get,
  post,
} from "../../api/module/journey";

export function* getAllJourneysSaga() {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getAllJourneys);

    if (response.status === 200) {
      yield put(journeyActions.setAllJourneys(response.data.journeys));
    }

    yield put(homeActions.setLoading(false));
  } catch (error) {
    console.log(error);
    yield put(homeActions.setLoading(false));
  }
}

export function* getJourneySaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(get, payload.id);

    if (response.status === 200) {
      yield put(journeyActions.setJourney(response.data.journey));
    }

    yield put(homeActions.setLoading(false));
  } catch (error) {
    console.log(error);
    yield put(homeActions.setLoading(false));
  }
}

export function* addJourneySaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(post, payload.journey);

    if (response.status === 200) {
      
    }
    yield put(homeActions.setLoading(false));
  } catch (error) {
    console.log(error);
    yield put(homeActions.setLoading(false));
  }
}

function* watchLogin() {
  yield takeLatest(journeyConstants.GET_ALL_JOURNEYS, getAllJourneysSaga);
  yield takeLatest(journeyConstants.ADD_JOURNEY, addJourneySaga);
  yield takeLatest(journeyConstants.GET_JOURNEY, getJourneySaga);
}

export const journeySaga = [fork(watchLogin)];
