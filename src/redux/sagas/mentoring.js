import { put, fork, takeLatest, call, all } from "redux-saga/effects";

import {
  constants as mentoringConstants,
  actions as mentoringActions,
} from "../actions/mentoring-actions";
import { actions as homeActions } from "../actions/home-actions";

import { setMentorInfo, getMentoringInfo } from "../../api";

export function* setMentoringInfoSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(setMentorInfo, { ...payload });

    if (response.status === 200) {
      yield put(mentoringActions.saveMentoringInfo([response.data.mentorInfo]));
      yield put(homeActions.updateUserInformation(response.data.user));
    }
    yield put(homeActions.setLoading(false));
  } catch (error) {
    console.log(error);
    yield put(homeActions.setLoading(false));
  }
}

export function* getMentoringInfoSaga() {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getMentoringInfo);

    if (response.status === 200 && response.data.mentoringInfo) {
      yield put(
        mentoringActions.saveMentoringInfo(response.data.mentoringInfo)
      );
    }
    yield put(homeActions.setLoading(false));
  } catch (error) {
    console.log(error);
    yield put(homeActions.setLoading(false));
  }
}

export function* getMentorListSaga({ payload }) {
  yield put(homeActions.setLoading(true));
}

export function* getMenteeListSaga({ payload }) {
  yield put(homeActions.setLoading(true));
}

function* watchMentoring() {
  yield takeLatest(mentoringConstants.SET_MENTORING_INFO, setMentoringInfoSaga);
  yield takeLatest(mentoringConstants.GET_MENTOR_LIST, getMentorListSaga);
  yield takeLatest(mentoringConstants.GET_MENTEE_LIST, getMenteeListSaga);
  yield takeLatest(mentoringConstants.GET_MENTORING_INFO, getMentoringInfoSaga);
}

export const mentoringSaga = [fork(watchMentoring)];
