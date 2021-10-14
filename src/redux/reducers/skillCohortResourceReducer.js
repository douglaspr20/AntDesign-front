import { handleActions } from 'redux-actions'
import { Map } from 'immutable'

import { constants as resourcesConstants } from '../actions/skillCohortResource-actions'

const reducers = {
    [resourcesConstants.SET_ALL_RESOURCE]: (state, { payload }) => {
        return state.merge({ ...payload })
    },
    [resourcesConstants.SET_RESOURCE]: (state, { payload }) => {
        return state.merge({ ...payload })
    }
}

export const initialState = () => {
    return Map({
        allSkillCohortResources: [],
        skillCohortResource: {},
    })
}

export default handleActions(reducers, initialState())