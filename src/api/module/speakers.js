import httpClient from "./httpClient";

export const addPanelSpeakersEndPoint = (payload) => {
    return httpClient.post("private/speakers/add-new-panel", {
      ...payload,
    });
}

export const addUserSpeakerToPanelEndPoint = (payload) => {
  return httpClient.post("private/speakers/add-speaker-to-panel", {
    ...payload,
  });
}

export const allPanelSpeakersEndPonit = (payload) => {
  return httpClient.get("private/speakers/all-panel", {
    ...payload,
  })
}

export const getAllUserSpeakerEndPoint = (payload) => {
  return httpClient.get("private/users/all-users-speakers", {
    ...payload,
  })
}

export const removeUserSpeakerToPanelEndPoint = (payload) => {
  return httpClient.post("private/speakers/remove-user-panel", {
    ...payload,
  })
}