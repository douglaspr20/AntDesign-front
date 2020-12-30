import axios from "axios";
import { put, fork, takeLatest, call } from "redux-saga/effects";

export function* login() {}

export function* logout() {}

function* watchLogin() {
  yield takeLatest("A", login);
  yield takeLatest("B", logout);
}

export const authSaga = [fork(watchLogin)];
