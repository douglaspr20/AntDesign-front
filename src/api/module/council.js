import httpClient from "./httpClient";

export const getCouncilMembersFromAPI = () => {
  return httpClient.get(`private/council/members`);
};

export const getCouncilResourcesFromAPI = (filter, order) => {
  return httpClient.get(`private/council/resources`);
};

export const getCouncilResourceByIdFromAPI = (payload) => {
  return httpClient.get(`private/council/resource/${payload.id}`);
};

export const createCouncilResourceFromAPI = (data) => {
  return httpClient.post(`private/council/add-resources`, data);
};
