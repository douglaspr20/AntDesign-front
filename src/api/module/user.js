import httpClient from "./httpClient";

export const getUserFromId = ({ id }) => {
  return httpClient.get(`private/user?id=${id}`);
};

export const updateUser = ({ user }) => {
  return httpClient.put(`private/user?id=${user.id}`, {
    ...user,
  });
};

export const updateUserAvatar = ({ id, img }) => {
  let data = new FormData();
  console.log("avatar", img);
  data.append("file", img);

  return httpClient.put(`private/user/image?id=${id}`, data, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
};
