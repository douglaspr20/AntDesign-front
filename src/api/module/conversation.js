import httpClient from "./httpClient";

export const createConversation = (data) => {
  return httpClient.post(`private/conversations`, data);
};

export const getConversations = ({ id }) => {
  return httpClient.get(`private/conversations/${id}`);
};
