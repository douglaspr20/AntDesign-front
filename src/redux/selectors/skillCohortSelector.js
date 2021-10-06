import { createSelector } from 'reselect'

const skillCohortDataSelector = state => state.skillCohort

const resultSelector = createSelector(skillCohortDataSelector, payload => {
    return {
        allSkillCohorts: payload.get("allSkillCohorts"),
        skillCohort: payload.get("skillCohort")
    }
})

export const skillCohortSelector = state => ({
    ...resultSelector(state),
})