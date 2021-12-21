import { put, fork, takeLatest, call } from "redux-saga/effects";

import {
  constants as marketlaceProfileConstants,
  actions as marketplaceProfileActions,
} from "../actions/marketplaceProfile-actions";
import { logout } from "../actions/auth-actions";
import { actions as homeActions } from "../actions/home-actions";
import {
  createMarketplaceProfile,
  getMarketplaceProfiles,
  getMarketplaceProfile,
  updateMarketplaceProfile,
} from "../../api";

export function* createMarketplaceProfileSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    let response = yield call(createMarketplaceProfile, {
      ...payload,
    });
    if (response.status === 200) {
      const response = yield call(getMarketplaceProfile, payload.UserId);
      const { marketplaceProfile } = response.data;
      yield put(
        marketplaceProfileActions.setMarketPlaceProfile({
          ...marketplaceProfile,
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

export function* getMarketplaceProfilesSaga() {
  yield put(homeActions.setLoading(true));

  try {
    let response = yield call(getMarketplaceProfiles);
    if (response.status === 200) {
      yield put(
        marketplaceProfileActions.setMarketPlaceProfiles(
          response.data.marketplaceProfiles
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

export function* getMarketplaceProfileSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    let response = yield call(getMarketplaceProfile, { ...payload });

    if (response.status === 200) {
      yield put(
        marketplaceProfileActions.setMarketPlaceProfile(
          response.data.marketPlaceProfile
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

export function* updateMarketplaceProfileSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    let response = yield call(updateMarketplaceProfile, { ...payload });

    if (response.status === 200) {
      yield call(getMarketplaceProfile, {
        id: response.data.affectedRows.UserId,
      });
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
  yield takeLatest(
    marketlaceProfileConstants.CREATE_MARKETPLACE_PROFILE,
    createMarketplaceProfileSaga
  );
  yield takeLatest(
    marketlaceProfileConstants.GET_MARKETPLACE_PROFILES,
    getMarketplaceProfilesSaga
  );
  yield takeLatest(
    marketlaceProfileConstants.GET_MARKETPLACE_PROFILE,
    getMarketplaceProfileSaga
  );
  yield takeLatest(
    marketlaceProfileConstants.UPDATE_MARKETPLACE_PROFILE,
    updateMarketplaceProfileSaga
  );
}

export const marketplaceProfileSaga = [fork(watchSession)];
