import { fork, call, put, takeLatest } from "redux-saga/effects";

import { getMatchmake } from "api";

import { actions as homeActions } from "../actions/home-actions";
import {
  actions as matchmakeActions,
  constants as matchmakeConstants,
} from "redux/actions/matchmaking-actions";

function* getMatchmakeSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getMatchmake, { ...payload });
    if (response.status === 200) {
      yield put(matchmakeActions.setMatchmake(response.data.matchmakingUsers));
      payload.callback(true);
    }
  } catch (error) {
    console.log(error);
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

function* watchMatchmake() {
  yield takeLatest(matchmakeConstants.GET_MATCHMAKE, getMatchmakeSaga);
}

export const matchmakeSaga = [fork(watchMatchmake)];
