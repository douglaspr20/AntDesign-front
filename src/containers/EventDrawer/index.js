import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { CheckOutlined } from "@ant-design/icons";

import { DateAvatar, CustomButton, CustomDrawer } from "components";
import { EVENT_TYPES, MONTH_NAMES } from "enum";
import Emitter from "services/emitter";

import "./style.scss";

const EventDrawer = () => {
  const DataFormat = "YYYY.MM.DD hh:mm A";

  const [visible, setVisible] = useState(false);
  const [event, setEvent] = useState({});

  Emitter.on(EVENT_TYPES.EVENT_VIEW_ARTICLE, (data) => {
    setVisible(true);
    setEvent({
      ...data,
      dateStr: `${moment(data.date, DataFormat).format("DD MMM . hh:mm A")} ${
        data.timezone
      }`,
      day: moment(data.date, DataFormat).date(),
      month: MONTH_NAMES[moment(data.date, DataFormat).month()],
      about:
        "Sometimes things don’t go according to plan. Tools break, wires get crossed, the best-laid plans fall apart. And on those occasions, it helps to know exactly what happened—so it doesn’t happen again. Moments like these are when we at Buffer turn to a simple but remarkably effective process: The 5 Whys.",
      Sponsors: [
        "Sometimes things don’t go according to plan. Tools break, wires get crossed, the best-laid plans fall apart. And on those occasions, it helps to know exactly what happened—so it doesn’t happen again. Moments like these are when we at Buffer turn to a simple but remarkably effective process: The 5 Whys.",
        "It’s just as it sounds: A discussion of the unexpected event or challenge that follows one train of thought to its logical conclusion by asking “Why?” five times to get to the root of what happened.",
        "But it’s also a lot deeper than that, too. Let’s take a look at the origin and history of this unique process, and I’ll tell you a bit about how it works for us on our remote team at Buffer—and how it could work for you, too.",
      ],
    });
  });

  const onDrawerClose = () => {
    setVisible(false);
  };

  const onAttend = () => {
    setEvent((prev) => ({ ...prev, going: true }));
  };

  const onCancelAttend = () => {
    setEvent((prev) => ({ ...prev, going: false }));
  };

  useEffect(() => {
    Emitter.emit(EVENT_TYPES.EVENT_CHANGED, event);
  }, [event]);

  return (
    <CustomDrawer
      title={""}
      width={772}
      visible={visible}
      onClose={onDrawerClose}
    >
      <div className="event-details">
        <div className="event-details-header">
          <img src={event.img} alt="event-img" />
        </div>
        <div className="event-details-content">
          <div className="event-details-content-actions">
            <DateAvatar day={event.day || 0} month={event.month || ""} />
            {!event.going && (
              <CustomButton
                text="Attend"
                size="lg"
                type="primary"
                onClick={onAttend}
              />
            )}
            {event.going && (
              <React.Fragment>
                <div className="going-label">
                  <CheckOutlined />
                  <span>I'm going</span>
                </div>
                <CustomButton
                  className="not-going-btn"
                  text="Not going"
                  size="lg"
                  type="remove"
                  remove={true}
                  onClick={onCancelAttend}
                />
              </React.Fragment>
            )}
          </div>
          <h1 className="event-title">{event.title}</h1>
          <div className="d-flex items-center event-info">
            <div className="d-flex items-center">
              <h3 className="event-date">
                {moment(event.date, DataFormat).format("DD MMM")}
              </h3>
              <i className="fas fa-circle" />
              <h3 className="event-date">
                {`${moment(event.date, DataFormat).format("hh:mm A")} ${
                  event.timezone
                }`}
              </h3>
            </div>
            <h3 className="add-to-calendar">Add to calendar</h3>
          </div>
          <h3 className="event-type">{event.type}</h3>
          <h3 className="event-cost">{event.cost}</h3>
          <h3 className="event-details-content-subtitle">About the event</h3>
          <p className="event-details-content-subtext">{event.about}</p>
          <h3 className="event-details-content-subtitle">Sponsors</h3>
          {(event["Sponsors"] || []).map((item, index) => (
            <p key={index} className="event-details-content-subtext">
              {item}
            </p>
          ))}
        </div>
      </div>
    </CustomDrawer>
  );
};

EventDrawer.propTypes = {
  title: PropTypes.string,
};

EventDrawer.defaultProps = {
  title: "",
};

export default EventDrawer;
