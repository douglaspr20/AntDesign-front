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
export const getBusinessPartnerDocumentsFromAPI = () => {
  return httpClient.get("private/business-partner/documents");
};

export const uploadBusinessPartnerDocumentFileFromAPI = ({ documentFile }) => {
  return httpClient.put(
    "private/business-partner/upload-document",
    documentFile
  );
};

export const createBusinessPartnerDocumentFromAPI = (document) => {
  const file = document.file;
  return httpClient.post(`private/business-partner/create-document`, file, {
    params: document.values,
  });
};

export const createBusinessPartnerResourceFromAPI = (data) => {
  return httpClient.post(`private/business-partner/add-resources`, data);
};
