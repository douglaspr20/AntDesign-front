import httpClient from "./httpClient";

export const getAllSessions = ({ startTime, endTime }) => {
  if (startTime && endTime) {
    return httpClient.get(
      `private/session?startTime=${startTime}&endTime=${endTime}`
    );
  }
  return httpClient.get(`private/session`);
};

export const getSessionsAddedbyUser = ({ id }) => {
  return httpClient.get(`private/sessions-user?userId=${id}`);
};
