import httpClient from "./httpClient";

export const getMatchmake = ({ filters }) => {
  let newFilter = {};

  if (filters) {
    newFilter = { ...filters };
  }

  const parsedFilter = Object.keys(newFilter)
    .map((item) => `${item}=${newFilter[item]}`)
    .join("&");

  return httpClient.get(`private/matchmake?${parsedFilter}`);
};
