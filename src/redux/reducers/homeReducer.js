import { handleActions } from "redux-actions";
import { Map } from "immutable";
import cloneDeep from "lodash/cloneDeep";

// Action Type Imports
import { constants as homeConstants } from "../actions/home-actions";

const EventData = [
  {
    id: 1,
    date: "2021.01.06 19:00 pm",
    title: "Meetup - How to improve your soft skills",
    timezone: "EST",
    type: "Online event",
    cost: "Free",
    going: false,
    img: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    topics: ["Community cultivator", "Leadership", "Recruiting"],
  },
  {
    id: 2,
    date: "2021.01.06 19:00 pm",
    title: "Meetup - Beers and HHRR after work",
    timezone: "EST",
    type: "Online event",
    cost: "Free",
    going: false,
    img: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    topics: [
      "Human Resources",
      "Leadership",
      "Recruiting",
      "Design",
      "Community cultivator",
      "Technology",
    ],
  },
  {
    id: 3,
    date: "2021.01.12 19:00 pm",
    title: "Bay area job seekers and recruiters network skills",
    timezone: "EST",
    type: "Online event",
    cost: "Free",
    going: false,
    img: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    topics: [],
  },
  {
    id: 4,
    date: "2021.01.13 19:00 pm",
    title: "Bay area job seekers and recruiters network skills",
    timezone: "EST",
    type: "Online event",
    cost: "Free",
    going: false,
    img: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    topics: [
      "Human Resources",
      "Leadership",
      "Recruiting",
      "Design",
      "Community cultivator",
      "Technology",
    ],
  },
  {
    id: 5,
    date: "2021.01.18 19:00 pm",
    title: "Bay area job seekers and recruiters network skills",
    timezone: "EST",
    type: "Online event",
    cost: "Free",
    going: false,
    img: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  },
  {
    id: 6,
    date: "2021.01.21 19:00 pm",
    title: "Bay area job seekers and recruiters network skills",
    timezone: "EST",
    type: "Online event",
    cost: "Free",
    going: false,
    img: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  },
];

const MyPastEvents = [
  {
    id: 1,
    date: "2021.01.06 19:00 pm",
    title: "Meetup - How to improve your soft skills",
    timezone: "EST",
    type: "Online event",
    cost: "Free",
    going: false,
    past: true,
    img: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    topics: ["Community cultivator", "Leadership", "Recruiting"],
  },
  {
    id: 2,
    date: "2021.01.06 19:00 pm",
    title: "Meetup - Beers and HHRR after work",
    timezone: "EST",
    type: "Online event",
    cost: "Free",
    going: false,
    past: true,
    img: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    topics: [
      "Human Resources",
      "Leadership",
      "Recruiting",
      "Design",
      "Community cultivator",
      "Technology",
    ],
  },
];

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
  [homeConstants.UPDATE_EVENTS]: (state, { payload }) => {
    return state.merge({ events: cloneDeep(payload.events) });
  },
  [homeConstants.UPDATE_MY_EVENTS]: (state, { payload }) => {
    return state.merge({ myEvents: cloneDeep(payload.myEvents) });
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
    planUpdated: false,
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
    events: EventData || [],
    myEvents: [],
    myPastEvents: MyPastEvents,
    setting: {
      collapsed: {
        mentor: false,
        mentee: false,
      },
    },
  });

export default handleActions(reducers, initialState());
