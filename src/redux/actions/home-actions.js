import { createAction } from "redux-actions";

// Action Types
const SET_LOADING = "SET_LOADING";
const SET_PLAN_UPDATED = "SET_PLAN_UPDATED";
const UPDATE_USER_INFO = "UPDATE_USER_INFO";
const UPDATE_EVENTS = "UPDATE_EVENTS";
const UPDATE_MY_EVENTS = "UPDATE_MY_EVENTS";
const SET_SETTING_COLLAPSED = "SET_SETTING_COLLAPSED";
const GET_USER = "GET_USER";
const UPDATE_USER = "UPDATE_USER";
const UPGRADE_PLAN = "UPGRADE_PLAN";

export const constants = {
  SET_LOADING,
  SET_PLAN_UPDATED,
  UPDATE_USER_INFO,
  UPDATE_EVENTS,
  UPDATE_MY_EVENTS,
  SET_SETTING_COLLAPSED,
  GET_USER,
  UPDATE_USER,
  UPGRADE_PLAN,
};

// ------------------------------------
// Actions
// ------------------------------------
export const setLoading = createAction(SET_LOADING, (loading) => ({ loading }));
export const updateUserInformation = createAction(
  UPDATE_USER_INFO,
  (userProfile) => ({ userProfile })
);
export const updateEventData = createAction(UPDATE_EVENTS, (events) => ({
  events,
}));
export const updateMyEventData = createAction(UPDATE_MY_EVENTS, (myEvents) => ({
  myEvents,
}));
export const setSettingCollapsed = createAction(
  SET_SETTING_COLLAPSED,
  (collapsed) => ({ collapsed })
);
export const getUser = createAction(GET_USER, (id) => ({ id }));
export const updateUser = createAction(UPDATE_USER, (user) => ({ user }));
export const upgradePlan = createAction(UPGRADE_PLAN, (data) => ({ data }));

export const actions = {
  setLoading,
  updateUserInformation,
  updateEventData,
  updateMyEventData,
  setSettingCollapsed,
  getUser,
  updateUser,
  upgradePlan,
};
