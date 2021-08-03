import httpClient from "./httpClient";

export const getAllSessions = ({ startTime, endTime }) => {
  return httpClient.get(
    `private/session?startTime=${startTime}&endTime=${endTime}`
  );
};
