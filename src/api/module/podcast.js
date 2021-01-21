import httpClient from "./httpClient";

export const getAllPodcasts = async (data) => {
  return await httpClient.get(`private/podcast`);
};
