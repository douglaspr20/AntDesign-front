import { put, fork, takeLatest, call } from "redux-saga/effects";
import {
  constants as notificationConstants,
  actions as notificationActions,
} from "../actions/notification-actions";

import { getNotifications } from "../../api";

export function* getNotificationsSaga({ payload }) {
  yield put(notificationActions.setNotificationLoading(true));

  try {
    const response = yield call(getNotifications, { ...payload });

    if (response.status === 200) {
      yield put(
        notificationActions.setNotifications(response.data.notifications)
      );
    }
  } catch (error) {
    console.log(error);
  } finally {
    yield put(notificationActions.setNotificationLoading(false));
  }
}

function* watchNotification() {
  yield takeLatest(
    notificationConstants.GET_NOTIFICATIONS,
    getNotificationsSaga
  );
}

export const notificationSaga = [fork(watchNotification)];
