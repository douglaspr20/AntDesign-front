import { createAction } from "redux-actions";

const GET_ALL_COURSES = "GET_ALL_COURSES";
const SET_ALL_COURSES = "SET_ALL_COURSES";
const GET_COURSE = "GET_COURSE";
const SET_COURSE = "SET_COURSE";
const GET_COURSE_CLASSES = "GET_COURSE_CLASSES";
const SET_COURSE_CLASSES = "SET_COURSE_CLASSES";
const SET_LOADING = "SET_COURSE_LOADING";

export const constants = {
  GET_ALL_COURSES,
  SET_ALL_COURSES,
  GET_COURSE,
  SET_COURSE,
  GET_COURSE_CLASSES,
  SET_COURSE_CLASSES,
  SET_LOADING,
};

// ------------------------------------
// Actions
// ------------------------------------
export const getAllCourses = createAction(GET_ALL_COURSES);
export const setAllCourses = createAction(SET_ALL_COURSES, (courses) => ({ courses }));
export const getCourse = createAction(GET_COURSE, (id) => ({ id }));
export const setCourse = createAction(SET_COURSE, (course) => ({ course }));
export const getCourseClasses = createAction(GET_COURSE_CLASSES, (id) => ({ id }));
export const setCourseClasses = createAction(SET_COURSE_CLASSES, (classes) => ({ classes }));
export const setLoading = createAction(SET_LOADING, (loading) => ({ loading }));

export const actions = {
  getAllCourses,
  setAllCourses,
  getCourse,
  setCourse,
  getCourseClasses,
  setCourseClasses,
  setLoading,
};
