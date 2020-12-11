import React from "react";
import PropTypes from "prop-types";

import { Tabs } from "components";
import EventList from "./EventList";

import "./style.scss";

const EventsPage = () => {
  const UPcomingEvents = [
    {
      date: "2020.11.18 19:00 pm",
      title: "Meetup - How to improve your soft skills",
      timezone: "EST",
      type: "Online event",
      cost: "Free",
      going: false,
      img:
        "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    },
    {
      date: "2020.11.18 19:00 pm",
      title: "Meetup - Beers and HHRR after work",
      timezone: "EST",
      type: "Online event",
      cost: "Free",
      going: true,
      img:
        "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    },
    {
      date: "2020.11.22 19:00 pm",
      title: "Bay area job seekers and recruiters network skills",
      timezone: "EST",
      type: "Online event",
      cost: "Free",
      going: false,
      img:
        "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    },
    {
      date: "2020.11.22 19:00 pm",
      title: "Bay area job seekers and recruiters network skills",
      timezone: "EST",
      type: "Online event",
      cost: "Free",
      going: false,
      img:
        "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    },
    {
      date: "2020.11.23 19:00 pm",
      title: "Bay area job seekers and recruiters network skills",
      timezone: "EST",
      type: "Online event",
      cost: "Free",
      going: false,
      img:
        "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    },
    {
      date: "2020.11.24 19:00 pm",
      title: "Bay area job seekers and recruiters network skills",
      timezone: "EST",
      type: "Online event",
      cost: "Free",
      going: false,
      img:
        "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    },
  ];

  const MyEvents = [];

  const TabData = [
    {
      title: "Upcoming events",
      content: () => <EventList data={UPcomingEvents} />,
    },
    {
      title: "My events",
      content: () => <EventList data={MyEvents} />,
    },
  ];

  return (
    <div className="events-page">
      <div className="events-page-container">
        <Tabs data={TabData} />
      </div>
    </div>
  );
};

EventsPage.propTypes = {
  title: PropTypes.string,
};

EventsPage.defaultProps = {
  title: "",
};

export default EventsPage;
