import httpClient from "./httpClient";

export const getUserFromId = ({ id, token }) => {
  return httpClient.get(`private/user?id=${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
};

export const updateUser = ({ user, token }) => {
  return httpClient.put(`private/user?id=${user.id}`, {
    ...user,
  }, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
};

export const upgradePlan = ({ data, token }) => {
  return httpClient.put(`private/user/upgrade-plan?id=${data.user}`, {
    ...data,
  }, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
};
