import httpClient from "./httpClient";

export const createConversation = (data) => {
  return httpClient.post(`private/conversation`, data);
};

export const getConversations = ({ id }) => {
  return httpClient.get(`private/conversation/${id}`);
};
