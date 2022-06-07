import httpClient from "./httpClient";

export const getAllSimulationSprints = async () => {
  return await httpClient.get(`private/simulation-sprints`);
};

export const getSimulationSprint = async ({ id }) => {
  return await httpClient.get(`private/simulation-sprints/${id}`);
};
