import { handleActions } from "redux-actions";
import { Map } from "immutable";
import cloneDeep from "lodash/cloneDeep";

// Action Type Imports
import { constants as courseConstants } from "../actions/course-actions";

// COURSE's Reducer
export const reducers = {
  [courseConstants.SET_ALL_COURSES]: (state, { payload }) => {
    console.log(payload);
    return state.merge({ allCourses: cloneDeep(payload.courses) });
  },
  [courseConstants.SET_COURSE]: (state, { payload }) => {
    return state.merge({ course: payload.course });
  },
  [courseConstants.SET_COURSE_CLASSES]: (state, { payload }) => {
    console.log(payload);
    return state.merge({ classes: cloneDeep(payload.classes) });
  },
  [courseConstants.SET_LOADING]: (state, { payload }) => {
    return state.merge({ ...payload });
  },
};

export const initialState = () =>
  Map({
    loading: false,
    allCourses: [],
    course: {},
    classes: [],
  });

export default handleActions(reducers, initialState());
