import { createAction } from 'redux-actions'

const CREATE_SKILL_COHORT_PARTICIPANT = "CREATE_SKILL_COHORT_PARTICIPANT"
const GET_SKILL_COHORT_PARTICIPANT = "GET_SKILL_COHORT_PARTICIPANT"
const GET_ALL_SKILL_COHORT_PARTICIPANTS = "GET_ALL_SKILL_COHORT_PARTICIPANTS"
const SET_SKILL_COHORT_PARTICIPANT = "SET_SKILL_COHORT_PARTICIPANT"
const SET_ALL_SKILL_COHORT_PARTICIPANTS = "SET_ALL_SKILL_COHORT_PARTICIPANTS"

export const constants = {
    GET_SKILL_COHORT_PARTICIPANT,
    CREATE_SKILL_COHORT_PARTICIPANT,
    SET_SKILL_COHORT_PARTICIPANT,
    GET_ALL_SKILL_COHORT_PARTICIPANTS,
    SET_ALL_SKILL_COHORT_PARTICIPANTS
}

const getSkillCohortParticipant = createAction(GET_SKILL_COHORT_PARTICIPANT, (SkillCohortId, UserId) => ({ SkillCohortId, UserId }))
const getAllSkillCohortParticipants = createAction(GET_ALL_SKILL_COHORT_PARTICIPANTS, (UserId) => ({ UserId }))
const setSkillCohortParticipant = createAction(SET_SKILL_COHORT_PARTICIPANT, (skillCohortParticipant) => ({ skillCohortParticipant }))
const setAllSkillCohortParticipants = createAction(SET_ALL_SKILL_COHORT_PARTICIPANTS, (allSkillCohortParticipants) => ({ allSkillCohortParticipants }))
const createSkillCohortParticipant = createAction(CREATE_SKILL_COHORT_PARTICIPANT, (SkillCohortId, UserId) => ({ SkillCohortId, UserId }))

export const actions = {
    getSkillCohortParticipant,
    createSkillCohortParticipant,
    setSkillCohortParticipant,
    getAllSkillCohortParticipants,
    setAllSkillCohortParticipants
}