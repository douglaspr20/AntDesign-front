import { createAction } from "redux-actions";

const SET_MENTORING_INFO = "SET_MENTORING_INFO";
const UPDATE_MENTORING_INFO = "UPDATE_MENTORING_INFO";
const SAVE_MENTORING_INFO = "SAVE_MENTORING_INFO";
const SET_MENTORING_LOADING = "SET_MENTORING_LOADING";
const GET_MENTORING_INFO = "GET_MENTORING_INFO";
const GET_MENTOR_LIST = "GET_MENTOR_LIST";
const SET_MENTOR_LIST = "SET_MENTOR_LIST";
const GET_MENTEE_LIST = "GET_MENTEE_LIST";
const SET_MENTEE_LIST = "SET_MENTEE_LIST";

export const constants = {
  SET_MENTORING_INFO,
  SAVE_MENTORING_INFO,
  SET_MENTORING_LOADING,
  GET_MENTOR_LIST,
  SET_MENTOR_LIST,
  GET_MENTEE_LIST,
  SET_MENTEE_LIST,
  GET_MENTORING_INFO,
  UPDATE_MENTORING_INFO,
};

// ------------------------------------
// Actions
// ------------------------------------
export const setMentoringInfo = createAction(SET_MENTORING_INFO, (info) => ({
  info,
}));
export const updateMentoringInfo = createAction(
  UPDATE_MENTORING_INFO,
  (info) => ({ info })
);
export const saveMentoringInfo = createAction(SAVE_MENTORING_INFO, (info) => ({
  info,
}));
export const setMentoringLoading = createAction(
  SET_MENTORING_LOADING,
  (loading) => ({ loading })
);
export const getMentoringInfo = createAction(GET_MENTORING_INFO);
export const getMentorList = createAction(GET_MENTOR_LIST, (params) => ({
  params,
}));
export const setMentorList = createAction(SET_MENTOR_LIST, (page, mentors) => ({
  page,
  mentors,
}));
export const getMenteeList = createAction(GET_MENTEE_LIST, (params) => ({
  params,
}));
export const setMenteeList = createAction(SET_MENTEE_LIST, (page, mentees) => ({
  page,
  mentees,
}));

export const actions = {
  setMentoringInfo,
  saveMentoringInfo,
  setMentoringLoading,
  getMentorList,
  setMentorList,
  getMenteeList,
  setMenteeList,
  getMentoringInfo,
  updateMentoringInfo,
};
