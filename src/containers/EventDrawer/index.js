import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import { CheckOutlined } from "@ant-design/icons";
import { Menu, Dropdown } from "antd";

import {
  DateAvatar,
  CustomButton,
  CustomDrawer,
  SpecialtyItem,
} from "components";
import { EVENT_TYPES, MONTH_NAMES } from "enum";
import Emitter from "services/emitter";
import { actions as eventActions } from "redux/actions/event-actions";
import { eventSelector } from "redux/selectors/eventSelector";

import "./style.scss";

const EventDrawer = ({
  updatedEvent,
  addToMyEventList,
  removeFromMyEventList,
}) => {
  const DataFormat = "YYYY.MM.DD hh:mm A";

  const [visible, setVisible] = useState(false);
  const [event, setEvent] = useState({});

  Emitter.on(EVENT_TYPES.EVENT_VIEW_DETAIL, (data) => {
    setVisible(true);
    setEvent({
      ...data,
      day: moment(data.date, DataFormat).date(),
      month: MONTH_NAMES[moment(data.date, DataFormat).month()],
    });
  });

  Emitter.on(EVENT_TYPES.MY_PAST_EVENT_CHANGED, (data) => {
    setEvent(data);
  });

  const onDrawerClose = () => {
    setVisible(false);
  };

  const onAttend = () => {
    addToMyEventList(event);
  };

  const onCancelAttend = () => {
    removeFromMyEventList(event);
  };

  const onClickClaimDigitalCertificate = (e) => {};

  const onClickConfirm = (e) => {
    Emitter.emit(EVENT_TYPES.OPEN_ATTENDANCE_DISCLAIMER, event);
  };

  const onClickClaimCredits = (e) => {};

  useEffect(() => {
    if (event && updatedEvent && event.id === updatedEvent.id) {
      setEvent({
        ...updatedEvent,
        day: moment(updatedEvent.date, DataFormat).date(),
        month: MONTH_NAMES[moment(updatedEvent.date, DataFormat).month()],
      });
    }
  }, [event, updatedEvent]);

  const menu = (
    <Menu>
      <Menu.Item>Google</Menu.Item>
      <Menu.Item>Google</Menu.Item>
      <Menu.Item>Google</Menu.Item>
    </Menu>
  );

  return (
    <CustomDrawer
      title={""}
      width={772}
      visible={visible}
      onClose={onDrawerClose}
    >
      <div className="event-details">
        <div className="event-details-header">
          {event.image2 && <img src={event.image2} alt="event-img" />}
          {!event.image2 && event.image && (
            <img src={event.image} alt="event-img" />
          )}
        </div>
        <div className="event-details-content">
          <div className="event-details-content-actions">
            <DateAvatar day={event.day || 0} month={event.month || ""} />
            {event.status === "past" && (
              <div className="claim-buttons">
                <CustomButton
                  className="claim-digital-certificate"
                  text="Confirm I attended this event"
                  size="md"
                  type="primary outlined"
                  onClick={onClickConfirm}
                />
              </div>
            )}
            {event.status === "confirmed" && (
              <React.Fragment>
                <CustomButton
                  className="claim-digital-certificate"
                  text="Claim digital certificate"
                  size="lg"
                  type="primary outlined"
                  onClick={onClickClaimDigitalCertificate}
                />
                <CustomButton
                  text="Claim credits"
                  size="lg"
                  type="primary"
                  onClick={onClickClaimCredits}
                />
              </React.Fragment>
            )}
            {event.status === "attend" && (
              <CustomButton
                text="Attend"
                size="lg"
                type="primary"
                onClick={onAttend}
              />
            )}
            {event.status === "going" && (
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
              <h3 className="event-date">{event.period}</h3>
            </div>
            {!event.past && event.going && (
              <Dropdown overlay={menu}>
                <h3 className="add-to-calendar ant-dropdown-link">
                  Add to calendar
                </h3>
              </Dropdown>
            )}
          </div>
          <h3 className="event-type">{`${event.location} event`}</h3>
          <h3 className="event-cost">{event.ticket}</h3>
          {event.type && event.type.length > 0 && (
            <div className="event-topics">
              {event.type.map((tp, index) => (
                <SpecialtyItem key={index} title={tp} active={false} />
              ))}
            </div>
          )}
          <h3 className="event-details-content-subtitle">About the event</h3>
          <p className="event-details-content-subtext">{event.about}</p>
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

const mapStateToProps = (state) => ({
  updatedEvent: eventSelector(state).updatedEvent,
});

const mapDispatchToProps = {
  ...eventActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDrawer);
