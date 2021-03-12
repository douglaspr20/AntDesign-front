import httpClient from "./httpClient";

export const createChannel = ({ channel }) => {
  return httpClient.post(`private/channel`, { ...channel });
};
