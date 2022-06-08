import { put, fork, call, takeLatest } from "redux-saga/effects";

import { createSimulationSprintParticipant } from "../../api";

import { constants as simulationSprintParticipantsConstants } from "redux/actions/simulationSprintParticipant-action";

import { actions as homeActions } from "redux/actions/home-actions";

export function* createSimulationSprintParticipantSaga({ payload }) {
  yield put(homeActions.setLoading(true));

  try {
    const response = yield call(createSimulationSprintParticipant, {
      ...payload,
    });

    if (response.status === 200) {
    }
  } catch (error) {
    console.log(error);
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

function* watchParticipant() {
  yield takeLatest(
    simulationSprintParticipantsConstants.CREATE_SIMULATION_SPRINT_PARTICIPANT,
    createSimulationSprintParticipantSaga
  );
}

export const simulationSprintParticipantSaga = [fork(watchParticipant)];
