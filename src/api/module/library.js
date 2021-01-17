import httpClient from "./httpClient";

export const getAllLibraries = ({ filter }) => {
  if (filter) {
    const parsedFilter = Object.keys(filter)
      .map((item) => `${item}=${filter[item]}`)
      .join("&");
    return httpClient.get(`private/library/all?${parsedFilter}`);
  }
  return httpClient.get("private/library/all?page=1&num=20");
};

export const addLibrary = ({ library }) => {
  return httpClient.post(`private/library/`, { ...library });
};
