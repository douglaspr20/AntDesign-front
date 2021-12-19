import { put, fork, takeLatest, call } from "redux-saga/effects";
import groupBy from "lodash/groupBy";
import omit from "lodash/omit";

import {
  constants as sessionConstants,
  actions as sessionActions,
} from "../actions/session-actions";
import { logout } from "../actions/auth-actions";
import { actions as homeActions } from "../actions/home-actions";
import {
  getAllSessions,
  getSessionsAddedbyUser,
  getParticipants,
  getSession,
  recommendedAgenda,
} from "../../api";

export function* getAllSessionsSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    let response = yield call(getAllSessions, { ...payload });

    if (response.status === 200) {
      const sessionData = Object.values(
        groupBy(response.data.conferences || [], "id")
      ).map((session) => {
        return session.reduce(
          (res, item) => ({
            ...res,
            ...omit(item, [
              "instructorid",
              "name",
              "image",
              "descriptionspeaker",
              "linkspeaker",
            ]),
            speakers: [
              ...(res.speakers || []),
              {
                id: item.instructorid,
                name: item.name,
                img: item.image,
                linkSpeaker: item.linkspeaker,
                description: item.descriptionspeaker,
              },
            ],
          }),
          {}
        );
      });
      yield put(sessionActions.setAllSessions(sessionData));
    }
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    }
  } finally {
    yield put(homeActions.setLoading(false));
    yield put(sessionActions.setMessageError("No Available Sessions Found"));
  }
}

export function* getSessionSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getSession, payload);

    if (response.status === 200) {
      yield put(sessionActions.setSession(response.data.conference));
    }

    yield put(homeActions.setLoading(false));
  } catch (error) {
    console.log(error);

    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* getSessionsAddedbyUserSaga({ payload }) {
  yield put(homeActions.setLoading(true));
  try {
    let response = yield call(getSessionsAddedbyUser, { ...payload });
    if (response.status === 200) {
      const sessionData = Object.values(
        groupBy(response.data.sessionsUser || [], "id")
      ).map((session) => {
        return session.reduce(
          (res, item) => ({
            ...res,
            ...omit(item, [
              "instructorid",
              "name",
              "image",
              "descriptionspeaker",
              "linkspeaker",
            ]),
            speakers: [
              ...(res.speakers || []),
              {
                id: item.instructorid,
                name: item.name,
                img: item.image,
                linkSpeaker: item.linkspeaker,
                description: item.descriptionspeaker,
              },
            ],
          }),
          {}
        );
      });

      yield put(sessionActions.setSessionsAddedByUser(sessionData));
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

export function* getParticipantsSaga({ payload }) {
  if (payload.page === 1) {
    yield put(homeActions.setLoading(true));
  } else {
    yield put(sessionActions.setSessionLoading(true));
  }

  try {
    let response = yield call(getParticipants, payload);
    if (response.status === 200) {
      yield put(sessionActions.setParticipants(response.data.participants));
    }
  } catch (error) {
    console.log(error);
    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    }
  } finally {
    yield put(homeActions.setLoading(false));
    yield put(sessionActions.setSessionLoading(false));
  }
}

export function* recommendedAgendaSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    let response = yield call(recommendedAgenda, { ...payload });

    if (response.status === 200) {
      const sessionData = Object.values(
        groupBy(response.data.recommendedAgenda || [], "id")
      ).map((session) => {
        return session.reduce(
          (res, item) => ({
            ...res,
            ...omit(item, [
              "instructorid",
              "name",
              "image",
              "descriptionspeaker",
              "linkspeaker",
            ]),
            speakers: [
              ...(res.speakers || []),
              {
                id: item.instructorid,
                name: item.name,
                img: item.image,
                linkSpeaker: item.linkspeaker,
                description: item.descriptionspeaker,
              },
            ],
          }),
          {}
        );
      });
      yield put(sessionActions.setRecommendedAgenda(sessionData));
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

function* watchSession() {
  yield takeLatest(sessionConstants.GET_ALL_SESSIONS, getAllSessionsSaga);
  yield takeLatest(sessionConstants.GET_SESSION, getSessionSaga);
  yield takeLatest(
    sessionConstants.GET_SESSIONS_ADDED_BY_USER,
    getSessionsAddedbyUserSaga
  );
  yield takeLatest(sessionConstants.GET_PARTICIPANTS, getParticipantsSaga);
  yield takeLatest(sessionConstants.RECOMMENDED_AGENDA, recommendedAgendaSaga);
}

export const sessionSaga = [fork(watchSession)];
