import httpClient from "./httpClient";

export const getAllBonfires = () => {
  return httpClient.get(`private/bonfire`);
};

export const createBonfire = (data) => {
  return httpClient.post(`private/bonfire`, data);
};

export const updateBonfire = ({ id, bonfire }) => {
  return httpClient.put(`private/bonfire/${id}`, bonfire);
};

export const deleteBonfire = ({ id }) => {
  return httpClient.delete(`private/bonfire/${id}`);
};
