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
const JOINED_SESSION = "JOINED_SESSION";
const UPLOAD_RESUME = "UPLOAD_RESUME";
const DELETE_RESUME = "DELETE_RESUME";
const CHANGE_PASSWORD = "CHANGE_PASSWORD";
const CREATE_INVITATION = "CREATE_INVITATION";
const ACCEPT_INVITATION = "ACCEPT_INVITATION";
const ACCEPT_INVITATION_APPLY = "ACCEPT_INVITATION_APPLY";
const CONFIRM_INVITATION_APPLY = "CONFIRM_INVITATION_APPLY";
const CONFIRM_ACCESSIBILITY_REQUIREMENTS = "CONFIRM_ACCESSIBILITY_REQUIREMENTS";
const GET_USERS = "GET_USERS";
const SET_USERS = "SET_USERS";
const ACCEPT_TERMS_CONDITIONS_GCONFERENCE =
  "ACCEPT_TERMS_CONDITIONS_GCONFERENCE";
const VIEW_RULES_G_CONFERENCE = "VIEW_RULES_G_CONFERENCE";
const COUNT_ALL_USERS = "COUNT_ALL_USERS";
const SET_ALL_COUNT_USERS = "SET_ALL_COUNT_USERS";
const HANDLE_ONLINE = "HANDLE_ONLINE";
const SEARCH_USER = "SEARCH_USER";
const SET_SEARCHED_USERS = "SET_SEARCHED_USERS";
const SET_USER_SHOW = "SET_USER_SHOW";
const SET_VISIBLE_PROFILE_USER = "SET_VISIBLE_PROFILE_USER";
const SET_PAGES_SEARCHED_USERS = "SET_PAGES_SEARCHED_USERS";

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
  JOINED_SESSION,
  ADD_BONFIRE,
  REMOVE_BONFIRE,
  UPLOAD_RESUME,
  DELETE_RESUME,
  CHANGE_PASSWORD,
  CREATE_INVITATION,
  ACCEPT_INVITATION,
  ACCEPT_INVITATION_APPLY,
  CONFIRM_INVITATION_APPLY,
  CONFIRM_ACCESSIBILITY_REQUIREMENTS,
  GET_USERS,
  SET_USERS,
  ACCEPT_TERMS_CONDITIONS_GCONFERENCE,
  VIEW_RULES_G_CONFERENCE,
  COUNT_ALL_USERS,
  SET_ALL_COUNT_USERS,
  HANDLE_ONLINE,
  SEARCH_USER,
  SET_SEARCHED_USERS,
  SET_USER_SHOW,
  SET_VISIBLE_PROFILE_USER,
  SET_PAGES_SEARCHED_USERS,
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

export const getUser = createAction(GET_USER, (id) => ({ id }));
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

export const joinedSession = createAction(
  JOINED_SESSION,
  (session, callback) => ({
    session,
    callback,
  })
);
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
  (usersInvited, hostUserId) => ({ usersInvited, hostUserId })
);

export const acceptInvitation = createAction(
  ACCEPT_INVITATION,
  (newUser, hostUserId) => ({ newUser, hostUserId })
);

export const acceptInvitationApply = createAction(
  ACCEPT_INVITATION_APPLY,
  (payload) => ({ ...payload })
);

export const confirmInvitationApply = createAction(
  CONFIRM_INVITATION_APPLY,
  (userId, accepted) => ({ userId, accepted })
);

export const confirmAccessibilityRequirements = createAction(
  CONFIRM_ACCESSIBILITY_REQUIREMENTS,
  (userId) => ({ userId })
);

export const getAllUsers = createAction(GET_USERS);
export const setAllUsers = createAction(SET_USERS, (users) => ({ users }));

export const acceptTermsAndConditions = createAction(
  ACCEPT_TERMS_CONDITIONS_GCONFERENCE,
  (id) => ({ id })
);

export const viewRulesGConference = createAction(
  VIEW_RULES_G_CONFERENCE,
  (id) => ({ id })
);

export const countAllUsers = createAction(COUNT_ALL_USERS);
export const setCountUsers = createAction(SET_ALL_COUNT_USERS, (userCount) => ({
  userCount,
}));

export const searchUser = createAction(SEARCH_USER, (search) => ({ search }));
export const setSearchedUsers = createAction(
  SET_SEARCHED_USERS,
  (searchUsers) => ({ searchUsers })
);

export const setUserShow = createAction(SET_USER_SHOW, (userShow) => ({
  userShow,
}));

export const setVisibleProfileUser = createAction(
  SET_VISIBLE_PROFILE_USER,
  (visibleProfileUser) => ({ visibleProfileUser })
);

export const setPagesSearchedUsers = createAction(
  SET_PAGES_SEARCHED_USERS,
  (count) => ({ count })
);

export const handleOnline = createAction(HANDLE_ONLINE, (user) => ({ user }));

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
  joinedSession,
  addBonfire,
  removeBonfire,
  uploadResume,
  deleteResume,
  changePassword,
  createInvitation,
  acceptInvitation,
  acceptInvitationApply,
  confirmInvitationApply,
  getAllUsers,
  setAllUsers,
  acceptTermsAndConditions,
  viewRulesGConference,
  countAllUsers,
  setCountUsers,
  handleOnline,
  searchUser,
  setSearchedUsers,
  setUserShow,
  setVisibleProfileUser,
  setPagesSearchedUsers,
};
