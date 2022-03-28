import httpClient from "./httpClient";
import moment from "moment-timezone";

export const upsertCouncilEvent = (payload) => {
  return httpClient.post(`private/council/event`, payload);
};

export const getCouncilEvents = () => {
  return httpClient.get(`private/council/events`);
};

export const deleteCouncilEvent = (councilEventId) => {
  return httpClient.delete(`private/council/event/${councilEventId}`);
};

export const joinCouncilEvent = (payload) => {
  const userTimezone = moment.tz.guess();

  return httpClient.post(
    `private/council/event/panelist?userTimezone=${userTimezone}`,
    payload
  );
};

export const removeCouncilEventPanelist = (payload) => {
  return httpClient.delete(
    `private/council/event/panel/${payload.CouncilEventPanelId}/panelist/${payload.CouncilEventPanelistId}`
  );
};

export const searchUserForCouncilEventPanelist = (payload) => {
  const keyword = encodeURIComponent(payload.keyword);

  return httpClient.get(`private/council/event/search-user?keyword=${keyword}`);
};

