import React, { useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import clsx from "clsx";
import { Link } from "react-router-dom";

import { DateAvatar, CustomButton, SpecialtyItem } from "components";
import { getEvent } from "redux/actions/event-actions";
import { eventSelector } from "redux/selectors/eventSelector";
import { SETTINGS, INTERNAL_LINKS } from "enum";

import "./style.scss";

const monthStr = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];
const DataFormat = SETTINGS.DATE_FORMAT;

const PublicEventPage = ({ match, updatedEvent, getEvent }) => {
  useEffect(() => {
    if (match.params.id) {
      getEvent(match.params.id);
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="public-event-page">
      <div className="public-event-page-header">
        {updatedEvent.image2 && (
          <img src={updatedEvent.image2} alt="updatedEvent-img" />
        )}
        {!updatedEvent.image2 && updatedEvent.image && (
          <img src={updatedEvent.image} alt="event-img" />
        )}
        <div className="public-event-page-header-title">
          <DateAvatar
            day={
              updatedEvent.startDate
                ? moment(updatedEvent.date, DataFormat).date()
                : 0
            }
            month={
              updatedEvent.startDate
                ? monthStr[moment(updatedEvent.date, DataFormat).month()]
                : ""
            }
          />
          <h1
            className={clsx("event-title", {
              "no-image": !updatedEvent.image2 && !updatedEvent.image,
            })}
          >
            {updatedEvent.title}
          </h1>
          <Link to={INTERNAL_LINKS.JOIN}>
            <CustomButton text="Attend" size="lg" type="primary" />
          </Link>
        </div>
      </div>
      <div className="public-event-page-content">
        <h3 className="event-date">{updatedEvent.period}</h3>
        <h3 className="event-type">{`${(updatedEvent.location || []).join(
          ", "
        )} event`}</h3>
        <h3 className="event-cost">{updatedEvent.ticket}</h3>
        {updatedEvent.type && updatedEvent.type.length > 0 && (
          <div className="event-topics">
            {updatedEvent.type.map((tp, index) => (
              <SpecialtyItem key={index} title={tp} active={false} />
            ))}
          </div>
        )}
        <h3 className="event-subtitle">About the event</h3>
        <p className="event-subtext">{updatedEvent.about}</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  updatedEvent: eventSelector(state).updatedEvent,
});

const mapDispatchToProps = {
  getEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(PublicEventPage);
