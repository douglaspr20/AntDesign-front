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
    const { page, mentors } = payload;
    let allMentors = state.get("allMentors");
    if (page !== 1) {
      mentors.forEach((item) => {
        let index = allMentors.findIndex((mnt) => mnt.id === item.id);
        if (index >= 0) {
          allMentors[index] = item;
        } else {
          allMentors.push(item);
        }
      });
    } else {
      allMentors = mentors;
    }
    return state.merge({
      allMentors: cloneDeep(allMentors),
    });
  },
  [mentoringConstants.SET_MENTEE_LIST]: (state, { payload }) => {
    const { page, mentees } = payload;
    let allMentees = state.get("allMentees");
    if (page !== 1) {
      mentees.forEach((item) => {
        let index = allMentees.findIndex((mnt) => mnt.id === item.id);
        if (index >= 0) {
          allMentees[index] = item;
        } else {
          allMentees.push(item);
        }
      });
    } else {
      allMentees = mentees;
    }
    return state.merge({
      allMentees: cloneDeep(allMentees),
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
