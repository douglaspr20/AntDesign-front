import httpClient from "./httpClient";

export const getCheckoutSession = async (data) => {
  return await httpClient.post(`private/stripe/checkout-session/`, {
    ...data,
  });
};

export const getPortalSession = async (data) => {
  return await httpClient.post(`private/stripe/portal-session/`, {
    ...data,
  });
};
