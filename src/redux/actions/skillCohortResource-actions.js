import { createAction } from 'redux-actions';

const GET_ALL_RESOURCE = 'GET_ALL_RESOURCE';
const GET_RESOURCE = 'GET_RESOURCE';
const SET_ALL_RESOURCE = 'SET_ALL_RESOURCE';
const SET_RESOURCE = 'SET_RESOURCE';

export const constants = {
	GET_ALL_RESOURCE,
	GET_RESOURCE,
	SET_ALL_RESOURCE,
	SET_RESOURCE,
};

export const getAllSkillCohortResources = createAction(GET_ALL_RESOURCE, (SkillCohortId, filter) => ({
	SkillCohortId,
	filter,
}));
export const getSkillCohortResource = createAction(GET_RESOURCE, (id) => ({ id }));
export const setAllSkillCohortResources = createAction(SET_ALL_RESOURCE, (allSkillCohortResources) => ({
	allSkillCohortResources,
}));
export const setSkillCohortResource = createAction(SET_RESOURCE, (skillCohortResource) => ({ skillCohortResource }));

export const actions = {
	getAllSkillCohortResources,
	getSkillCohortResource,
	setAllSkillCohortResources,
	setSkillCohortResource,
};
