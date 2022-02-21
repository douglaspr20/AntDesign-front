import httpClient from "./httpClient";
import qs from 'query-string'

export const getMatchmake = ({ filters }) => {
  let newFilter = {};
  console.log(filters, "filter");
  console.log(qs.parse(filters), "module");

  if (filters) {
    newFilter = { ...filters };
  }

  const parsedFilter = Object.keys(newFilter)
    .map((item) => `${item}=${newFilter[item]}`)
    .join("&");

  console.log(parsedFilter, "parsedFilter");

  return httpClient.get(`private/matchmake?${parsedFilter}`);
};
