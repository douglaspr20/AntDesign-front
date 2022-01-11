import { call, fork, put, takeLatest } from "redux-saga/effects";

import {
  constants as businessPartnerConstants,
  actions as businessPartnerActions,
} from "../actions/business-partner-actions";
// import { actions as authActions } from "../actions/auth-actions";

import {
  createBusinessPartnerResourceFromAPI,
  getBusinessPartnerMembersFromAPI,
  getBusinessPartnerResourceByIdFromAPI,
  getBusinessPartnerResourcesFromAPI,
} from "../../api";

export function* getBusinessPartnerMemberSagas() {
  try {
    const response = yield call(getBusinessPartnerMembersFromAPI);
    if (response.status === 200) {
      const { businessPartnerMembers } = response.data;

      yield put(businessPartnerActions.setBusinessPartnerMembers(businessPartnerMembers));
    }
  } catch (error) {
    if (error && error.response && error.response.status === 401) {
      yield put(businessPartnerActions.logout());
    }
  }
}

export function* getBusinessPartnerResourcesSagas() {
  try {
    const response = yield call(getBusinessPartnerResourcesFromAPI);
    if (response.status === 200) {
      const { businessResources } = response.data;
      yield put(businessPartnerActions.setBusinessPartnerResources(businessResources));
    }
  } catch (error) {
    if (error && error.response && error.response.status === 401) {
      yield put(businessPartnerActions.logout());
    }
  }
}

export function* getBusinessPartnerResounceByIdSagas({ payload }) {
  try {
    const response = yield call(getBusinessPartnerResourceByIdFromAPI, { ...payload });
    if (response.status === 200) {
      const { businessPartnerResource } = response.data;
      yield put(businessPartnerActions.setBusinessPartnerResource(businessPartnerResource));
    }
  } catch (error) {
    if (error && error.response && error.response.status === 401) {
      yield put(businessPartnerActions.logout());
    }
  }
}

export function* updateBusinessPartnerResourcesSagas({ payload }) {
  try {
    let response = yield call(getBusinessPartnerResourcesFromAPI, { ...payload });

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
  }
}

export function* createBusinessPartnerResourceSagas({ payload }) {
  try {
    const response = yield call(createBusinessPartnerResourceFromAPI, {
      ...payload.businessPartner,
    });
    if (response.status === 200) {
      if (payload.callback) {
        payload.callback();
      }
      const response = yield call(getBusinessPartnerResourcesFromAPI);
      const { businessPartnerResources } = response.data;
      yield put(
        businessPartnerActions.updateBusinessPartnerResourcesInformation(businessPartnerResources)
      );
    }
  } catch (error) {
    console.log(error);
    if (payload.callback) {
      payload.callback(error);
    }
  } finally {
    yield getBusinessPartnerResourcesSagas();
  }
}

function* watchBusinessPartner() {
  yield takeLatest(businessPartnerConstants.GET_BUSINESS_PARTNER_MEMBERS, getBusinessPartnerMemberSagas);
  yield takeLatest(
    businessPartnerConstants.UPDATE_BUSINESS_PARTNER_RESOURCES_INFORMATION,
    updateBusinessPartnerResourcesSagas
  );
  yield takeLatest(
    businessPartnerConstants.GET_BUSINESS_PARTNER_RESOURCES,
    getBusinessPartnerResourcesSagas
  );
  yield takeLatest(
    businessPartnerConstants.CREATE_BUSINESS_PARTNER_RESOURCE,
    createBusinessPartnerResourceSagas
  );
  yield takeLatest(
    businessPartnerConstants.GET_BUSINESS_PARTNER_RESOURCE,
    getBusinessPartnerResounceByIdSagas
  );
}

export const businessPartnerSaga = [fork(watchBusinessPartner)];
