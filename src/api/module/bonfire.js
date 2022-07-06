import httpClient from "./httpClient";

export const getAllBonfires = ({ filters }) => {
  return httpClient.get(`private/bonfire`, {
    params: {
      ...filters,
    },
  });
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

export const inviteUser = ({ id, userId }) => {
  return httpClient.put(`private/bonfire/${id}/invitedUser/${userId}`);
};
