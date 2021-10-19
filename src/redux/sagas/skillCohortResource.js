import { put, fork, call, takeLatest } from 'redux-saga/effects';

import { constants as resourcesConstants, actions as resourcesActions } from '../actions/skillCohortResource-actions';
import { actions as homeActions } from '../actions/home-actions';

import { getAllResources, getResource } from '../../api';

export function* getAllResourceSaga({ payload }) {
	yield put(homeActions.setLoading(true));

	try {
		const response = yield call(getAllResources, { ...payload });

		if (response.status === 200) {
			yield put(resourcesActions.setAllSkillCohortResources(response.data.skillCohortResources));
		}
	} catch (error) {
		console.log(error);
	} finally {
		yield put(homeActions.setLoading(false));
	}
}

export function* getResourceSaga({ payload }) {
	yield put(homeActions.setLoading(true));

	try {
		const response = yield call(getResource, { ...payload });

		if (response.status === 200) {
			yield put(resourcesActions.setSkillCohortResource(response.data.skillCohortResource));
		}
	} catch (error) {
		console.log(error);
	} finally {
		yield put(homeActions.setLoading(false));
	}
}

function* watchResourceSaga() {
	yield takeLatest(resourcesConstants.GET_ALL_RESOURCE, getAllResourceSaga);
	yield takeLatest(resourcesConstants.GET_RESOURCE, getResourceSaga);
}

export const skillCohortResourceSaga = [fork(watchResourceSaga)];
