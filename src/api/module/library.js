import httpClient from "./httpClient";
import { SETTINGS } from "enum";

export const addLibrary = ({ library }) => {
  return httpClient.post(`private/library/`, { ...library });
};

export const getLibrary = ({ id }) => {
  return httpClient.get(`private/library/${id}`);
};

export const searchLibrary = ({ filter }) => {
  let newFilter = {
    page: 1,
    num: SETTINGS.MAX_SEARCH_ROW_NUM,
  };

  if (filter) {
    newFilter = { ...newFilter, ...filter };
  }

  const parsedFilter = Object.keys(newFilter)
    .map((item) => `${item}=${newFilter[item]}`)
    .join("&");

  return httpClient.get(`private/library/all?${parsedFilter}`);
};
