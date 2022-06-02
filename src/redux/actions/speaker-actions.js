import { createAction } from "redux-actions";

// Action Types
const ADD_PANEL_SPEAKERS = "ADD_PANEL_SPEAKERS";
const UPDATE_PANEL_SPEAKERS = "UPDATE_PANEL_SPEAKERS"
const GET_PANEL_SPEAKERS = "GET_PANEL_SPEAKERS";
const GET_USERS_SPEAKERS = "GET_USERS_SPEAKERS";
const REMOVE_USERS_PANEL = "REMOVE_USERS_PANEL";
const UPDATE_USERS_SPEAKERS = "UPDATE_USERS_SPEAKERS";
const ADD_SPEAKER_TO_PANEL = "ADD_SPEAKER_TO_PANEL";
const UPDATE_ADD_PANEL_SPEAKERS = "UPDATE_ADD_PANEL_SPEAKERS";
const SEND_EMAIL_REGISTER_CONFERENCE = "SEND_EMAIL_REGISTER_CONFERENCE";

export const constants = {
  GET_PANEL_SPEAKERS,
  ADD_PANEL_SPEAKERS,
  UPDATE_PANEL_SPEAKERS,
  GET_USERS_SPEAKERS,
  REMOVE_USERS_PANEL,
  UPDATE_USERS_SPEAKERS,
  ADD_SPEAKER_TO_PANEL,
  UPDATE_ADD_PANEL_SPEAKERS,
  SEND_EMAIL_REGISTER_CONFERENCE
};

// ------------------------------------
// Actions
// ------------------------------------
export const addPanelSpeakers = createAction(
  ADD_PANEL_SPEAKERS,
  (panels, callback) => ({ panels, callback })
);

export const addUserSpeakerToPanel = createAction(
  ADD_SPEAKER_TO_PANEL,
  (data, callback) => ({ data, callback })
)

export const updatePanelSpeakers = createAction(
    UPDATE_PANEL_SPEAKERS,
    (panelsSpeakers) => ({ panelsSpeakers })
);

export const updateAddPanelSpeakers = createAction(
  UPDATE_ADD_PANEL_SPEAKERS,
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

export const sendEmailRegisterConference2023 = createAction(
  SEND_EMAIL_REGISTER_CONFERENCE,
  () => ({})
)

export const actions = {
    addPanelSpeakers,
    updatePanelSpeakers,
    getAllPanelSpeakers,
    getAllUserSpeaker,
    removeUserSpeakerToPanel,
    updateAllUserSpeakers,
    addUserSpeakerToPanel,
    updateAddPanelSpeakers,
    sendEmailRegisterConference2023
};
