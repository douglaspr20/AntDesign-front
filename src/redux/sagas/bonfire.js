import { put, fork, takeLatest, call } from "redux-saga/effects";
import groupBy from "lodash/groupBy";
import omit from "lodash/omit";

import {
  constants as bonfireConstants,
  actions as bonfireActions,
} from "../actions/bonfire-actions";
import { actions as homeActions } from "../actions/home-actions";
import {
  createBonfire,
  getAllBonfires,
  getUserFromId,
  updateBonfire,
  deleteBonfire,
} from "../../api";

export function* createBonfireSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    let response = yield call(createBonfire, { ...payload.bonfire });
    if (response.status === 200) {
      if (payload.callback) {
        payload.callback();
      }

      const response = yield call(getUserFromId);
      const { user } = response.data;
      yield put(
        homeActions.updateUserInformation({
          ...user,
        })
      );
    }
  } catch (error) {
    console.log(error);
    if (payload.callback) {
      payload.callback(error);
    }
  } finally {
    yield getAllBonfiresSaga();
    yield put(homeActions.setLoading(false));
  }
}

export function* getAllBonfiresSaga() {
  yield put(homeActions.setLoading(true));

  try {
    let response = yield call(getAllBonfires);
    if (response.status === 200) {
      const bonfiresData = Object.values(
        groupBy(response.data.bonfires || [], "id")
      ).map((bonfire) => {
        return bonfire.reduce(
          (res, item) => ({
            ...res,
            ...omit(item, ["createdAt", "updatedAt"]),
          }),
          {}
        );
      });

      yield put(bonfireActions.setBonfires(bonfiresData));
    }
  } catch (error) {
    console.log(error);
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* updateBonfireSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    let response = yield call(updateBonfire, { ...payload });

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

export function* deleteBonfireSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    let response = yield call(deleteBonfire, { ...payload });

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

function* watchSession() {
  yield takeLatest(bonfireConstants.CREATE_BONFIRE, createBonfireSaga);
  yield takeLatest(bonfireConstants.GET_BONFIRES, getAllBonfiresSaga);
  yield takeLatest(bonfireConstants.UPDATE_BONFIRE, updateBonfireSaga);
  yield takeLatest(bonfireConstants.DELETE_BONFIRE, deleteBonfireSaga);
}

export const bonfireSaga = [fork(watchSession)];
