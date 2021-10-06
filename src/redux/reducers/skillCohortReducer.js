import { handleActions } from 'redux-actions'
import { Map } from 'immutable'

import { constants as skillCohortConstants } from '../actions/skillCohort-actions'

export const reducers = {
    [skillCohortConstants.SET_SKILL_COHORT]: (state, { payload }) => {
        return state.merge({ ...payload })
    },
    [skillCohortConstants.SET_ALL_SKILL_COHORT]: (state, { payload }) => {
        return state.merge({ ...payload })
    }
}

export const initialState = () => {
    return Map({
        allSkillCohorts: [],
        skillCohort: {}
    })
}

export default handleActions(reducers, initialState())