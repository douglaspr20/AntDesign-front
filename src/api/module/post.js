import httpClient from "./httpClient";

export const getAllPosts = async (data) => {
  return await httpClient.get(`private/post`);
};

export const get = async (id) => {
  return await httpClient.get(`private/post/${id}`);
};

export const post = async (data) => {
  return await httpClient.post(`private/post/`, data);
};

export const put = async (data) => {
  console.log(data);
  return await httpClient.put(`private/post/${data.id}`, data.post);
};
