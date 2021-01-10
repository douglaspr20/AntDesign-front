import httpClient from "./httpClient";

export const sendEmail = async (data, token) => {
  return await httpClient.post(`private/feedback`, {
    ...data
  }, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
};
