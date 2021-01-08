import { put, fork, takeLatest, call } from "redux-saga/effects";

import {
  constants as homeConstants,
  actions as homeActions,
} from "../actions/home-actions";
import { getUserFromId, updateUser } from "../../api";

const defaultUserInfo = {
  firstName: "",
  lastName: "",
  company: "",
  abbrName: "",
  img: null,
  about: "",
  titleProfessions: "",
  topicsOfInterest: [],
  personalLinks: {},
  language: "",
  timezone: "",
  completed: false,
  percentOfCompletion: 0,
};

export function* getUser({ payload }) {
  yield put(homeActions.updateUserInformation(defaultUserInfo));
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getUserFromId, { ...payload });
    const { user } = response.data;

    yield put(
      homeActions.updateUserInformation({
        ...defaultUserInfo,
        ...user,
      })
    );
    yield put(homeActions.setLoading(false));
  } catch (error) {
    console.log(error);
    yield put(homeActions.setLoading(false));
  }
}

export function* putUser({ payload }) {
  yield put(homeActions.updateUserInformation(defaultUserInfo));
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(updateUser, { ...payload });

    if (response.status === 200) {
      const { affectedRows: user } = response.data;

      yield put(
        homeActions.updateUserInformation({
          ...defaultUserInfo,
          ...user,
        })
      );
    }
    yield put(homeActions.setLoading(false));
  } catch (error) {
    console.log(error);
    yield put(homeActions.setLoading(false));
  }
}

function* watchLogin() {
  yield takeLatest(homeConstants.GET_USER, getUser);
  yield takeLatest(homeConstants.UPDATE_USER, putUser);
}

export const userSaga = [fork(watchLogin)];
