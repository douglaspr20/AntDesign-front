import { handleActions } from "redux-actions";
import { Map } from "immutable";
import cloneDeep from "lodash/cloneDeep";

// Action Type Imports
import { constants as mentoringConstants } from "../actions/mentoring-actions";

// Events's Reducer
export const reducers = {
  [mentoringConstants.SAVE_MENTORING_INFO]: (state, { payload }) => {
    const updates = payload.info.reduce((res, item) => {
      return { ...res, [item.isMentor ? "mentorInfo" : "menteeInfo"]: item };
    }, {});
    return state.merge(updates);
  },
  [mentoringConstants.SET_MENTORING_LOADING]: (state, { payload }) => {
    return state.merge({
      loading: payload.loading,
    });
  },
  [mentoringConstants.SET_MENTOR_LIST]: (state, { payload }) => {
    const { currentPage, countOfResults, mentorList } = payload;
    let allMentors = state.get("allMentors");
    if (currentPage !== 1) {
      allMentors = [...allMentors, ...mentorList];
    } else {
      allMentors = mentorList;
    }
    return state.merge({
      allMentors: cloneDeep(allMentors),
      currentPage1: parseInt(currentPage, 10),
      countOfResults1: parseInt(countOfResults, 10),
    });
  },
  [mentoringConstants.SET_MENTEE_LIST]: (state, { payload }) => {
    const { currentPage, countOfResults, menteeList } = payload;
    let allMentees = state.get("allMentees");
    if (currentPage !== 1) {
      allMentees = [...allMentees, ...menteeList];
    } else {
      allMentees = menteeList;
    }
    return state.merge({
      allMentees: cloneDeep(allMentees),
      currentPage2: parseInt(currentPage, 10),
      countOfResults2: parseInt(countOfResults, 10),
    });
  },
};

export const initialState = () =>
  Map({
    loading: false,
    mentorInfo: {},
    menteeInfo: {},
    allMentors: [],
    allMentees: [],
    countOfResults1: 0,
    currentPage1: 1,
    countOfResults2: 0,
    currentPage2: 1,
  });

export default handleActions(reducers, initialState());
