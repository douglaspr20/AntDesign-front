import { put, fork, takeLatest, call } from "redux-saga/effects";
import { notification } from "antd";
import moment from "moment";
import {
  getEventPeriod,
  getEventDescription,
  convertToCertainTime,
} from "utils/format";
import storage from "store";

import {
  constants as eventConstants,
  actions as eventActions,
} from "../actions/event-actions";
import { logout } from "../actions/auth-actions";
import { actions as homeActions } from "../actions/home-actions";
import {
  getAllEvents,
  getEvent,
  addToMyEventListFromAPI,
  removeFromMyEventListFromAPI,
  getAllMyEventsFromAPI,
  updateEventStatusFromAPI,
  createChannelEvent,
  getChannelEvents,
  deleteEvent,
  updateChannelEvent,
  claimEventCredit,
  claimEventAttendance,
} from "../../api";

const getEventStatus = (data, userId) => {
  let res = data.status[userId];

  const last = data.startAndEndTimes[data.startAndEndTimes.length - 1];

  if (res === "going") {
    res = moment().isBefore((last || {}).endTime) ? res : "past";
  } else if (!res) {
    res = moment().isBefore((last || {}).endTime) ? "attend" : "";
  }
  return res;
};

export function* getAllEventsSaga() {
  yield put(homeActions.setLoading(true));
  yield put(eventActions.setError(""));

  try {
    const response = yield call(getAllEvents);

    if (response.status === 200) {
      const community = storage.get("community");
      const { id: userId } = community || {};

      yield put(
        eventActions.setAllEvents(
          response.data.events
            .map((item) => ({
              ...item,
              key: item.id,
              date: convertToCertainTime(item.startDate, item.timezone).format(
                "YYYY.MM.DD h:mm a"
              ),
              date2: convertToCertainTime(item.endDate, item.timezone).format(
                "YYYY.MM.DD h:mm a"
              ),
              period: getEventPeriod(
                item.startDate,
                item.endDate,
                item.timezone
              ),
              about: getEventDescription(item.description),
              status: getEventStatus(item, userId),
            }))
            .sort((a, b) => {
              return moment(a.startDate).isAfter(moment(b.startDate)) ? 1 : -1;
            })
        )
      );
    }
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    } else {
      const { msg } = error.response.data || {};
      yield put(eventActions.setError(msg));
      notification.error({
        message: "Cannot read all the events.",
        description: msg,
      });
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* getEventSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getEvent, { ...payload });

    if (response.status === 200) {
      const community = storage.get("community");
      const { id: userId } = community || {};
      const { event } = response.data;
      yield put(
        eventActions.setEvent({
          ...event,
          date: convertToCertainTime(event.startDate, event.timezone).format(
            "YYYY.MM.DD h:mm a"
          ),
          date2: convertToCertainTime(event.endDate, event.timezone).format(
            "YYYY.MM.DD h:mm a"
          ),
          period: getEventPeriod(
            event.startDate,
            event.endDate,
            event.timezone
          ),
          about: getEventDescription(event.description),
          status: getEventStatus(event, userId),
        })
      );
    }
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    } else if (payload.callback) {
      payload.callback(true);
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* addToMyEventList({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(addToMyEventListFromAPI, { ...payload });

    if (response.status === 200) {
      const data = response.data.affectedRows;
      const community = storage.get("community");
      const { id: userId } = community || {};
      yield put(
        eventActions.setEvent({
          ...data,
          date: convertToCertainTime(data.startDate, data.timezone).format(
            "YYYY.MM.DD h:mm a"
          ),
          date2: convertToCertainTime(data.endDate, data.timezone).format(
            "YYYY.MM.DD h:mm a"
          ),
          period: getEventPeriod(data.startDate, data.endDate, data.timezone),
          about: getEventDescription(data.description),
          status: getEventStatus(data, userId),
        })
      );

      if (payload.callback) {
        payload.callback();
      }
    }
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* removeFromMyEventList({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(removeFromMyEventListFromAPI, { ...payload });

    if (response.status === 200) {
      const data = response.data.affectedRows;
      const community = storage.get("community");
      const { id: userId } = community || {};
      yield put(
        eventActions.setEvent({
          ...data,
          date: convertToCertainTime(data.startDate, data.timezone).format(
            "YYYY.MM.DD h:mm a"
          ),
          date2: convertToCertainTime(data.endDate, data.timezone).format(
            "YYYY.MM.DD h:mm a"
          ),
          period: getEventPeriod(data.startDate, data.endDate, data.timezone),
          about: getEventDescription(data.description),
          status: getEventStatus(data, userId),
        })
      );
    }
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* getAllMyEvents() {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getAllMyEventsFromAPI);

    if (response.status === 200) {
      const community = storage.get("community");
      const { id: userId } = community || {};
      yield put(
        eventActions.setMyEvents(
          response.data.myEvents.map((item) => ({
            ...item,
            key: item.id,
            date: convertToCertainTime(item.startDate, item.timezone).format(
              "YYYY.MM.DD h:mm a"
            ),
            date2: convertToCertainTime(item.endDate, item.timezone).format(
              "YYYY.MM.DD h:mm a"
            ),
            period: getEventPeriod(item.startDate, item.endDate, item.timezone),
            about: getEventDescription(item.description),
            status: getEventStatus(item, userId),
          }))
        )
      );
    }
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* updateEventStatus({ payload }) {
  yield put(homeActions.setLoading(true));
  try {
    const response = yield call(updateEventStatusFromAPI, { ...payload });

    if (response.status === 200) {
      const data = response.data.affectedRows;
      const community = storage.get("community");
      const { id: userId } = community || {};
      yield put(
        eventActions.setEvent({
          ...data,
          date: convertToCertainTime(data.startDate, data.timezone).format(
            "YYYY.MM.DD h:mm a"
          ),
          date2: convertToCertainTime(data.endDate, data.timezone).format(
            "YYYY.MM.DD h:mm a"
          ),
          period: getEventPeriod(data.startDate, data.endDate, data.timezone),
          about: getEventDescription(data.description),
          status: getEventStatus(data, userId),
        })
      );
    }
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* createChannelEventSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(createChannelEvent, { ...payload });

    if (response.status === 200) {
      if (payload.callback) {
        payload.callback("");
      }
    }
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    } else if (payload.callback) {
      payload.callback("Something went wrong. Please try again.");
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* getChannelEventsSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getChannelEvents, { ...payload });

    if (response.status === 200) {
      const community = storage.get("community");
      const { id: userId } = community || {};
      const { channelEvents } = response.data;

      yield put(
        eventActions.setChannelEvents(
          channelEvents
            .map((item) => ({
              ...item,
              key: item.id,
              date: convertToCertainTime(item.startDate, item.timezone).format(
                "YYYY.MM.DD h:mm a"
              ),
              date2: convertToCertainTime(item.endDate, item.timezone).format(
                "YYYY.MM.DD h:mm a"
              ),
              period: getEventPeriod(
                item.startDate,
                item.endDate,
                item.timezone
              ),
              about: getEventDescription(item.description),
              status: getEventStatus(item, userId),
            }))
            .sort((a, b) => {
              return moment(a.startDate).isAfter(moment(b.startDate)) ? 1 : -1;
            })
        )
      );
    }
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* deleteEventSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(deleteEvent, { ...payload });

    if (response.status === 200 && payload.callback) {
      payload.callback("");
    }
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    } else if (payload.callback) {
      payload.callback("Something went wrong. Please try again.");
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* updateChannelEventSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(updateChannelEvent, { ...payload });

    if (response.status === 200) {
      if (payload.callback) {
        payload.callback("");
      }
    }
  } catch (error) {
    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    } else if (payload.callback) {
      payload.callback(
        error.response.data || "Something went wrong, Please try again."
      );
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* claimEventCreditSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(claimEventCredit, { ...payload });

    if (response.status === 200) {
      if (payload.callback) {
        payload.callback("");
      }
    }
  } catch (error) {
    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    } else if (payload.callback) {
      payload.callback(
        error.response.data || "Something went wrong, Please try again."
      );
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* claimEventAttendanceSaga({ payload }) {
  try {
    yield call(claimEventAttendance, { ...payload });
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

function* watchLogin() {
  yield takeLatest(eventConstants.GET_ALL_EVENTS, getAllEventsSaga);
  yield takeLatest(eventConstants.GET_EVENT, getEventSaga);
  yield takeLatest(eventConstants.ADD_TO_MY_EVENT_LIST, addToMyEventList);
  yield takeLatest(
    eventConstants.REMOVE_FROM_MY_EVENT_LIST,
    removeFromMyEventList
  );
  yield takeLatest(eventConstants.GET_MY_EVENTS, getAllMyEvents);
  yield takeLatest(eventConstants.UPDATE_EVENT_STATUS, updateEventStatus);
  yield takeLatest(eventConstants.CREATE_CHANNEL_EVENT, createChannelEventSaga);
  yield takeLatest(eventConstants.GET_CHANNEL_EVENTS, getChannelEventsSaga);
  yield takeLatest(eventConstants.DELETE_EVENT, deleteEventSaga);
  yield takeLatest(eventConstants.UPDATE_CHANNEL_EVENT, updateChannelEventSaga);
  yield takeLatest(eventConstants.EVENT_CLAIM_CREDIT, claimEventCreditSaga);
  yield takeLatest(
    eventConstants.EVENT_CLAIM_ATTENDANCE,
    claimEventAttendanceSaga
  );
}

export const eventSaga = [fork(watchLogin)];
