import { put, fork, takeLatest, call } from "redux-saga/effects";
import groupBy from "lodash/groupBy";
import omit from "lodash/omit";

import {
  constants as bonfireConstants,
  actions as bonfireActions,
} from "../actions/bonfire-actions";
import { actions as homeActions } from "../actions/home-actions";
import { createBonfire, getAllBonfires } from "../../api";

export function* createBonfireSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    let response = yield call(createBonfire, { ...payload });

    if (response.status === 200) {
      if (payload.callback) {
        payload.callback();
      }
    }
  } catch (error) {
    console.log(error);
    if (payload.callback) {
      payload.callback(error);
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* getAllBonfiresSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    let response = yield call(getAllBonfires);
    if (response.status === 200) {
      //   const bonfiresData = Object.values(
      //     groupBy(response.data.conferences || [], "id")
      //   ).map((session) => {
      //     return session.reduce(
      //       (res, item) => ({
      //         ...res,
      //         ...omit(item, [
      //           "userid",
      //           "name",
      //           "image",
      //           "linkspeaker",
      //           "descriptionspeaker",
      //         ]),
      //         speakers: [
      //           ...(res.speakers || []),
      //           {
      //             id: item.userid,
      //             name: item.name,
      //             img: item.image,
      //             link: item.linkspeaker,
      //             description: item.descriptionspeaker,
      //           },
      //         ],
      //       }),
      //       {}
      //     );
      //   });
      //   yield put(bonfireActions.setBonfires(bonfiresData));
    }
  } catch (error) {
    console.log(error);
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

function* watchSession() {
  yield takeLatest(bonfireConstants.CREATE_BONFIRE, createBonfireSaga);
  yield takeLatest(bonfireConstants.GET_BONFIRES, getAllBonfiresSaga);
}

export const sessionSaga = [fork(watchSession)];
