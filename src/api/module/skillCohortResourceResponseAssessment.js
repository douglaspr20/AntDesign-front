import httpClient from './httpClient'
import qs from 'query-string'

export const upsertSkillCohortResourceResponseAssessment = async (data) => {

    return await httpClient.post(`private/skill-cohort/resource/assessment/upsert`, data)
}

export const getAllSkillCohortResourceResponseAssessment = async (data) => {
    const { SkillCohortResourceId, SkillCohortParticipantId, ids } = data
    const parsedIds = qs.stringify({ ids }, { arrayFormat: 'comma' })

    return await httpClient.get(`private/skill-cohort/resource/${SkillCohortResourceId}/participant/${SkillCohortParticipantId}/assessments?${parsedIds}`)
}