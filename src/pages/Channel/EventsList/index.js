import React from "react";
import PropTypes from "prop-types";

import EventList from "pages/Events/EventList";
import { CustomButton } from "components";

const EventsList = ({ events, isOwner, filter }) => {
  const onAddEvent = () => {};

  return (
    <div className="channel-page__list-wrap channels-page__events-list-wrap">
      {isOwner && <CustomButton text="Add Event" onClick={onAddEvent} />}
      <EventList data={events} />
    </div>
  );
};

EventsList.propTypes = {
  events: PropTypes.array,
  isOwner: PropTypes.bool,
  filter: PropTypes.object,
};

EventsList.defaultProps = {
  events: [],
  isOwner: false,
  filter: {},
};

export default EventsList;
