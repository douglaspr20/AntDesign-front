import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { notification } from "antd";

import EventList from "pages/Events/EventList";
import { CustomButton } from "components";
import EventAddEditDrawer from "containers/EventAddEditDrawer";

import {
  getChannelEvents,
  deleteEvent,
  setEvent,
} from "redux/actions/event-actions";
import { eventSelector } from "redux/selectors/eventSelector";
import { channelSelector } from "redux/selectors/channelSelector";

const EventsList = ({
  isOwner,
  filter,
  channelEvents,
  channel,
  getChannelEvents,
  deleteEvent,
  setEvent,
}) => {
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const onAddEvent = () => {
    setEditMode(false);
    setVisibleDrawer(true);
  };

  const handleEvent = (menu, event) => {
    switch (menu) {
      case "edit":
        setEditMode(true);
        setEvent(event);
        setVisibleDrawer(true);
        break;
      case "delete":
        deleteEvent(event, (err) => {
          if (err) {
            notification.error({
              message: err,
            });
          } else {
            notification.info({
              message: "Event was successfully deleted.",
            });
            getChannelEvents({ ...filter, channel: channel.id });
          }
        });
        break;
      default:
        break;
    }
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
        edit={editMode}
        onAdded={() => {
          setVisibleDrawer(false);
          getChannelEvents({ ...filter, channel: channel.id });
        }}
        onClose={() => setVisibleDrawer(false)}
      />
      {isOwner && <CustomButton text="Add Event" onClick={onAddEvent} />}
      <EventList
        edit={isOwner}
        data={channelEvents}
        onMenuClick={handleEvent}
      />
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
  deleteEvent,
  setEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
