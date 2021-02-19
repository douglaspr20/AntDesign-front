import httpClient from "./httpClient";

export const itemsByJourney = async (id) => {
  return await httpClient.get(`private/journey-items/${id}`);
};
