import React, { useState } from "react";
import PropTypes from "prop-types";

import EventList from "pages/Events/EventList";
import { CustomButton } from "components";
import EventAddEditDrawer from "containers/EventAddEditDrawer";

const EventsList = ({ events, isOwner, filter }) => {
  const [visibleDrawer, setVisibleDrawer] = useState(false);

  const onAddEvent = () => {
    setVisibleDrawer(true);
  };

  return (
    <div className="channel-page__list-wrap channels-page__events-list-wrap">
      <EventAddEditDrawer
        visible={visibleDrawer}
        onAdded={() => {}}
        onClose={() => setVisibleDrawer(false)}
      />
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
