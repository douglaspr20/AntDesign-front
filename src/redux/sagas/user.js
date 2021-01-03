import { put, fork, takeLatest, call } from "redux-saga/effects";

import {
  constants as homeConstants,
  actions as homeActions,
} from "../actions/home-actions";
import { getUserFromId } from "../../api";

const defaultUserInfo = {
  firstName: "",
  lastName: "",
  company: "",
  abbrName: "",
  img: null,
  about: "",
  titleProfessions: "",
  proficiencyLevel: "",
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
    const abbrName = `${(user.firstName || "").slice(0, 1).toUpperCase()}${(
      user.lastName || ""
    )
      .slice(0, 1)
      .toUpperCase()}`;

    yield put(
      homeActions.updateUserInformation({
        ...defaultUserInfo,
        ...user,
        abbrName,
      })
    );
    yield put(homeActions.setLoading(false));
  } catch (error) {
    console.log(error);
    yield put(homeActions.setLoading(false));
  }
}

function* watchLogin() {
  yield takeLatest(homeConstants.GET_USER, getUser);
}

export const userSaga = [fork(watchLogin)];
