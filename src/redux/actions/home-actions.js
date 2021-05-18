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

export const actions = {
  setLoading,
  updateUserInformation,
  setSettingCollapsed,
  getUser,
  updateUser,
  upgradePlan,
  inviteFriend,
  attendToGlobalConference,
};
