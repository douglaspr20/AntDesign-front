import httpClient from "./httpClient";

export const getAllBonfires = () => {
  return httpClient.get(`private/bonfire`);
};

export const createBonfire = (data) => {
  return httpClient.post(`private/bonfire`, data);
};
