import httpClient from "./httpClient";

export const getUserFromId = () => {
  return httpClient.get(`private/user`);
};

export const updateUser = ({ user }) => {
  return httpClient.put(`private/user`, {
    ...user,
  });
};

export const upgradePlan = ({ data }) => {
  return httpClient.put(`private/user/upgrade-plan`, {
    ...data,
  });
};
