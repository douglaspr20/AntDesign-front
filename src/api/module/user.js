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

export const addToMyEventListFromAPI = ({ event, userTimezone }) => {
  return httpClient.put(`private/user/add-event/`, { ...event, userTimezone });
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

export const attendToGlobalConference = () => {
  return httpClient.put(`private/user/attend-conference`);
};

export const addSession = ({ session }) => {
  return httpClient.put(`private/user/add-session/${session.id}`);
};

export const removeSession = ({ session }) => {
  return httpClient.put(`private/user/remove-session/${session.id}`);
};

export const addBonfire = ({ bonfire }) => {
  return httpClient.put(`private/user/add-bonfire/${bonfire.id}`);
};

export const removeBonfire = ({ bonfire }) => {
  return httpClient.put(`private/user/remove-bonfire/${bonfire.id}`);
};

export const uploadResume = ({ resume }) => {
  return httpClient.put("private/user/upload-resume", resume);
};

export const deleteResume = () => {
  return httpClient.put("private/user/delete-resume");
};

export const changePassword = (data) => {
  const { UserId, oldPassword, newPassword } = data;

  return httpClient.post(`private/user/${UserId}/change-password`, {
    oldPassword,
    newPassword,
  });
};

export const createInvitation = ({ email, username }) => {
  return httpClient.post(`private/user/create-invitation`, {
    username,
    email,
  });
};

export const acceptInvitationJoin = ({ newUser, hostUser }) => {
  return httpClient.get(`private/user/accept-invitation/${newUser}`, {
    params: {
      hostUser,
    },
  });
};

export const confirmAccessibilityRequirements = ({ userId }) => {
  return httpClient.get(
    `private/user/confirm-accessibility-requirements/${userId}`
  );
};
