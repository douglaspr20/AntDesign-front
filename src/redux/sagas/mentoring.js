import { put, fork, takeLatest, call } from "redux-saga/effects";

import {
  constants as mentoringConstants,
  actions as mentoringActions,
} from "../actions/mentoring-actions";
import { actions as homeActions } from "../actions/home-actions";

import {
  setMentorInfo,
  getMentoringInfo,
  updateMentorInfo,
  getMentorList,
  getMenteeList,
} from "../../api";

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

export function* updateMentoringInfoSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(updateMentorInfo, { ...payload });

    if (response.status === 200) {
      yield put(mentoringActions.saveMentoringInfo(response.data.mentorInfo));
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

  try {
    const response = yield call(getMentorList, { ...payload });

    if (response.status === 200) {
      const data = response.data.mentorList;
      yield put(
        mentoringActions.setMentorList(
          data && data.length > 0 ? data[0].total : 0,
          1,
          data
        )
      );
    }

    yield put(homeActions.setLoading(false));
  } catch (error) {
    console.log(error);
    yield put(homeActions.setLoading(false));
  }
}

export function* getMoreMentorListSaga({ payload }) {
  yield put(mentoringActions.setMentorLoading(true));

  try {
    const response = yield call(getMentorList, { ...payload });

    if (response.status === 200) {
      const data = response.data.mentorList;
      yield put(
        mentoringActions.setMentorList(
          data && data.length > 0 ? data[0].total : 0,
          payload.filter.page,
          data
        )
      );
    }

    yield put(mentoringActions.setMentorLoading(false));
  } catch (error) {
    console.log(error);
    yield put(mentoringActions.setMentorLoading(false));
  }
}

export function* getMenteeListSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getMenteeList, { ...payload });

    if (response.status === 200) {
      const data = response.data.menteeList;
      yield put(
        mentoringActions.setMenteeList(
          data && data.length > 0 ? data[0].total : 0,
          1,
          data
        )
      );
    }

    yield put(homeActions.setLoading(false));
  } catch (error) {
    console.log(error);
    yield put(homeActions.setLoading(false));
  }
}

export function* getMoreMenteeListSaga({ payload }) {
  yield put(mentoringActions.setMenteeLoading(true));

  try {
    const response = yield call(getMenteeList, { ...payload });

    if (response.status === 200) {
      const data = response.data.menteeList;
      yield put(
        mentoringActions.setMenteeList(
          data && data.length > 0 ? data[0].total : 0,
          payload.filter.page,
          data
        )
      );
    }

    yield put(mentoringActions.setMenteeLoading(false));
  } catch (error) {
    console.log(error);
    yield put(mentoringActions.setMenteeLoading(false));
  }
}

function* watchMentoring() {
  yield takeLatest(mentoringConstants.SET_MENTORING_INFO, setMentoringInfoSaga);
  yield takeLatest(
    mentoringConstants.UPDATE_MENTORING_INFO,
    updateMentoringInfoSaga
  );
  yield takeLatest(mentoringConstants.GET_MENTOR_LIST, getMentorListSaga);
  yield takeLatest(
    mentoringConstants.GET_MORE_MENTOR_LIST,
    getMoreMentorListSaga
  );
  yield takeLatest(mentoringConstants.GET_MENTEE_LIST, getMenteeListSaga);
  yield takeLatest(
    mentoringConstants.GET_MORE_MENTEE_LIST,
    getMoreMenteeListSaga
  );
  yield takeLatest(mentoringConstants.GET_MENTORING_INFO, getMentoringInfoSaga);
}

export const mentoringSaga = [fork(watchMentoring)];
