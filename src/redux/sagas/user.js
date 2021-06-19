import { put, fork, takeLatest, call } from "redux-saga/effects";
import { notification } from "antd";

import {
  constants as homeConstants,
  actions as homeActions,
} from "../actions/home-actions";
import {
  getUserFromId,
  updateUser,
  upgradePlan,
  inviteFriend,
  attendToGlobalConference,
  addSession,
  removeSession,
  uploadResume,
  deleteResume,
} from "../../api";

const defaultUserInfo = {
  firstName: "",
  lastName: "",
  company: "",
  abbrName: "",
  img: null,
  about: "",
  titleProfessions: "",
  topicsOfInterest: [],
  personalLinks: {},
  language: "",
  timezone: "",
  completed: false,
  percentOfCompletion: 0,
};

export function* getUser() {
  yield put(homeActions.updateUserInformation(defaultUserInfo));
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getUserFromId);
    const { user } = response.data;

    yield put(
      homeActions.updateUserInformation({
        ...defaultUserInfo,
        ...user,
      })
    );
    yield put(homeActions.setLoading(false));
  } catch (error) {
    console.log(error);
    yield put(homeActions.setLoading(false));
  }
}

export function* putUser({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(updateUser, { ...payload });

    if (response.status === 200) {
      const { affectedRows: user } = response.data;

      yield put(
        homeActions.updateUserInformation({
          ...defaultUserInfo,
          ...user,
        })
      );
    }
    yield put(homeActions.setLoading(false));
  } catch (error) {
    notification.error({
      message: "User profile was not updated",
      description: error.response.data.msg,
    });
    yield put(homeActions.setLoading(false));
  }
}

export function* upgradeUserPlan({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(upgradePlan, { ...payload });

    if (response.status === 200) {
      const { affectedRows: user } = response.data;

      yield put(
        homeActions.updateUserInformation({
          ...defaultUserInfo,
          ...user,
        })
      );
    }
    yield put(homeActions.setLoading(false));
  } catch (error) {
    console.log(error);
    yield put(homeActions.setLoading(false));
  }
}

export function* sendInvitationEmail({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(inviteFriend, payload.email);

    if (response.status === 200) {
      if (payload.callback) {
        payload.callback(false);
      }
    }
  } catch (error) {
    console.log(error);
    if (payload.callback) {
      payload.callback(true);
    }
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* attendToGlobalConferenceSaga() {
  try {
    const response = yield call(attendToGlobalConference);

    if (response.status === 200) {
      yield put(homeActions.updateUserInformation(response.data.user));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* addSessionSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(addSession, { ...payload });

    if (response.status === 200) {
      yield put(homeActions.updateUserInformation(response.data.user));
    }
  } catch (error) {
    console.log(error);
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* removeSessionSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(removeSession, { ...payload });

    if (response.status === 200) {
      yield put(homeActions.updateUserInformation(response.data.user));
    }
  } catch (error) {
    console.log(error);
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* uploadResumeSaga({ payload }) {
  try {
    const response = yield call(uploadResume, { ...payload });

    if (response.status === 200) {
      yield put(homeActions.updateUserInformation(response.data.user));
      if (payload.callback) {
        payload.callback("");
      }
    }
  } catch (error) {
    console.log(error);
    if (payload.callback) {
      payload.callback(error);
    }
  }
}

export function* deleteResumeSaga({ payload }) {
  try {
    const response = yield call(deleteResume, { ...payload });

    if (response.status === 200) {
      yield put(homeActions.updateUserInformation(response.data.user));
      if (payload.callback) {
        payload.callback("");
      }
    }
  } catch (error) {
    console.log(error);
    if (payload.callback) {
      payload.callback(error);
    }
  }
}

function* watchLogin() {
  yield takeLatest(homeConstants.GET_USER, getUser);
  yield takeLatest(homeConstants.UPDATE_USER, putUser);
  yield takeLatest(homeConstants.UPGRADE_PLAN, upgradeUserPlan);
  yield takeLatest(homeConstants.INVITE_FRIEND, sendInvitationEmail);
  yield takeLatest(
    homeConstants.ATTEND_TO_GLOBAL_CONFERENCE,
    attendToGlobalConferenceSaga
  );
  yield takeLatest(homeConstants.ADD_SESSION, addSessionSaga);
  yield takeLatest(homeConstants.REMOVE_SESSION, removeSessionSaga);
  yield takeLatest(homeConstants.UPLOAD_RESUME, uploadResumeSaga);
  yield takeLatest(homeConstants.DELETE_RESUME, deleteResumeSaga);
}

export const userSaga = [fork(watchLogin)];
