import { put, fork, takeLatest, call } from "redux-saga/effects";
import { notification } from "antd";

import { actions as speakerActions, constants as speakerConstans } from "redux/actions/speaker-actions";
import {
    actions as homeActions,
  } from "../actions/home-actions";
import {
    addPanelSpeakersEndPoint,
    allPanelSpeakersEndPonit,
    getAllUserSpeakerEndPoint,
    removeUserSpeakerToPanelEndPoint,
    addUserSpeakerToPanelEndPoint
} from "../../api";

export function* addPanelSpeakerSaga({ payload }) {

    const {panels} = payload
    yield put(homeActions.setLoading(true));
  
    try {
      const response = yield call(addPanelSpeakersEndPoint, { panels });
      
      if (response.status === 200) {
        const { panelsSpeakers } = response.data;

        yield put(
          speakerActions.updatePanelSpeakers({
            panelsSpeakers
          })
        );

        if (payload.callback) {
          payload.callback();
        }

        notification.success({
          message: "Panel add successflly",
        });
      }
    } catch (error) {
        notification.error({
          message: "there are a error",
          description: error.response.data.msg,
        });
    } finally {
      yield put(homeActions.setLoading(false));
    }
}

export function* getPanelSpeakerSaga({ payload }) {
  const {UserId} = payload

  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(allPanelSpeakersEndPonit, { UserId });

    if (response.status === 200) {
      const { panelsSpeakers } = response.data;

      yield put(
        speakerActions.updatePanelSpeakers({
          panelsSpeakers
        })
      );
    }
  } catch (error) {
      notification.error({
        message: "there are a error",
        description: error.response.data.msg,
      });
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* getAllUserSpeakerSaga({payload}) {
  const {UserId} = payload

  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(getAllUserSpeakerEndPoint, { UserId });

    if (response.status === 200) {
      const { userSpeakers } = response.data;

      yield put(
        speakerActions.updateAllUserSpeakers({
          userSpeakers
        })
      );
      yield put(homeActions.setLoading(false));
    }
  } catch (error) {
      notification.error({
        message: "there are a error",
        description: error.response.data.msg,
      });
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* removeUserSpeakerToPanelSaga({ payload }) {

  const {UserId} = payload

  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(removeUserSpeakerToPanelEndPoint, { UserId });

    if (response.status === 200) {
      if (payload.callback) {
        payload.callback();
      }

      notification.success({
        message: "Panel remove successflly",
      });
    }
  } catch (error) {
      notification.error({
        message: "there are a error",
        description: error.response.data.msg,
      });
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* addUserSpeakerToSaga({ payload }) {
  const {data} = payload

  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(addUserSpeakerToPanelEndPoint, { data });

    if (response.status === 200) {
      const { panelsSpeakers } = response.data;
      
      yield put(
        speakerActions.updatePanelSpeakers({
          panelsSpeakers
        })
      );

      if (payload.callback) {
        payload.callback();
      }

      notification.success({
        message: "User add successflly",
      });
    }
  } catch (error) {
      notification.error({
        message: "there are a error",
        description: error.response.data.msg,
      });
  } finally {
    yield put(homeActions.setLoading(false));
  }
}


function* watchLogin() {
    yield takeLatest(speakerConstans.ADD_PANEL_SPEAKERS, addPanelSpeakerSaga);
    yield takeLatest(speakerConstans.GET_PANEL_SPEAKERS, getPanelSpeakerSaga);
    yield takeLatest(speakerConstans.GET_USERS_SPEAKERS, getAllUserSpeakerSaga);
    yield takeLatest(speakerConstans.REMOVE_USERS_PANEL, removeUserSpeakerToPanelSaga);
    yield takeLatest(speakerConstans.ADD_SPEAKER_TO_PANEL, addUserSpeakerToSaga);
}
  
export const speakerSaga = [fork(watchLogin)];