import httpClient from "./httpClient";

export const getAll = async (data) => {
  return await httpClient.get(`private/podcast`);
};

export const get = async (data) => {
  return await httpClient.get(`private/podcast/${data.id}`, {
    ...data
  });
};

export const post = async (data) => {
  return await httpClient.post(`private/podcast/`, {
    ...data
  });
};

export const put = async (data) => {
  return await httpClient.put(`private/podcast/${data.id}`, {
    ...data
  });
};

export const remove = async (id) => {
  return await httpClient.delete(`private/podcast/${id}`);
};
