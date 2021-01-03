import React from "react";
import PropTypes from "prop-types";
import Emitter from "services/emitter";
import { connect } from "react-redux";

import { Tabs, FilterPanel } from "components";
import EventList from "./EventList";
import { updateEventData, updateMyEventData } from "redux/actions/home-actions";
import { homeSelector } from "redux/selectors/homeSelector";
import { EVENT_TYPES } from "enum";

import "./style.scss";

const EventsPage = ({
  events,
  myEvents,
  updateEventData,
  updateMyEventData,
}) => {
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

  const TabData = [
    {
      title: "Upcoming events",
      content: () => <EventList data={events} onAttend={addMyEvents} />,
    },
    {
      title: "My events",
      content: () => <EventList data={myEvents} onAttend={addMyEvents} />,
    },
    {
      title: "My past events",
      content: () => <EventList data={[]} onAttend={addMyEvents} />,
    },
  ];

  return (
    <div className="events-page">
      <div className="events-page-filter">
        <FilterPanel title="Categories" />
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
});

const mapDispatchToProps = {
  updateEventData,
  updateMyEventData,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);
