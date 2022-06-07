import { handleActions } from "redux-actions";
import { Map } from "immutable";

import { constants as simulationSprintsConstants } from "../actions/simulationSprint-actions";

export const reducers = {
  [simulationSprintsConstants.SET_ALL_SIMULATION_SPRINTS]: (
    state,
    { payload }
  ) => {
    return state.merge({ ...payload });
  },
  [simulationSprintsConstants.SET_SIMULATION_SPRINT]: (state, { payload }) => {
    return state.merge({ ...payload });
  },
};

export const initialState = () => {
  return Map({
    allSimulationSprints: [],
    simulationSprint: {},
  });
};

export default handleActions(reducers, initialState());
