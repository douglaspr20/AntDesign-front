import httpClient from './httpClient'

export const getAllSkillCohortParticipants = async (data) => {
    const { UserId } = data

    return await httpClient.get(`private/skill-cohort/participant/${UserId}`)
}

export const getSkillCohortParticipant = async (data) => {
    const { UserId, SkillCohortId } = data

    return await httpClient.get(`private/skill-cohort/${SkillCohortId}/participant/${UserId}`)
}

export const createSkillCohortParticipant = async (data) => {

    return await httpClient.post(`private/skill-cohort/participant`, { ...data })
}
