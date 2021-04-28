import { put, fork, takeLatest, call } from "redux-saga/effects";

import {
  constants as categoryConstants,
  actions as categoryActions,
} from "../actions/channel-category-actions";
import { actions as homeActions } from "../actions/home-actions";
import { getChannelCategories } from "../../api";

export function* getCategoriesSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getChannelCategories, { ...payload });

    if (response.status === 200) {
      yield put(categoryActions.setCategories(response.data.categories));
    }
  } catch (error) {
    console.log(error);
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

function* watchChannelCategory() {
  yield takeLatest(categoryConstants.GET_CATEGORIES, getCategoriesSaga);
}

export const channelCategorySaga = [fork(watchChannelCategory)];
