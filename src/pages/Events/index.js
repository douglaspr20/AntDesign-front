import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import isEqual from "lodash/isEqual";
import clsx from "clsx";

import { Tabs, EventFilterPanel } from "components";
import EventList from "./EventList";
import {
  getAllEvent,
  addToMyEventList,
  removeFromMyEventList,
  getMyEvents,
} from "redux/actions/event-actions";
import { eventSelector } from "redux/selectors/eventSelector";
import EventFilterDrawer from "./EventFilterDrawer";

import "./style.scss";

const EventsPage = ({
  allEvents,
  myEvents,
  getAllEvent,
  getMyEvents,
  addToMyEventList,
  removeFromMyEventList,
}) => {
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [visibleFilter, setVisibleFilter] = useState(false);
  const [currentTab, setCurrentTab] = useState("0");

  const addMyEvents = (event) => {
    if (event.going) {
      addToMyEventList(event);
    } else {
      removeFromMyEventList(event);
    }
  };

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
});

const mapDispatchToProps = {
  getAllEvent,
  getMyEvents,
  addToMyEventList,
  removeFromMyEventList,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);
