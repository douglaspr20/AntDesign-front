import httpClient from "./httpClient";
import { SETTINGS } from "enum";

export const getAllSessions = ({ startTime, endTime, meta }) => {
  if (startTime && endTime) {
    return httpClient.get(
      `private/session?startTime=${startTime}&endTime=${endTime} ${
        meta ? `&meta=${meta}` : ""
      }`
    );
  }
  return httpClient.get(`private/session`);
};

export const getSession = ({ id }) => {
  return httpClient.get(`private/session/${id}`);
};

export const getSessionsAddedbyUser = ({ id }) => {
  return httpClient.get(`private/sessions-user?userId=${id}`);
};

export const getParticipants = (filters) => {
  let newFilter = {
    num: SETTINGS.MAX_SEARCH_ROW_PARTICIPANTS_NUM,
  };

  if (!filters.page) {
    newFilter = {
      ...newFilter,
      page: 1,
      topics: filters.topics,
      userId: filters.userId,
    };
  } else {
    newFilter = {
      ...newFilter,
      page: filters.page,
      topics: filters.topics,
      userId: filters.userId,
    };
  }

  if (filters.order) {
    newFilter = {
      ...newFilter,
      order: ["pointsConferenceLeaderboard", "DESC"],
    };
  }

  return httpClient.get(`private/session/participants`, {
    params: {
      ...newFilter,
    },
  });
};

export const recommendedAgenda = ({ filters }) => {
  return httpClient.get(`private/session/recommended-agenda`, {
    params: {
      ...filters,
    },
  });
};
