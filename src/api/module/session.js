import httpClient from "./httpClient";

export const getAllSessions = ({ startTime, endTime, meta }) => {
  if (startTime && endTime) {
    return httpClient.get(
      `private/session?startTime=${startTime}&endTime=${endTime} ${
        meta ? `&meta=${meta}` : ""
      }`
    );
  }
  return httpClient.get(`private/session`);
};

export const getSessionsAddedbyUser = ({ id }) => {
  return httpClient.get(`private/sessions-user?userId=${id}`);
};

export const getParticipants = ({ filters }) => {
  return httpClient.get(`private/session/participants`, {
    ...filters,
  });
};
