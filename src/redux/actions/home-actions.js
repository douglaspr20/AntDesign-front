import { createAction } from "redux-actions";

// Action Types
const SET_LOADING = "SET_LOADING";
const SET_PLAN_UPDATED = "SET_PLAN_UPDATED";
const UPDATE_USER_INFO = "UPDATE_USER_INFO";
const SET_SETTING_COLLAPSED = "SET_SETTING_COLLAPSED";
const GET_USER = "GET_USER";
const UPDATE_USER = "UPDATE_USER";
const UPGRADE_PLAN = "UPGRADE_PLAN";
const INVITE_FRIEND = "INVITE_FRIEND";
const ATTEND_TO_GLOBAL_CONFERENCE = "ATTEND_TO_GLOBAL_CONFERENCE";
const ADD_SESSION = "ADD_SESSION";
const REMOVE_SESSION = "REMOVE_SESSION";
const ADD_BONFIRE = "ADD_BONFIRE";
const REMOVE_BONFIRE = "REMOVE_BONFIRE";
const UPLOAD_RESUME = "UPLOAD_RESUME";
const DELETE_RESUME = "DELETE_RESUME";
const CHANGE_PASSWORD = "CHANGE_PASSWORD";
const CREATE_INVITATION = "CREATE_INVITATION";
const ACCEPT_INVITATION = "ACCEPT_INVITATION";
const CONFIRM_ACCESSIBILITY_REQUIREMENTS = "CONFIRM_ACCESSIBILITY_REQUIREMENTS";

export const constants = {
  SET_LOADING,
  SET_PLAN_UPDATED,
  UPDATE_USER_INFO,
  SET_SETTING_COLLAPSED,
  GET_USER,
  UPDATE_USER,
  UPGRADE_PLAN,
  INVITE_FRIEND,
  ATTEND_TO_GLOBAL_CONFERENCE,
  ADD_SESSION,
  REMOVE_SESSION,
  ADD_BONFIRE,
  REMOVE_BONFIRE,
  UPLOAD_RESUME,
  DELETE_RESUME,
  CHANGE_PASSWORD,
  CREATE_INVITATION,
  ACCEPT_INVITATION,
  CONFIRM_ACCESSIBILITY_REQUIREMENTS,
};

// ------------------------------------
// Actions
// ------------------------------------
export const setLoading = createAction(SET_LOADING, (loading) => ({ loading }));
export const updateUserInformation = createAction(
  UPDATE_USER_INFO,
  (userProfile) => ({ userProfile })
);
export const setSettingCollapsed = createAction(
  SET_SETTING_COLLAPSED,
  (collapsed) => ({ collapsed })
);
export const getUser = createAction(GET_USER);
export const updateUser = createAction(UPDATE_USER, (user) => ({ user }));
export const upgradePlan = createAction(UPGRADE_PLAN, (data) => ({ data }));
export const inviteFriend = createAction(INVITE_FRIEND, (email, callback) => ({
  email,
  callback,
}));
export const attendToGlobalConference = createAction(
  ATTEND_TO_GLOBAL_CONFERENCE
);
export const addSession = createAction(ADD_SESSION, (session) => ({ session }));
export const removeSession = createAction(REMOVE_SESSION, (session) => ({
  session,
}));
export const addBonfire = createAction(ADD_BONFIRE, (bonfire) => ({ bonfire }));
export const removeBonfire = createAction(REMOVE_BONFIRE, (bonfire) => ({
  bonfire,
}));
export const uploadResume = createAction(UPLOAD_RESUME, (resume, callback) => ({
  resume,
  callback,
}));
export const deleteResume = createAction(DELETE_RESUME, (callback) => ({
  callback,
}));
export const changePassword = createAction(
  CHANGE_PASSWORD,
  (UserId, oldPassword, newPassword) => ({ UserId, oldPassword, newPassword })
);

export const createInvitation = createAction(
  CREATE_INVITATION,
  (email, username) => ({ email, username })
);

export const acceptInvitation = createAction(
  ACCEPT_INVITATION,
  (newUser, hostUser) => ({ newUser, hostUser })
);

export const confirmAccessibilityRequirements = createAction(
  CONFIRM_ACCESSIBILITY_REQUIREMENTS,
  (userId) => ({ userId })
);

export const actions = {
  setLoading,
  updateUserInformation,
  setSettingCollapsed,
  getUser,
  updateUser,
  upgradePlan,
  inviteFriend,
  attendToGlobalConference,
  addSession,
  removeSession,
  addBonfire,
  removeBonfire,
  uploadResume,
  deleteResume,
  changePassword,
  createInvitation,
  acceptInvitation,
};
