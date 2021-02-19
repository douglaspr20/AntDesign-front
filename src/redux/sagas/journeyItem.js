import { put, fork, takeLatest, call } from "redux-saga/effects";

import {
  constants as journeyItemConstants,
  actions as journeyItemActions,
} from "../actions/journeyItem-actions";
import { actions as homeActions } from "../actions/home-actions";
import {
  itemsByJourney,
  setJourneyId,
} from "../../api/module/journeyItems";

export function* getItemsByJourney({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(itemsByJourney, payload.id);

    if (response.status === 200) {
      yield put(journeyItemActions.setAllJourneyItems(response.data.journeyItems));
      yield put(journeyItemActions.setJourneyId(payload.id))
    }

    yield put(homeActions.setLoading(false));
  } catch (error) {
    console.log(error);
    yield put(homeActions.setLoading(false));
  }
}

function* watchLogin() {
  yield takeLatest(journeyItemConstants.GET_ALL_JOURNEY_ITEMS, getItemsByJourney);
}

export const journeyItemSaga = [fork(watchLogin)];
