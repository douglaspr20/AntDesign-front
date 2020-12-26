// Action Type Imports
import {
  SET_LOADING,
  SET_PLAN_UPDATED,
  UPDATE_USER_INFO,
} from "../actions/home-actions";

const initialState = {
  loading: false,
  planUpdated: false,
  userProfile: {
    firstName: "Edgar",
    lastName: "Davis",
    company: "",
    abbrName: "ED",
    img: null,
    about: `Developing Talent & Leadership behaviors. Positive Design Thinking & Strategy through Positive Leadership Strategy and POSITIVE & AGILE coaching | 2 hack habits, goal achievement, and behavior transformation in organizations, sports clubs, PYMES, and corporations.`,
    titleProfessions: "HR Management & Coaching",
    proficiencyLevel: "",
    topicsOfInterest: [],
    personalLinks: {},
    language: "",
    timezone: "",
    completed: false,
    percentOfCompletion: 36,
  },
};
// Home Page's Reducer
export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_PLAN_UPDATED:
      return {
        ...state,
        planUpdated: action.payload,
      };
    case UPDATE_USER_INFO:
      return {
        ...state,
        userProfile: { ...(action.payload || {}) },
      };
    default:
      return { ...state };
  }
}
