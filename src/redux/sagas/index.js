import { all } from "redux-saga/effects";
import { authSaga } from "./auth";
import { userSaga } from "./user";
import { eventSaga } from "./event";
import { librarySaga } from "./library";

export default function* sagas() {
  yield all([...authSaga, ...userSaga, ...eventSaga, ...librarySaga]);
}
