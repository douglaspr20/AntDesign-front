import { put, fork, takeLatest, call } from "redux-saga/effects";
import { notification } from "antd";

import {
  constants as councilEventConstants,
  actions as councilEventActions,
} from "../actions/council-events-actions";
import { actions as homeActions } from "../actions/home-actions";
import { upsertCouncilEvent, getCouncilEvents, deleteCouncilEvent } from "api";

export function* upsertCouncilEventSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(upsertCouncilEvent, payload.councilEvent);
    const isEdit = payload.councilEvent.id;

    if (response.status === 200) {
      notification.success({
        message: "Success",
      });

      yield put(
        councilEventActions.setUpsertCouncilEvent(
          response.data.councilEvent,
          isEdit
        )
      );
    }
  } catch (err) {
    console.log(err);
    notification.error({
      message: "Something went wrong.",
    });
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* getCouncilEventsSaga() {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getCouncilEvents);

    if (response.status === 200) {
      yield put(
        councilEventActions.setCouncilEvents(response.data.councilEvents)
      );
    }
  } catch (err) {
    console.log(err);
    notification.error({
      message: "Something went wrong.",
    });
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* deleteCouncilEventSaga({payload}) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(deleteCouncilEvent, payload.councilEventId);

    if (response.status === 200) {
      notification.success({
        message: "Success",
      });
      yield put(
        councilEventActions.setCouncilEvents(response.data.councilEvents)
      );
    }
  } catch (err) {
    console.log(err);
    notification.error({
      message: "Something went wrong.",
    });
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

function* watchCouncilEvent() {
  yield takeLatest(
    councilEventConstants.UPSERT_COUNCIL_EVENT,
    upsertCouncilEventSaga
  );
  yield takeLatest(
    councilEventConstants.GET_COUNCIL_EVENTS,
    getCouncilEventsSaga
  );
  yield takeLatest(
    councilEventConstants.DELETE_COUNCIL_EVENT,
    deleteCouncilEventSaga
  );
}

export const councilEventSaga = [fork(watchCouncilEvent)];
