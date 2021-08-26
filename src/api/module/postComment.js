import httpClient from "./httpClient";

export const post = async (data) => {
  return await httpClient.post(`private/postComment/`, data);
};
