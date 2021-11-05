import { createAction } from 'redux-actions';

const CREATE_SKILL_COHORT_PARTICIPANT = 'CREATE_SKILL_COHORT_PARTICIPANT';
const GET_SKILL_COHORT_PARTICIPANT = 'GET_SKILL_COHORT_PARTICIPANT';
const GET_ALL_PARTICIPANT = 'GET_ALL_PARTICIPANT'
const GET_PARTICIPATED = 'GET_PARTICIPATED';
const SET_SKILL_COHORT_PARTICIPANT = 'SET_SKILL_COHORT_PARTICIPANT';
const SET_ALL_SKILL_COHORT_PARTICIPANTS = 'SET_ALL_SKILL_COHORT_PARTICIPANTS';

export const constants = {
	GET_SKILL_COHORT_PARTICIPANT,
	CREATE_SKILL_COHORT_PARTICIPANT,
	SET_SKILL_COHORT_PARTICIPANT,
	GET_PARTICIPATED,
	SET_ALL_SKILL_COHORT_PARTICIPANTS,
  GET_ALL_PARTICIPANT
};

const getSkillCohortParticipant = createAction(GET_SKILL_COHORT_PARTICIPANT, (SkillCohortId, UserId) => ({
	SkillCohortId,
	UserId,
}));
const getAllParticipated = createAction(GET_PARTICIPATED, (UserId) => ({ UserId }));
const setSkillCohortParticipant = createAction(SET_SKILL_COHORT_PARTICIPANT, (skillCohortParticipant) => ({
	skillCohortParticipant,
}));
const setAllSkillCohortParticipants = createAction(SET_ALL_SKILL_COHORT_PARTICIPANTS, (allSkillCohortParticipants) => ({
	allSkillCohortParticipants,
}));
const createSkillCohortParticipant = createAction(CREATE_SKILL_COHORT_PARTICIPANT, (SkillCohortId, UserId) => ({
	SkillCohortId,
	UserId,
}));
const getAllSkillCohortParticipants = createAction(GET_ALL_PARTICIPANT, (SkillCohortId) => ({ SkillCohortId }))

export const actions = {
	getSkillCohortParticipant,
	createSkillCohortParticipant,
	setSkillCohortParticipant,
	getAllParticipated,
	setAllSkillCohortParticipants,
  getAllSkillCohortParticipants
};
