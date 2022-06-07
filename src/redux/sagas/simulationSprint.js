import { put, fork, takeLatest, call } from "redux-saga/effects";

import {
  constants as simulationSprintsConstants,
  actions as simulationSprintsActions,
} from "../actions/simulationSprint-actions";
import { actions as homeActions } from "../actions/home-actions";

import { getAllSimulationSprints, getSimulationSprint } from "../../api";

export function* getAllSimulationSprintsSaga() {
  yield put(homeActions.setLoading(true));
  try {
    const response = yield call(getAllSimulationSprints);

    if (response.status === 200) {
      yield put(
        simulationSprintsActions.setAllSimulationSprints(
          response.data.simulationSprints
        )
      );
    }
  } catch (error) {
    console.log(error);
  } finally {
    yield put(homeActions.setLoading(false));
  }
}

export function* getSimulationSprintsSaga({ payload }) {
  yield put(homeActions.setLoading(true));
  try {
    const response = yield call(getSimulationSprint, { ...payload });

    if (response.status === 200) {
      yield put(
        simulationSprintsActions.setSimulationSprint(
          response.data.simulationSprint
        )
      );

      if (payload.callback) {
        payload.callback();
      }
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

function* watchSimulationSprints() {
  yield takeLatest(
    simulationSprintsConstants.GET_ALL_SIMULATION_SPRINTS,
    getAllSimulationSprintsSaga
  );

  yield takeLatest(
    simulationSprintsConstants.GET_SIMULATION_SPRINT,
    getSimulationSprintsSaga
  );
}

export const simulationSprintsSaga = [fork(watchSimulationSprints)];
