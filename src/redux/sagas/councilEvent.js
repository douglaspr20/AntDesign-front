import { put, fork, takeLatest, call } from "redux-saga/effects";
import { notification } from "antd";

import {
  constants as councilEventConstants,
  actions as councilEventActions,
} from "../actions/council-events-actions";
import { actions as homeActions } from "../actions/home-actions";
import {
  upsertCouncilEvent,
  getCouncilEvents,
  deleteCouncilEvent,
  joinCouncilEvent,
  removeCouncilEventPanelist,
  searchUserForCouncilEventPanelist,
  upsertCouncilEventPanelComment,
} from "api";

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
    console.log(err.msg);
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

export function* deleteCouncilEventSaga({ payload }) {
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

export function* joinCouncilEventSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(joinCouncilEvent, payload);

    if (response.status === 200) {
      notification.success({
        message: "Success",
      });

      yield put(
        councilEventActions.setJoinCouncilEvent(response.data.councilEventPanel)
      );
    } else if (response.status === 202) {
      notification.warn({
        message: response.data.msg,
      });
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

export function* removeCouncilEventPanelistSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(removeCouncilEventPanelist, payload);

    if (response.status === 200) {
      notification.success({
        message: "Success",
      });

      yield put(
        councilEventActions.setJoinCouncilEvent(response.data.councilEventPanel)
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

export function* searchUserForCouncilEventPanelistSaga({ payload }) {
  try {
    const response = yield call(searchUserForCouncilEventPanelist, payload);

    if (response.status === 200) {
      yield put(
        councilEventActions.setSearchedUserForCouncilEventPanelist(
          response.data.users
        )
      );
    }
  } catch (err) {
    console.log(err);
    notification.error({
      message: "Something went wrong.",
    });
  }
}

export function* commentCouncilEventPanelSaga({ payload }) {
  try {
    const response = yield call(
      upsertCouncilEventPanelComment,
      payload.councilEventPanelComment
    );

    if (response.status === 200) {
      yield put(
        councilEventActions.setJoinCouncilEvent(response.data.councilEventPanel)
      );

      notification.success({
        message: "Success",
      });
    }
  } catch (err) {
    console.log(err);
    notification.error({
      message: "Something went wrong.",
    });
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
  yield takeLatest(
    councilEventConstants.JOIN_COUNCIL_EVENT,
    joinCouncilEventSaga
  );
  yield takeLatest(
    councilEventConstants.REMOVE_COUNCIL_EVENT_PANELIST,
    removeCouncilEventPanelistSaga
  );
  yield takeLatest(
    councilEventConstants.COUNCIL_EVENT_SEARCH_USER,
    searchUserForCouncilEventPanelistSaga
  );
  yield takeLatest(
    councilEventConstants.COUNCIL_EVENT_PANEL_COMMENT,
    commentCouncilEventPanelSaga
  );
}

export const councilEventSaga = [fork(watchCouncilEvent)];
