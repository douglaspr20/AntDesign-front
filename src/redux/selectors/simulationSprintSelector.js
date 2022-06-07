import { createSelector } from "reselect";

const simulationSprintDataSelector = (state) => state.simulationSprint;

const resultSelector = createSelector(
  simulationSprintDataSelector,
  (payload) => {
    return {
      allSimulationSprints: payload.get("allSimulationSprints"),
      simulationSprint: payload.get("simulationSprint"),
    };
  }
);

export const simulationSprintSelector = (state) => ({
  ...resultSelector(state),
});
