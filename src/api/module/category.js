import httpClient from "./httpClient";

export const getCategories = () => {
  return httpClient.get(`private/category`);
};
