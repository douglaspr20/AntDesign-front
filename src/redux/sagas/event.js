import { put, fork, takeLatest, call } from "redux-saga/effects";
import { notification } from "antd";
import moment from "moment";

import {
  constants as eventConstants,
  actions as eventActions,
} from "../actions/event-actions";
import { actions as homeActions } from "../actions/home-actions";
import { getAllEvents, getEvent } from "../../api";

export function* getAllEventsSaga() {
  yield put(homeActions.setLoading(true));
  yield put(eventActions.setError(""));

  try {
    const response = yield call(getAllEvents);

    if (response.status === 200) {
      yield put(
        eventActions.setAllEvents(
          response.data.events
            .map((item) => ({
              ...item,
              key: item.id,
              date: moment(item.startDate).format("YYYY.MM.DD h:mm a"),
              date2: moment(item.endDate).format("YYYY.MM.DD h:mm a"),
            }))
            .sort((a, b) => {
              return moment(a.startDate).isAfter(moment(b.startDate)) ? 1 : -1;
            })
        )
      );
    }
    yield put(homeActions.setLoading(false));
  } catch (error) {
    console.log(error);
    yield put(homeActions.setLoading(false));

    const { msg } = error.response.data || {};
    yield put(eventActions.setError(msg));
    notification.error({
      message: "Cannot read all the events.",
      description: msg,
    });
  }
}

export function* getEventSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getEvent, { ...payload });

    if (response.status === 200) {
      yield put(
        eventActions.setEvent({
          ...response.data.event,
          date: moment(response.data.event.startDate).format(
            "YYYY.MM.DD h:mm a"
          ),
          date2: moment(response.data.event.endDate).format(
            "YYYY.MM.DD h:mm a"
          ),
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
  yield takeLatest(eventConstants.GET_ALL_EVENTS, getAllEventsSaga);
  yield takeLatest(eventConstants.GET_EVENT, getEventSaga);
}

export const eventSaga = [fork(watchLogin)];
