import httpClient from "./httpClient";

export const getMarketplaceProfiles = ({ id, meta }) => {
  return httpClient.get(
    `private/marketplace-profiles?userId=${id} ${meta ? `&meta=${meta}` : ""}`
  );
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
