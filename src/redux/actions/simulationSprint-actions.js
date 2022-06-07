import { createAction } from "redux-actions";

const GET_ALL_SIMULATION_SPRINTS = "GET_ALL_SIMULATION_SPRINTS";
const SET_ALL_SIMULATION_SPRINTS = "SET_ALL_SIMULATION_SPRINTS";
const GET_SIMULATION_SPRINT = "GET_SIMULATION_SPRINT";
const SET_SIMULATION_SPRINT = "SET_SIMULATION_SPRINT";

export const constants = {
  GET_ALL_SIMULATION_SPRINTS,
  SET_ALL_SIMULATION_SPRINTS,
  GET_SIMULATION_SPRINT,
  SET_SIMULATION_SPRINT,
};

export const getAllSimulationSprints = createAction(GET_ALL_SIMULATION_SPRINTS);
export const setAllSimulationSprints = createAction(
  SET_ALL_SIMULATION_SPRINTS,
  (allSimulationSprints) => ({ allSimulationSprints })
);
export const getSimulationSprint = createAction(
  GET_SIMULATION_SPRINT,
  (id, callback) => ({
    id,
    callback,
  })
);
export const setSimulationSprint = createAction(
  SET_SIMULATION_SPRINT,
  (simulationSprint) => ({
    simulationSprint,
  })
);

export const actions = {
  getAllSimulationSprints,
  setAllSimulationSprints,
  getSimulationSprint,
  setSimulationSprint,
};
