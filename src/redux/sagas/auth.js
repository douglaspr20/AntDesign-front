import axios from "axios";
import { put, fork, takeLatest, call } from "redux-saga/effects";

import {
  constants as authConstants,
  actions as authActions,
} from "../actions/auth-actions";

import { signIn } from "../../api";

export function* login({ payload }) {
  const defaultAuth = {
    isAuthenticated: false,
    loading: true,
    error: null,
    accessToken: null,
    firstName: null,
    lastName: null,
    email: null,
    role: "",
  };

  yield put(
    authActions.setAuth({
      ...defaultAuth,
    })
  );

  try {
    const response = yield call(signIn, {
      email: payload.email,
      password: payload.password,
    });

    if (response.status === 200) {
      const {
        token,
        user: { firstName, lastName, email, role },
      } = response.data;
      axios.defaults.headers.common.Authorization = token;

      yield put(
        authActions.setAuth({
          isAuthenticated: true,
          loading: false,
          error: null,
          accessToken: token,
          firstName,
          lastName,
          email,
          role,
        })
      );
    } else {
      yield put(
        authActions.setAuth({
          ...defaultAuth,
        })
      );
    }
  } catch (error) {
    console.log("***** error", error);
    yield put(
      authActions.setAuth({
        ...defaultAuth,
      })
    );
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
      firstName: null,
      lastName: null,
      email: null,
    })
  );
}

function* watchLogin() {
  yield takeLatest(authConstants.LOGIN, login);
  yield takeLatest(authConstants.LOGOUT, logout);
}

export const authSaga = [fork(watchLogin)];
