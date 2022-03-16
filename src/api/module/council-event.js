import httpClient from "./httpClient";

export const upsertCouncilEvent = (payload) => {
  return httpClient.post(`private/council/event`, payload);
};

export const getCouncilEvents = () => {
  return httpClient.get(`private/council/events`);
};

export const deleteCouncilEvent = (councilEventId) => {

  return httpClient.delete(`private/council/event/${councilEventId}`);
};
