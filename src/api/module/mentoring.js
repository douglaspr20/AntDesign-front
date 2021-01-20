import httpClient from "./httpClient";

export const setMentorInfo = ({ info }) => {
  return httpClient.post(`private/mentoring`, { ...info });
};
