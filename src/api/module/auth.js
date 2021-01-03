import httpClient from "./httpClient";

export const signIn = ({ email, password }) => {
  return httpClient.post("/public/login", {
    email,
    password,
  });
};

export const signUp = ({ firstName, lastName, email, password, password2 }) => {
  return httpClient.post("/public/register", {
    firstName,
    lastName,
    email,
    password,
    password2,
  });
};
