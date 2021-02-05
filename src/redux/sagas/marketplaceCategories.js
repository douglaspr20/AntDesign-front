import { put, fork, takeLatest, call } from "redux-saga/effects";

import {
  constants as marketplaceCategoriesConstants,
  actions as marketplaceCategoriesActions,
} from "../actions/marketplaceCategories-actions";
import { actions as homeActions } from "../actions/home-actions";

import { getAllMarketplaceCategories } from "../../api";

export function* getAllMarketplaceCategoriesSaga() {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getAllMarketplaceCategories);

    if (response.status === 200) {
      yield put(marketplaceCategoriesActions.setAllMarketplaceCategories(response.data));
    }

    yield put(homeActions.setLoading(false));
  } catch (error) {
    console.log(error.message);
    yield put(homeActions.setLoading(false));
  }
}

function* watchMarketplaceCategories() {
  yield takeLatest(marketplaceCategoriesConstants.GET_ALL_MARKETPLACE_CATEGORIES, getAllMarketplaceCategoriesSaga);
}

export const marketplaceCategoriesSaga = [fork(watchMarketplaceCategories)];
