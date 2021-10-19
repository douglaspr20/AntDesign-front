import httpClient from './httpClient';

export const getAllResources = async (data) => {
	let newFilter = {};

	if (data.filter) {
		newFilter = { filter: data.filter };
	}

	const parsedFilter = Object.keys(newFilter)
		.map((item) => `${item}=${newFilter[item]}`)
		.join('&');

	return await httpClient.get(`private/skill-cohort/${data.SkillCohortId}/resources?${parsedFilter}`);
};

export const getResource = async (data) => {
	const { id } = data;

	return await httpClient.get(`private/skill-cohort/resource/${id}`);
};
