import React from 'react';
import PropTypes from 'prop-types';
import EventList from "pages/Events/EventList";
import NoItemsMessageCard from 'components/NoItemsMessageCard';

function EventsList({ events }) {

  return (
    <div className="channel-page__list-wrap channels-page__events-list-wrap">
      {events.length === 0
        ? <NoItemsMessageCard message={'There are no events for you at the moment'} />
        : (
          <EventList
            data={events}
          />
        )
      }
    </div>
  );
}

EventsList.propTypes = {
  events: PropTypes.array,
};

EventsList.defaultProps = {
  events: [],
};

export default EventsList;
