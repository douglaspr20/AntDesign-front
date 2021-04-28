import { combineReducers } from "redux";

import homeReducer from "./homeReducer";
import envReducer from "./envReducer";
import authReducer from "./authReducer";
import eventReducer from "./eventReducer";
import libraryReducer from "./libraryReducer";
import mentoringReducer from "./mentoringReducer";
import podcastReducer from "./podcastReducer";
import marketplaceReducer from "./marketplaceReducer";
import marketplaceCategoriesReducer from "./marketplaceCategoriesReducer";
import categoryReducer from "./categoryReducer";
import conferenceReducer from "./conferenceReducer";
import journeyReducer from "./journeyReducer";
import journeyItemReducer from "./journeyItemReducer";
import channelReducer from "./channelReducer";
import channelCategoryReducer from "./channelCategoryReducer";
import courseReducer from "./courseReducer";

export default combineReducers({
  home: homeReducer,
  env: envReducer,
  auth: authReducer,
  event: eventReducer,
  library: libraryReducer,
  mentoring: mentoringReducer,
  podcast: podcastReducer,
  marketplace: marketplaceReducer,
  marketplaceCategories: marketplaceCategoriesReducer,
  category: categoryReducer,
  conference: conferenceReducer,
  journey: journeyReducer,
  journeyItem: journeyItemReducer,
  channel: channelReducer,
  channelCategory: channelCategoryReducer,
  course: courseReducer,
});
