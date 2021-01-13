import { all } from "redux-saga/effects";
import { authSaga } from "./auth";
import { userSaga } from "./user";
import { eventSaga } from "./event";

export default function* sagas() {
  yield all([...authSaga, ...userSaga, ...eventSaga]);
}
