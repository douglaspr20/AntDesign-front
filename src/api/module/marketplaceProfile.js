import httpClient from "./httpClient";

export const getMarketplaceProfiles = ({ id }) => {
  return httpClient.get(`private/marketplace-profiles?userId=${id}`);
};

export const getMarketplaceProfile = ({ id }) => {
  return httpClient.get(`private/marketplace-profiles/${id}`);
};

export const createMarketplaceProfile = (data) => {
  return httpClient.post(`private/marketplace-profiles`, data);
};

export const updateMarketplaceProfile = ({ marketplaceProfile }) => {
  return httpClient.put(
    `private/marketplace-profiles/${marketplaceProfile.id}`,
    marketplaceProfile
  );
};
