import httpClient from "./httpClient";

export const getAdvertisementsByPage = async (filter) => {
  let newFilter = {};

  if (filter) {
    newFilter = { ...filter };
  }

  const parsedFilter = Object.keys(newFilter)
    .map((item) => `${item}=${newFilter[item]}`)
    .join("&");

  return await httpClient.get(`private/advertisements-by-page?${parsedFilter}`);
};

export const getAdvertisementByAdvertiser = async (data) => {
  const { UserId } = data;

  return await httpClient.get(`private/advertisements/${UserId}`);
};

export const createAdvertisement = async (data) => {
  const { advertisement } = data;

  return await httpClient.post(`private/advertisement`, { ...advertisement });
};
