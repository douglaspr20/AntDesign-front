import httpClient from "./httpClient";

export const getAllEvents = () => {
  return httpClient.get("private/events");
};

export const getEvent = ({ id }) => {
  return httpClient.get(`private/event/${id}`);
};
