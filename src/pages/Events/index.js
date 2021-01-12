import React, { useState } from "react";
import PropTypes from "prop-types";
import Emitter from "services/emitter";
import { connect } from "react-redux";
import moment from "moment";
import isEqual from "lodash/isEqual";
import clsx from "clsx";

import { Tabs, EventFilterPanel } from "components";
import EventList from "./EventList";
import {
  updateEventData,
  updateMyEventData,
  updateMyPastEventData,
} from "redux/actions/home-actions";
import { homeSelector } from "redux/selectors/homeSelector";
import { EVENT_TYPES } from "enum";
import EventFilterDrawer from "./EventFilterDrawer";

import "./style.scss";

const EventsPage = ({
  events,
  myEvents,
  myPastEvents,
  updateEventData,
  updateMyEventData,
  updateMyPastEventData,
}) => {
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [visibleFilter, setVisibleFilter] = useState(false);

  const addMyEvents = (event) => {
    if (event.going) {
      const oldData = myEvents.filter((e) => e.id !== event.id);
      updateMyEventData([...oldData, event]);
    } else {
      const newData = myEvents.filter((e) => e.id !== event.id);
      updateMyEventData(newData);
    }
  };

  Emitter.on(EVENT_TYPES.EVENT_CHANGED, (event) => {
    const newEvents = events;
    const index = events.findIndex((item) => item.id === event.id);
    if (index >= 0) {
      newEvents[index] = event;
    }
    updateEventData(newEvents);
    addMyEvents(event);
  });

  Emitter.on(EVENT_TYPES.MY_PAST_EVENT_CHANGED, (event) => {
    const newEvents = myPastEvents;
    const index = myPastEvents.findIndex((item) => item.id === event.id);
    if (index >= 0) {
      newEvents[index] = event;
    }
    updateMyPastEventData(newEvents);
  });

  const TabData = [
    {
      title: "Upcoming events",
      content: () => (
        <EventList
          data={filteredEvents}
          onAttend={addMyEvents}
          showFilter={() => setVisibleFilter(true)}
        />
      ),
    },
    {
      title: "My events",
      content: () => (
        <EventList
          data={myEvents}
          onAttend={addMyEvents}
          showFilter={() => setVisibleFilter(true)}
        />
      ),
    },
    {
      title: "My past events",
      content: () => (
        <EventList
          data={myPastEvents}
          onAttend={addMyEvents}
          showFilter={() => setVisibleFilter(true)}
        />
      ),
    },
  ];

  const onFilterChange = (params) => {
    setFilteredEvents((prev) => {
      prev = events.filter((item) => {
        let flag = true;

        if (params.date) {
          const res = moment(item.date, "YYYY.MM.DD h:mm a");
          const eventDate = {
            year: res.year(),
            month: res.month(),
            day: res.date(),
          };

          const currentDate = {
            year: params.date.year(),
            month: params.date.month(),
            day: params.date.date(),
          };

          flag = isEqual(eventDate, currentDate);
        }

        return flag;
      });

      return [...prev];
    });
  };

  return (
    <div className="events-page">
      <EventFilterDrawer onFilterChange={onFilterChange} />
      <div className={clsx("events-page-filter", { visible: visibleFilter })}>
        <EventFilterPanel
          title="Categories"
          onFilterChange={onFilterChange}
          onClose={() => setVisibleFilter(false)}
        />
      </div>
      <div className="events-page-wrapper">
        <div className="events-page-container">
          <Tabs data={TabData} />
        </div>
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

const mapStateToProps = (state) => ({
  myEvents: homeSelector(state).myEvents,
  events: homeSelector(state).events,
  myPastEvents: homeSelector(state).myPastEvents,
});

const mapDispatchToProps = {
  updateEventData,
  updateMyEventData,
  updateMyPastEventData,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);
