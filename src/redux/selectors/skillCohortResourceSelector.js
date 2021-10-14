import { createSelector } from 'reselect'

const skillCohortResourceDataSelector = state => state.skillCohortResource

const resultSelector = createSelector(skillCohortResourceDataSelector, (payload) => {
    return {
        allSkillCohortResources: payload.get("allSkillCohortResources"),
        skillCohortResource: payload.get("skillCohortResource")
    }
})

export const skillCohortResourceSelector = state => ({
    ...resultSelector(state)
})