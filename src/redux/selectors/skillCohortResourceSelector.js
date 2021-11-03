import { createSelector } from "reselect";

const skillCohortResourceDataSelector = (state) => state.skillCohortResource;

const resultSelector = createSelector(
  skillCohortResourceDataSelector,
  (payload) => {
    return {
      allSkillCohortResources: payload.get("allSkillCohortResources"),
      skillCohortResource: payload.get("skillCohortResource"),
      countOfResults: payload.get("countOfResults"),
      currentPage: payload.get("currentPage"),
      loading: payload.get("loading")
    };
  }
);

export const skillCohortResourceSelector = (state) => ({
  ...resultSelector(state),
});
