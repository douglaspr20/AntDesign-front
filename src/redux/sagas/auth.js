import axios from "axios";
import { put, fork, takeLatest, call } from "redux-saga/effects";

import {
  constants as authConstants,
  actions as authActions,
} from "../actions/auth-actions";

import { signIn, signUp } from "../../api";

export function* login({ payload }) {
  const defaultAuth = {
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
      isAuthenticated: false,
      loading: true,
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
          isAuthenticated: false,
          loading: false,
          error: "Login Failed!",
        })
      );
    }
  } catch (error) {
    console.log("***** error", error);
    yield put(
      authActions.setAuth({
        ...defaultAuth,
        isAuthenticated: false,
        loading: false,
        error: error.response.data.message,
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

export function* signUpUser({ payload }) {
  const defaultAuth = {
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
      isAuthenticated: false,
      loading: true,
    })
  );

  try {
    const response = yield call(signUp, { ...payload });

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
          isAuthenticated: false,
          loading: false,
          error: "Signup Failed!",
        })
      );
    }
  } catch (error) {
    console.log("***** error", error);
    yield put(
      authActions.setAuth({
        ...defaultAuth,
        isAuthenticated: false,
        loading: false,
        error: error.response.data.message,
      })
    );
  }
}

function* watchLogin() {
  yield takeLatest(authConstants.LOGIN, login);
  yield takeLatest(authConstants.LOGOUT, logout);
  yield takeLatest(authConstants.SIGNUP, signUpUser);
}

export const authSaga = [fork(watchLogin)];
