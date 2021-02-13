import httpClient from "./httpClient";

export const getAllJourneys = async (data) => {
  return await httpClient.get(`private/journey`);
};

export const get = async (id) => {
  return await httpClient.get(`private/journey/${id}`);
};

export const post = async (data) => {
  return await httpClient.post(`private/journey/`, data);
};
