// Action Type Imports
import {
  SET_LOADING,
  SET_PLAN_UPDATED,
  UPDATE_USER_INFO,
  UPDATE_EVENTS,
  UPDATE_MY_EVENTS,
  SET_SETTING_COLLAPSED,
} from "../actions/home-actions";

const EventData = [
  {
    id: 1,
    date: "2020.11.18 19:00 pm",
    title: "Meetup - How to improve your soft skills",
    timezone: "EST",
    type: "Online event",
    cost: "Free",
    going: false,
    img: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  },
  {
    id: 2,
    date: "2020.11.18 19:00 pm",
    title: "Meetup - Beers and HHRR after work",
    timezone: "EST",
    type: "Online event",
    cost: "Free",
    going: false,
    img: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  },
  {
    id: 3,
    date: "2020.11.22 19:00 pm",
    title: "Bay area job seekers and recruiters network skills",
    timezone: "EST",
    type: "Online event",
    cost: "Free",
    going: false,
    img: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  },
  {
    id: 4,
    date: "2020.11.22 19:00 pm",
    title: "Bay area job seekers and recruiters network skills",
    timezone: "EST",
    type: "Online event",
    cost: "Free",
    going: false,
    img: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  },
  {
    id: 5,
    date: "2020.11.23 19:00 pm",
    title: "Bay area job seekers and recruiters network skills",
    timezone: "EST",
    type: "Online event",
    cost: "Free",
    going: false,
    img: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  },
  {
    id: 6,
    date: "2020.11.24 19:00 pm",
    title: "Bay area job seekers and recruiters network skills",
    timezone: "EST",
    type: "Online event",
    cost: "Free",
    going: false,
    img: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  },
];

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
  events: EventData || [],
  myEvents: [],
  setting: {
    collapsed: {
      mentor: false,
      mentee: false,
    },
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
    case UPDATE_EVENTS:
      return {
        ...state,
        events: [...(action.payload || [])],
      };
    case UPDATE_MY_EVENTS:
      return {
        ...state,
        myEvents: [...(action.payload || [])],
      };
    case SET_SETTING_COLLAPSED:
      return {
        ...state,
        setting: {
          ...state.setting,
          collapsed: {
            ...state.setting.collapsed,
            ...action.payload,
          },
        },
      };
    default:
      return { ...state };
  }
}
