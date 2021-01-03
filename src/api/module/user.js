import httpClient from "./httpClient";

export const getUserFromId = ({ id }) => {
  return httpClient.get(`private/user?id=${id}`);
};
