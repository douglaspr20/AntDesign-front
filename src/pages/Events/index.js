import React, { useState, useEffect } from "react";
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
import {
  getAllEvent,
  addToMyEventList,
  removeFromMyEventList,
  getMyEvents,
} from "redux/actions/event-actions";
import { homeSelector } from "redux/selectors/homeSelector";
import { eventSelector } from "redux/selectors/eventSelector";
import { EVENT_TYPES } from "enum";
import EventFilterDrawer from "./EventFilterDrawer";

import "./style.scss";

const EventsPage = ({
  allEvents,
  myEvents,
  myPastEvents,
  getAllEvent,
  getMyEvents,
  updateEventData,
  updateMyEventData,
  updateMyPastEventData,
  addToMyEventList,
  removeFromMyEventList,
}) => {
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [visibleFilter, setVisibleFilter] = useState(false);
  const [currentTab, setCurrentTab] = useState("0");

  const addMyEvents = (event) => {
    if (event.going) {
      // const oldData = myEvents.filter((e) => e.id !== event.id);
      // updateMyEventData([...oldData, event]);
      addToMyEventList(event);
    } else {
      // const newData = myEvents.filter((e) => e.id !== event.id);
      // updateMyEventData(newData);
      removeFromMyEventList(event);
    }
  };

  // Emitter.on(EVENT_TYPES.EVENT_CHANGED, (event) => {
  //   console.log('****** event changed', event)
  //   const newEvents = allEvents;
  //   const index = allEvents.findIndex((item) => item.id === event.id);
  //   if (index >= 0) {
  //     newEvents[index] = event;
  //   }
  //   updateEventData(newEvents);
  //   addMyEvents(event);
  // });

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
          data={myEvents.filter((event) => event.status === "going")}
          onAttend={addMyEvents}
          showFilter={() => setVisibleFilter(true)}
        />
      ),
    },
    {
      title: "My past events",
      content: () => (
        <EventList
          data={myEvents.filter((event) => event.status !== "going")}
          onAttend={addMyEvents}
          showFilter={() => setVisibleFilter(true)}
        />
      ),
    },
  ];

  const onFilterChange = (params) => {
    setFilteredEvents((prev) => {
      prev = allEvents.filter((item) => {
        let flag = true;

        Object.keys(params).forEach((key) => {
          if (key === "all" && params[key]) {
            const eventDate = moment(item.date, "YYYY.MM.DD h:mm a");
            flag = eventDate.isAfter(moment());
            setCurrentTab("0");
            return flag;
          }

          if (key === "date") {
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
            setCurrentTab("0");
          } else if (key === "Topics") {
            flag =
              flag &&
              (params[key] || []).every(
                (tpc) =>
                  item.type &&
                  item.type.map((t) => t.toLowerCase()).includes(tpc)
              );
          }
        });

        return flag;
      });

      return [...prev];
    });
  };

  useEffect(() => {
    if (!allEvents || allEvents.length === 0) {
      getAllEvent();
    }
    if (!myEvents || myEvents.length === 0) {
      getMyEvents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onFilterChange({ date: moment() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allEvents]);

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
          <Tabs data={TabData} current={currentTab} onChange={setCurrentTab} />
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
  myEvents: eventSelector(state).myEvents,
  allEvents: eventSelector(state).allEvents,
  myPastEvents: homeSelector(state).myPastEvents,
});

const mapDispatchToProps = {
  updateEventData,
  updateMyEventData,
  updateMyPastEventData,
  getAllEvent,
  getMyEvents,
  addToMyEventList,
  removeFromMyEventList,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);
