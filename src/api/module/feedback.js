import httpClient from "./httpClient";
import storage from "store";

const community = storage.get("community");

export const sendEmail = async (data) => {
  return await httpClient.post(`private/feedback`, {
    ...data
  }, {
    headers: {
      'Authorization': `Bearer ${community.accessToken}`
    },
  });
};
