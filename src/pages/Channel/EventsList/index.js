import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import EventList from "pages/Events/EventList";
import { CustomButton } from "components";
import EventAddEditDrawer from "containers/EventAddEditDrawer";

import { getChannelEvents } from "redux/actions/event-actions";
import { eventSelector } from "redux/selectors/eventSelector";
import { channelSelector } from "redux/selectors/channelSelector";

const EventsList = ({
  isOwner,
  filter,
  channelEvents,
  channel,
  getChannelEvents,
}) => {
  const [visibleDrawer, setVisibleDrawer] = useState(false);

  const onAddEvent = () => {
    setVisibleDrawer(true);
  };

  useEffect(() => {
    if (channel && channel.id) {
      getChannelEvents({ ...filter, channel: channel.id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel, filter]);

  return (
    <div className="channel-page__list-wrap channels-page__events-list-wrap">
      <EventAddEditDrawer
        visible={visibleDrawer}
        onAdded={() => {}}
        onClose={() => setVisibleDrawer(false)}
      />
      {isOwner && <CustomButton text="Add Event" onClick={onAddEvent} />}
      <EventList data={channelEvents} />
    </div>
  );
};

EventsList.propTypes = {
  isOwner: PropTypes.bool,
  filter: PropTypes.object,
};

EventsList.defaultProps = {
  isOwner: false,
  filter: {},
};

const mapStateToProps = (state) => ({
  channelEvents: eventSelector(state).channelEvents,
  channel: channelSelector(state).selectedChannel,
});

const mapDispatchToProps = {
  getChannelEvents,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
