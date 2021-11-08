import { createSelector } from 'reselect';

const skillCohortParticipantData = (state) => state.skillCohortParticipant;

const resultSelector = createSelector(skillCohortParticipantData, (payload) => {
	return {
		allSkillCohortParticipants: payload.get('allSkillCohortParticipants'),
		skillCohortParticipant: payload.get('skillCohortParticipant'),
	};
});

export const skillCohortParticipantSelector = (state) => ({
	...resultSelector(state),
});
