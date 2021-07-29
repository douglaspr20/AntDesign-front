import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import isEqual from "lodash/isEqual";
import isEmpty from "lodash/isEmpty";
import clsx from "clsx";
import { notification } from "antd";

import { Tabs, EventFilterPanel } from "components";
import EventDrawer from "containers/EventDrawer";
import { MONTH_NAMES } from "enum";
import EventList from "./EventList";
import {
  getAllEvent,
  addToMyEventList,
  removeFromMyEventList,
  getMyEvents,
  claimEventAttendance,
  claimEventCredit,
} from "redux/actions/event-actions";
import { eventSelector } from "redux/selectors/eventSelector";
import EventFilterDrawer from "./EventFilterDrawer";
import EventClaimModal from "./EventClaimModal";

import "./style.scss";

const EventsPage = ({
  allEvents,
  myEvents,
  updatedEvent,
  getAllEvent,
  getMyEvents,
  addToMyEventList,
  removeFromMyEventList,
  claimEventAttendance,
  claimEventCredit,
}) => {
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [visibleFilter, setVisibleFilter] = useState(false);
  const [currentTab, setCurrentTab] = useState("0");
  const [filterParams, setFilterParams] = useState({});
  const [visible, setVisible] = useState(false);
  const [event, setEvent] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [eventForCredit, setEventForCredit] = useState({});

  const DataFormat = "YYYY.MM.DD hh:mm A";

  const addMyEvents = (event) => {
    if (event.going) {
      addToMyEventList(event);
    } else {
      removeFromMyEventList(event);
    }
  };

  const onEventClick = (event) => {
    setVisible(true);
    setEvent({
      ...event,
      day: moment(event.date, DataFormat).date(),
      month: MONTH_NAMES[moment(event.date, DataFormat).month()],
    });
  };

  const onConfirmAttendance = (event) => {
    claimEventAttendance(event.id);
  };

  const onConfirmCredit = (event) => {
    setEventForCredit(event);
    setModalVisible(true);
  };

  const onClaimCredit = () => {
    claimEventCredit(eventForCredit.id, (err) => {
      if (err) {
        notification.error({
          message: "Error",
          description: (err || {}).msg,
        });
      } else {
        notification.info({
          message: "Email was send successfully.",
        });
        setModalVisible(false);
      }
    });
  };

  const TabData = [
    {
      title: "Upcoming events",
      content: () => (
        <EventList
          data={filteredEvents}
          onAttend={addMyEvents}
          onClick={onEventClick}
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
          onClick={onEventClick}
          showFilter={() => setVisibleFilter(true)}
        />
      ),
    },
    {
      title: "My past events",
      content: () => (
        <EventList
          data={myEvents.filter(
            (event) => !["going", "attend"].includes(event.status)
          )}
          onAttend={addMyEvents}
          onClick={onEventClick}
          onConfirmAttendance={onConfirmAttendance}
          onConfirmCredit={onConfirmCredit}
          showFilter={() => setVisibleFilter(true)}
        />
      ),
    },
  ];

  const onFilterChange = (params, redirect = false) => {
    setFilterParams(params);
    setFilteredEvents((prev) => {
      prev = allEvents.filter((item) => {
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

        if (params["Topics"] && params["Topics"].length > 0) {
          flag =
            flag &&
            (params["Topics"] || []).some((tpc) =>
              item.categories.includes(tpc)
            );
        }

        if (isEmpty(params)) {
          const eventDate = moment(item.date, "YYYY.MM.DD h:mm a");
          flag = eventDate.isAfter(moment());
        }

        return flag;
      });
      return [...prev];
    });
    if (redirect) {
      setCurrentTab("0");
    }
  };

  const onEventDrawerClose = () => {
    setVisible(false);
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
    onFilterChange(filterParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allEvents]);

  useEffect(() => {
    if (event && updatedEvent && event.id === updatedEvent.id) {
      setEvent({
        ...updatedEvent,
        day: moment(updatedEvent.date, DataFormat).date(),
        month: MONTH_NAMES[moment(updatedEvent.date, DataFormat).month()],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedEvent]);

  useEffect(() => {
    onFilterChange({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("****** rendering ******");

  return (
    <div className="events-page">
      <EventFilterDrawer
        onFilterChange={(data) => onFilterChange(data, true)}
      />
      <div className={clsx("events-page-filter", { visible: visibleFilter })}>
        <EventFilterPanel
          title="Categories"
          onFilterChange={(data) => onFilterChange(data, true)}
          onClose={() => setVisibleFilter(false)}
        />
      </div>
      <div className="events-page-wrapper">
        <div className="events-page-container">
          <Tabs data={TabData} current={currentTab} onChange={setCurrentTab} />
        </div>
      </div>
      <EventDrawer
        visible={visible}
        event={event}
        onClose={onEventDrawerClose}
      />
      <EventClaimModal
        visible={modalVisible}
        title="HR Credit Offered"
        destroyOnClose={true}
        data={eventForCredit}
        onClaim={onClaimCredit}
        onCancel={() => setModalVisible(false)}
      />
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
  updatedEvent: eventSelector(state).updatedEvent,
});

const mapDispatchToProps = {
  getAllEvent,
  getMyEvents,
  addToMyEventList,
  removeFromMyEventList,
  claimEventAttendance,
  claimEventCredit,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);
