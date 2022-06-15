import { createAction } from "redux-actions";

// Action Types
const UPDATE_PANEL_SPEAKERS = "UPDATE_PANEL_SPEAKERS"
const GET_PANEL_SPEAKERS = "GET_PANEL_SPEAKERS";
const GET_USERS_SPEAKERS = "GET_USERS_SPEAKERS";
const REMOVE_USERS_PANEL = "REMOVE_USERS_PANEL";
const UPDATE_USERS_SPEAKERS = "UPDATE_USERS_SPEAKERS";
const ADD_SPEAKER_TO_PANEL = "ADD_SPEAKER_TO_PANEL";
const REGISTER_USER_IF_NOT_REGISTER_CONFERENCE_2023 = "REGISTER_USER_IF_NOT_REGISTER_CONFERENCE_2023";
const GET_ALL_PANELS_OF_ONE_USER = "GET_ALL_PANELS_OF_ONE_USER";
const UPDATE_ALL_PANELS_OF_ONE_USER = "UPDATE_ALL_PANELS_OF_ONE_USER";
const SET_BUL_REGISTER = "SET_BUL_REGISTER";

export const constants = {
  GET_PANEL_SPEAKERS,
  UPDATE_PANEL_SPEAKERS,
  GET_USERS_SPEAKERS,
  REMOVE_USERS_PANEL,
  UPDATE_USERS_SPEAKERS,
  ADD_SPEAKER_TO_PANEL,
  REGISTER_USER_IF_NOT_REGISTER_CONFERENCE_2023,
  GET_ALL_PANELS_OF_ONE_USER,
  UPDATE_ALL_PANELS_OF_ONE_USER,
  SET_BUL_REGISTER
};

// ------------------------------------
// Actions
// ------------------------------------

export const addUserSpeakerToPanel = createAction(
  ADD_SPEAKER_TO_PANEL,
  (data, callback) => ({ data, callback })
)

export const updatePanelSpeakers = createAction(
    UPDATE_PANEL_SPEAKERS,
    (panelsSpeakers) => ({ panelsSpeakers })
);

export const getAllPanelSpeakers = createAction(
  GET_PANEL_SPEAKERS,
  (UserId) => ({ UserId })
);

export const getAllUserSpeaker = createAction(
  GET_USERS_SPEAKERS,
  (UserId) => ({ UserId})
)

export const updateAllUserSpeakers = createAction(
  UPDATE_USERS_SPEAKERS,
  (userSpeakers) => ({ userSpeakers })
);

export const removeUserSpeakerToPanel = createAction(
  REMOVE_USERS_PANEL,
  (UserId, callback) => ({ UserId, callback})
)

export const registerUserIfNotAreRegisterConference2023 = createAction(
  REGISTER_USER_IF_NOT_REGISTER_CONFERENCE_2023,
  (callback) => ({callback})
)

export const getAllPanelsOfOneUser = createAction(
  GET_ALL_PANELS_OF_ONE_USER,
  (UserId, callback) => ({UserId, callback})
)

export const updateAllPanelsOfOneUser = createAction(
  UPDATE_ALL_PANELS_OF_ONE_USER,
  (userSpeakers) => ({ userSpeakers })
);

export const setBulRegister = createAction(
  SET_BUL_REGISTER,
  (bul) => ({bul})
)

export const actions = {
    updatePanelSpeakers,
    getAllPanelSpeakers,
    getAllUserSpeaker,
    removeUserSpeakerToPanel,
    updateAllUserSpeakers,
    addUserSpeakerToPanel,
    registerUserIfNotAreRegisterConference2023,
    getAllPanelsOfOneUser,
    updateAllPanelsOfOneUser,
};
