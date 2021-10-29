import INTERNAL_LINKS from "./InternalLinks";

import IconHome from "images/icon-home.svg";
import IconLibrary from "images/icon-library.svg";
import IconMentoring from "images/icon-mentoring.svg";
import IconCalendar from "images/icon-calendar.svg";
import IconMedal from "images/icon-medal.svg";
import IconReader from "images/icon-reader.svg";
import IconStar from "images/icon-star.svg";
// import IconJourney from "images/icon-learning-journey.svg";
import IconBookmark from "images/icon-bookmark.svg";
// import IconHeartOutline from "images/icon-heart-outline.svg";
import IconHeadsetOutline from "images/icon-headset-outline.svg";
import IconStoreFrontOutline from "images/icon-storefront-outline.svg";
import IconConferenceVideo from "images/icon-sidebar-video.svg";
import IconTvOutline from "images/icon-tv-outline.svg";
// import IconGlobal from "images/icon-global.svg";

export default {
  TOP_MENUS: [
    {
      label: "Home",
      icon: IconHome,
      url: INTERNAL_LINKS.HOME,
    },
    // {
    //   label: "Global Conference",
    //   icon: IconGlobal,
    //   url: INTERNAL_LINKS.GLOBAL_CONFERENCE,
    // },
    {
      label: "Channels",
      icon: IconTvOutline,
      url: INTERNAL_LINKS.CHANNELS,
    },
    {
      label: "Learning library",
      icon: IconLibrary,
      url: INTERNAL_LINKS.LEARNING_LIBRARY,
    },
    {
      label: "Conference library",
      icon: IconConferenceVideo,
      url: INTERNAL_LINKS.CONFERENCE_LIBRARY,
    },
    {
      label: "Mentoring",
      icon: IconMentoring,
      url: INTERNAL_LINKS.MENTORING,
    },
    {
      label: "Events",
      icon: IconCalendar,
      url: INTERNAL_LINKS.EVENTS,
    },
    {
      label: "Classes",
      icon: IconMedal,
      url: INTERNAL_LINKS.CLASSES,
    },
    // {
    //   label: "Learning Journeys",
    //   icon: IconJourney,
    //   url: INTERNAL_LINKS.JOURNEY,
    // },
    {
      label: "Podcast",
      icon: IconHeadsetOutline,
      url: INTERNAL_LINKS.PODCAST,
    },
    {
      label: "HR Marketplace",
      icon: IconStoreFrontOutline,
      url: INTERNAL_LINKS.MARKETPLACE,
    },
  ],
  BOTTOM_MENUS: [
    {
      label: "Favorites",
      icon: IconStar,
      url: INTERNAL_LINKS.FAVORITES,
    },
    {
      label: "Read later",
      icon: IconBookmark,
      url: INTERNAL_LINKS.READ_LATER,
    },
  ],
};
