import httpClient from "./httpClient";

export const getAllSessions = ({ startTime, endTime }) => {
  return httpClient.get(
    `private/session?startTime=${startTime}&endTime=${endTime}`
  );
};

export const getSessionsAddedbyUser = ({ id }) => {
  console.log(id);
  return httpClient.get(`private/session/sessionAddedByUsers?userId=${id}`);
};
