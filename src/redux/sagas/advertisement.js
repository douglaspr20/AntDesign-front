import { put, fork, call, takeLatest } from "redux-saga/effects";
import { notification } from "antd";

import {
  constants as advertisementConstants,
  actions as advertisementActions,
} from "redux/actions/advertisment-actions";

import {
  getAdvertisementsByPage,
  getAdvertisementByAdvertiser,
  createAdvertisement,
} from "../../api";

import { actions as homeActions } from "redux/actions/home-actions";

function* getAllAdvertisementsByPageSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
  } catch (error) {
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

function* getAllAdvertisementsByAdvertiserSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
  } catch (error) {
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

function* createAdvertisementSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(createAdvertisement, {
      ...payload,
    });

    if (response.status === 200) {
      notification.success({
        message: "Successfully rented advertisement.",
      });
    }
  } catch (error) {
    notification.error({
      message: "Failed to rent advertisement.",
    });
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

function* watchAdvertisementSaga() {
  yield takeLatest(
    advertisementConstants.GET_ADVERTISEMENTS_TODAY_BY_PAGE,
    getAllAdvertisementsByPageSaga
  );
  yield takeLatest(
    advertisementConstants.GET_ADVERTISEMENTS_BY_ADVERTISER,
    getAllAdvertisementsByAdvertiserSaga
  );
  yield takeLatest(
    advertisementConstants.CREATE_ADVERTISEMENT,
    createAdvertisementSaga
  );
}

export const advertisementSaga = [fork(watchAdvertisementSaga)];
