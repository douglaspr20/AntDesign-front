import httpClient from "./httpClient";

export const getBusinessPartnerMembersFromAPI = () => {
  return httpClient.get(`private/business-partner/members`);
};

export const getBusinessPartnerResourcesFromAPI = (filter, order) => {
  return httpClient.get(`private/business-partner/resources`);
};

export const getBusinessPartnerResourceByIdFromAPI = (payload) => {
  return httpClient.get(`private/business-partner/resource/${payload.id}`);
};

export const createBusinessPartnerResourceFromAPI = (data) => {
  return httpClient.post(`private/business-partner/add-resources`, data);
};
