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
  getAdvertisementById,
  getAllActiveAdvertisements,
} from "../../api";

import { actions as homeActions } from "redux/actions/home-actions";

function* getAllAdvertisementsByPageSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getAdvertisementsByPage, { ...payload });

    if (response.status === 200) {
      yield put(
        advertisementActions.setAdvertisementsTodayByPage(
          response.data.advertisement,
          payload.page
        )
      );
    }
  } catch (error) {
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

function* getAllAdvertisementsByAdvertiserSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getAdvertisementByAdvertiser, { ...payload });

    if (response.status === 200) {
      yield put(
        advertisementActions.setAdvertisementsByAdvertiser(
          response.data.advertisements
        )
      );
    }
  } catch (error) {
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

function* getAllActiveAdvertisementsSaga() {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getAllActiveAdvertisements);

    if (response.status === 200) {
      yield put(
        advertisementActions.setAllActiveAdvertisements(
          response.data.advertisements
        )
      );
    }
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
      yield put(
        advertisementActions.setCreatedAdvertisement(
          response.data.advertisement
        )
      );

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

function* getAdvertisementByIdSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getAdvertisementById, { ...payload });

    if (response.status === 200) {
      yield put(
        advertisementActions.setAllActiveAdvertisements(
          response.data.advertisement
        )
      );
    }
  } catch (error) {
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
  yield takeLatest(
    advertisementConstants.GET_ADVERTISEMENT_BY_ID,
    getAdvertisementByIdSaga
  );
  yield takeLatest(
    advertisementConstants.GET_ALL_ACTIVE_ADVERTISEMENTS,
    getAllActiveAdvertisementsSaga
  );
}

export const advertisementSaga = [fork(watchAdvertisementSaga)];
