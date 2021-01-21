import httpClient from "./httpClient";

export const getAll = async (data) => {
  return await httpClient.get(`private/podcast`);
};