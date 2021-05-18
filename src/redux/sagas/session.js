import { put, fork, takeLatest, call } from "redux-saga/effects";
import groupBy from "lodash/groupBy";
import omit from "lodash/omit";

import {
  constants as sessionConstants,
  actions as sessionActions,
} from "../actions/session-actions";
import { actions as homeActions } from "../actions/home-actions";
import { getAllSessions } from "../../api";

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
              "firstName",
              "lastName",
              "email",
              "img",
              "usertitle",
            ]),
            speakers: [
              ...(res.speakers || []),
              {
                id: item.userid,
                firstName: item.firstName,
                lastName: item.lastName,
                email: item.email,
                img: item.img,
                title: item.usertitle,
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
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

function* watchSession() {
  yield takeLatest(sessionConstants.GET_ALL_SESSIONS, getAllSessionsSaga);
}

export const sessionSaga = [fork(watchSession)];
