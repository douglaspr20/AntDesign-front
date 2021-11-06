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
              "userid",
              "name",
              "image",
              "descriptionspeaker",
              "linkspeaker",
            ]),
            speakers: [
              ...(res.speakers || []),
              {
                id: item.userid,
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
  }
}

export function* getSessionsAddedbyUserSaga({ payload }) {
  yield put(homeActions.setLoading(true));
  try {
    let response = yield call(getSessionsAddedbyUser, { ...payload });
    if (response.status === 200) {
      const sessionData = response.data.sessionsUser.map((session) => session);

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
  yield put(homeActions.setLoading(true));
  try {
    let response = yield call(getParticipants, { ...payload });
    if (response.status === 200) {
      const participants = response.data.participants.map(
        (participant) => participant
      );

      yield put(sessionActions.setParticipants(participants));
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
  yield takeLatest(
    sessionConstants.GET_SESSIONS_ADDED_BY_USER,
    getSessionsAddedbyUserSaga
  );
  yield takeLatest(sessionConstants.GET_PARTICIPANTS, getParticipantsSaga);
}

export const sessionSaga = [fork(watchSession)];
