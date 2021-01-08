import httpClient from "./httpClient";

export const getUserFromId = ({ id }) => {
  return httpClient.get(`private/user?id=${id}`);
};

export const updateUser = ({ user }) => {
  return httpClient.put(`private/user?id=${user.id}`, {
    ...user,
  });
};

export const upgradePlan = ({ data }) => {
  return httpClient.put(`private/user/upgrade-plan?id=${data.user}`, {
    ...data,
  });
};
