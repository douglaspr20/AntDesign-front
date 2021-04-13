import httpClient from "./httpClient";
import { SETTINGS } from "enum";

export const createChannel = ({ channel }) => {
  return httpClient.post(`private/channel`, { ...channel });
};

export const searchChannels = ({ filter = {}, order, page, num }) => {
  let params = {
    ...filter,
    page: page || 1,
    num: num || SETTINGS.MAX_SEARCH_ROW_NUM,
    ...(order ? { order } : {}),
  };

  const parsedFilter = Object.keys(params)
    .map((item) => `${item}=${params[item]}`)
    .join("&");

  return httpClient.get(`private/channel?${parsedFilter}`);
};

export const getChannel = ({ id }) => {
  return httpClient.get(`private/channel/${id}`);
};

export const setFollowChannel = ({ channel }) => {
  return httpClient.put(`private/channel/follow/${channel.id}`);
};

export const updateChannel = ({ channel }) => {
  return httpClient.put(`private/channel/${channel.id}`, channel);
};

export const unsetFollowChannel = ({ channel }) => {
  return httpClient.put(`private/channel/unfollow/${channel.id}`);
};
