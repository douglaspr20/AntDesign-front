import httpClient from "./httpClient";

export const getAllPodcasts = async (data) => {
  let newFilter = { };

  if (data.filter) {
    newFilter = { ...data.filter };
  }

  const parsedFilter = Object.keys(newFilter)
    .map((item) => `${item}=${newFilter[item]}`)
    .join("&");

  return await httpClient.get(`private/podcast?${parsedFilter}`);
};
