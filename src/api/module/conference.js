import httpClient from "./httpClient";
import { SETTINGS } from "enum";

export const searchConferenceLibrary = ({ filter }) => {
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

  return httpClient.get(`private/conference?${parsedFilter}`);
};

export const claimConferenceLibrary = ({ id }) => {
  return httpClient.post(`private/conference/claim`, { id });
};
