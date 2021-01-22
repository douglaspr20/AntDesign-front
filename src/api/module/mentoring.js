import httpClient from "./httpClient";

export const setMentorInfo = ({ info }) => {
  return httpClient.post(`private/mentoring`, { ...info });
};

export const getMentoringInfo = () => {
  return httpClient.get("private/mentoring");
};

export const updateMentorInfo = ({ info }) => {
  return httpClient.put("private/mentoring", { ...info });
};
