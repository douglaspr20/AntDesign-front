import httpClient from "./httpClient";

export const getNotifications = ({ page, num }) => {
  return httpClient.get(`private/notification?page=${page}&num=${num}`);
};
