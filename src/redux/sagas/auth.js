import axios from "axios";
import { put, fork, takeLatest, call } from "redux-saga/effects";

import {
  constants as authConstants,
  actions as authActions,
} from "../actions/auth-actions";
import { actions as homeActions } from "../actions/home-actions";
import { signIn, signUp } from "../../api";

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

export function* login({ payload }) {
  yield put(
    authActions.setAuth({
      isAuthenticated: false,
      loading: true,
      error: null,
      accessToken: null,
      id: 0,
    })
  );
  yield put(homeActions.updateUserInformation({}));

  try {
    const response = yield call(signIn, {
      email: payload.email,
      password: payload.password,
    });

    if (response.status === 200) {
      const { token, user } = response.data;
      axios.defaults.headers.common.Authorization = token;

      yield put(
        authActions.setAuth({
          isAuthenticated: true,
          loading: false,
          error: null,
          accessToken: token,
          id: user.id,
        })
      );

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
    } else {
      yield put(
        authActions.setAuth({
          isAuthenticated: false,
          loading: false,
          error: "Login Failed!",
          accessToken: null,
          id: 0,
        })
      );
      yield put(homeActions.updateUserInformation({}));
    }
  } catch (error) {
    console.log("***** error", error);
    yield put(
      authActions.setAuth({
        isAuthenticated: false,
        loading: false,
        error: error.response.data.message,
        accessToken: null,
        id: 0,
      })
    );
    yield put(homeActions.updateUserInformation({}));
  }
}

export function* logout() {
  axios.defaults.headers.common.Authorization = "";

  yield put(
    authActions.setAuth({
      isAuthenticated: false,
      loading: false,
      error: null,
      accessToken: null,
      id: 0,
    })
  );
  yield put(homeActions.updateUserInformation({}));
}

export function* signUpUser({ payload }) {
  yield put(
    authActions.setAuth({
      isAuthenticated: false,
      loading: true,
      error: null,
      accessToken: null,
      id: 0,
    })
  );
  yield put(homeActions.updateUserInformation({}));

  try {
    const response = yield call(signUp, { ...payload });

    if (response.status === 200) {
      const { token, user } = response.data;
      axios.defaults.headers.common.Authorization = token;

      yield put(
        authActions.setAuth({
          isAuthenticated: true,
          loading: false,
          error: null,
          accessToken: token,
          id: user.id,
        })
      );
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
    } else {
      yield put(
        authActions.setAuth({
          isAuthenticated: false,
          loading: false,
          error: "Signup Failed!",
          accessToken: null,
          id: 0,
        })
      );
      yield put(homeActions.updateUserInformation({}));
    }
  } catch (error) {
    console.log("***** error", error);
    yield put(
      authActions.setAuth({
        isAuthenticated: false,
        loading: false,
        error: error.response.data.message,
        accessToken: null,
        id: 0,
      })
    );
    yield put(homeActions.updateUserInformation({}));
  }
}

function* watchLogin() {
  yield takeLatest(authConstants.LOGIN, login);
  yield takeLatest(authConstants.LOGOUT, logout);
  yield takeLatest(authConstants.SIGNUP, signUpUser);
}

export const authSaga = [fork(watchLogin)];
