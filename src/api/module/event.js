import httpClient from "./httpClient";

export const getAllEvents = () => {
  return httpClient.get("private/events");
};

export const getEvent = ({ id }) => {
  return httpClient.get(`private/event/${id}`);
};

export const updateEventStatusFromAPI = ({ event, status }) => {
  return httpClient.put(`private/event/set-status/${event.id}`, { status });
};
