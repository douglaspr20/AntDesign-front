import httpClient from "./httpClient";

export const getAllLibraries = ({ filter }) => {
  return httpClient.get("private/library/all");
};

export const addLibrary = ({ library }) => {
  return httpClient.post(`private/library/`, { ...library });
};
