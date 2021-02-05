import { put, fork, takeLatest, call } from "redux-saga/effects";

import {
  constants as marketplaceConstants,
  actions as marketplaceActions,
} from "../actions/marketplace-actions";
import { actions as homeActions } from "../actions/home-actions";

import { getAllMarketplace } from "../../api";

export function* getAllMarketplaceSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getAllMarketplace, payload);

    if (response.status === 200) {
      yield put(marketplaceActions.setAllMarketplace(response.data));
    }

    yield put(homeActions.setLoading(false));
  } catch (error) {
    console.log(error.message);
    yield put(homeActions.setLoading(false));
  }
}

function* watchMarketplace() {
  yield takeLatest(marketplaceConstants.GET_ALL_MARKETPLACE, getAllMarketplaceSaga);
}

export const marketplaceSaga = [fork(watchMarketplace)];
