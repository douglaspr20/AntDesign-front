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

export const getLibrary = ({ id }) => {
  return httpClient.get(`private/library/${id}`);
};

export const searchLibrary = ({ filter }) => {
  let newFilter = {
    page: 1,
    num: 20,
  };

  if (filter) {
    newFilter = { ...newFilter, ...filter };
  }

  const parsedFilter = Object.keys(newFilter)
    .map((item) => `${item}=${newFilter[item]}`)
    .join("&");

  return httpClient.get(`private/library/all?${parsedFilter}`);
};
