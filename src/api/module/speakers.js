import httpClient from "./httpClient";

export const addUserSpeakerToPanelEndPoint = (payload) => {
  return httpClient.post("private/speakers/add-speaker-to-panel", {
    ...payload,
  });
}

export const allPanelSpeakersEndPonit = (payload) => {
  return httpClient.get("public/speakers/all-panel", {
    ...payload,
  })
}

export const getAllUserSpeakerEndPoint = (payload) => {
  return httpClient.get("public/speakers/all-users-speakers", {
    ...payload,
  })
}

export const removeUserSpeakerToPanelEndPoint = (payload) => {
  return httpClient.post("private/speakers/remove-user-panel", {
    ...payload,
  })
}

export const registerUserIfNotAreRegisterConference2023EndPoint = () => {
  return httpClient.post("private/speakers/send-email-register-conference")
}

export const getAllPanelsOfOneUserEndPoint = (UserId) => {
  return httpClient.get(`public/speakers/all-panel-of-user/${UserId.UserId}`)
}