import httpClient from "./httpClient";

export const getUserFromId = ({ id }) => {
  return httpClient.get(`private/user?id=${id}`);
};

export const updateUser = ({ user }) => {
  return httpClient.put(`private/user?id=${user.id}`, {
    ...user,
  });
};
