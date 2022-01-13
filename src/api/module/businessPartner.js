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
export const getBusinessPartnerDocumentsFromoAPI = () => {
  return httpClient.get("private/business-partner/documents");
};

export const uploadBusinessPartnerDocumentFileFromAPI = ({ document }) => {
  console.log(document)
  return httpClient.put("private/business-partner/upload-document", document);
};

export const createBusinessPartnerDocumentFromAPI = ({ document }) => {
  return httpClient.post("private/business-partner/create-document", document);
};

export const createBusinessPartnerResourceFromAPI = (data) => {
  return httpClient.post(`private/business-partner/add-resources`, data);
};
