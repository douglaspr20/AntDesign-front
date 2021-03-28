import httpClient from "./httpClient";

export const getAllEvents = () => {
  return httpClient.get("private/events");
};

export const getEvent = ({ id }) => {
  return httpClient.get(`public/event/${id}`);
};

export const updateEventStatusFromAPI = ({ event, status }) => {
  return httpClient.put(`private/event/set-status/${event.id}`, { status });
};

export const createChannelEvent = ({ data }) => {
  return httpClient.post("private/event/channel", { ...data });
}

export const getChannelEvents = ({ filter }) => {
  const parsedFilter = Object.keys(filter)
    .map((item) => `${item}=${filter[item]}`)
    .join("&");

  return httpClient.get(`private/event/channel?${parsedFilter}`)
}
