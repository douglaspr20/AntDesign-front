import INTERNAL_LINKS from "./InternalLinks";

import IconHome from "images/icon-home.svg";
import IconLibrary from "images/icon-library.svg";
import IconMentoring from "images/icon-mentoring.svg";
import IconCalendar from "images/icon-calendar.svg";
import IconMedal from "images/icon-medal.svg";
import IconReader from "images/icon-reader.svg";
import IconStar from "images/icon-star.svg";
import IconBookmark from "images/icon-bookmark.svg";

export default {
  TOP_MENUS: [
    {
      label: "Home",
      icon: IconHome,
      url: INTERNAL_LINKS.HOME,
    },
    {
      label: "Learning library",
      icon: IconLibrary,
      url: "/#",
    },
    {
      label: "Mentoring",
      icon: IconMentoring,
      url: "/#",
    },
    {
      label: "Events",
      icon: IconCalendar,
      url: "/#",
    },
    {
      label: "Certifications",
      icon: IconMedal,
      url: "/#",
    },
    {
      label: "Hub",
      icon: IconReader,
      url: "/#",
    },
  ],
  BOTTOM_MENUS: [
    {
      label: "Favorites",
      icon: IconStar,
      url: "/#",
    },
    {
      label: "Read later",
      icon: IconBookmark,
      url: "/#",
    },
  ],
};
