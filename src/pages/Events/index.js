import React, { useState } from "react";
import PropTypes from "prop-types";
import Emitter from "services/emitter";

import { Tabs } from "components";
import EventList from "./EventList";

import { EVENT_TYPES } from "enum";

import "./style.scss";

const EventsPage = () => {
  const UPcomingEvents = [
    {
      id: 1,
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
      id: 2,
      date: "2020.11.18 19:00 pm",
      title: "Meetup - Beers and HHRR after work",
      timezone: "EST",
      type: "Online event",
      cost: "Free",
      going: false,
      img:
        "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    },
    {
      id: 3,
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
      id: 4,
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
      id: 5,
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
      id: 6,
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

  const [upcomingEvents, setUpcomingEvents] = useState(UPcomingEvents);
  const [myEvents, setMyEvents] = useState([]);

  const addMyEvents = (event) => {
    if (event.going) {
      setMyEvents((prevEvents) => {
        const oldData = prevEvents.filter((e) => e.id !== event.id);
        return [...oldData, event];
      });
    } else {
      setMyEvents((prevEvents) => prevEvents.filter((e) => e.id !== event.id));
    }
  };

  Emitter.on(EVENT_TYPES.EVENT_CHANGED, (event) => {
    setUpcomingEvents((prev) => {
      const index = prev.findIndex((item) => item.id === event.id);
      if (index >= 0) {
        prev[index] = event;
      }
      return [...prev];
    });
    addMyEvents(event);
  });

  const TabData = [
    {
      title: "Upcoming events",
      content: () => <EventList data={upcomingEvents} onAttend={addMyEvents} />,
    },
    {
      title: "My events",
      content: () => <EventList data={myEvents} onAttend={addMyEvents} />,
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
