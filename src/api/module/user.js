import httpClient from "./httpClient";
import storage from "store";

const community = storage.get("community");

export const getUserFromId = () => {
  return httpClient.get(`private/user`, {
    headers: {
      Authorization: `Bearer ${community.accessToken}`,
    },
  });
};

export const updateUser = ({ user }) => {
  return httpClient.put(
    `private/user`,
    {
      ...user,
    },
    {
      headers: {
        Authorization: `Bearer ${community.accessToken}`,
      },
    }
  );
};

export const upgradePlan = ({ data }) => {
  return httpClient.put(
    `private/user/upgrade-plan`,
    {
      ...data,
    },
    {
      headers: {
        Authorization: `Bearer ${community.accessToken}`,
      },
    }
  );
};
