import { handleActions } from "redux-actions";
import { Map } from "immutable";
import cloneDeep from "lodash/cloneDeep";

// Action Type Imports
import { constants as homeConstants } from "../actions/home-actions";

// Home Page's Reducer
export const reducers = {
  [homeConstants.SET_LOADING]: (state, { payload }) => {
    return state.merge({ ...payload });
  },
  [homeConstants.SET_PLAN_UPDATED]: (state, { payload }) => {
    return state.merge({ ...payload });
  },
  [homeConstants.UPDATE_USER_INFO]: (state, { payload }) => {
    return state.merge({
      userProfile: cloneDeep(payload.userProfile),
    });
  },
  [homeConstants.SET_SETTING_COLLAPSED]: (state, { payload }) => {
    return state.merge({
      setting: {
        collapsed: { ...state.get("setting").collapsed, ...payload.collapsed },
      },
    });
  },
};

export const initialState = () =>
  Map({
    loading: false,
    userProfile: {
      // firstName: "Edgar",
      // lastName: "Davis",
      // company: "",
      // abbrName: "ED",
      // img: null,
      // about: `Developing Talent & Leadership behaviors. Positive Design Thinking & Strategy through Positive Leadership Strategy and POSITIVE & AGILE coaching | 2 hack habits, goal achievement, and behavior transformation in organizations, sports clubs, PYMES, and corporations.`,
      // titleProfessions: "HR Management & Coaching",
      // proficiencyLevel: "",
      // topicsOfInterest: [],
      // personalLinks: {},
      // language: "",
      // timezone: "",
      // completed: false,
      // percentOfCompletion: 36,
    },
    setting: {
      collapsed: {
        mentor: false,
        mentee: false,
      },
    },
  });

export default handleActions(reducers, initialState());
