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

export const addToMyEventListFromAPI = ({ event }) => {
  return httpClient.put(`private/user/add-event/`, event);
};

export const removeFromMyEventListFromAPI = ({ event }) => {
  return httpClient.put(`private/user/remove-event/`, event);
};

export const getAllMyEventsFromAPI = () => {
  return httpClient.get(`private/user/my-events/`);
};

export const inviteFriend = (email) => {
  return httpClient.post(`private/user/invite-friend`, {
    email,
  });
};