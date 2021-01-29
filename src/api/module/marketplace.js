import httpClient from "./httpClient";

export const getAllMarketplace = async (orderParam) => {
  return await httpClient.post(`public/marketplace`, { orderParam });
};
