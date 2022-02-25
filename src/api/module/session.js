import httpClient from "./httpClient";

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

export const getSessionClasses = async ({ id }) => {
  return await httpClient.get(`private/conference-classes/${id}`);
};

export const getSessionsAddedbyUser = ({ id }) => {
  return httpClient.get(`private/sessions-user?userId=${id}`);
};

export const getSessionsUserJoined = ({ sessionsId }) => {
  return httpClient.get(`private/sessions-user-joined`, {
    params: {
      sessionsId: sessionsId,
    },
  });
};

export const getParticipants = (filters) => {
  let newFilter = {};

  if (filters.num) {
    newFilter = {
      num: filters.num,
    };
  }

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
