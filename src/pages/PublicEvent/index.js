import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import clsx from "clsx";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";

import { DateAvatar, CustomButton, SpecialtyItem, RichEdit } from "components";
import { getEvent } from "redux/actions/event-actions";
import { eventSelector } from "redux/selectors/eventSelector";
import { authSelector } from "redux/selectors/authSelector";
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

const PublicEventPage = ({
  match,
  updatedEvent,
  isAuthenticated,
  getEvent,
}) => {
  const [canonicalUrl, setCanonicalUrl] = useState("");

  useEffect(() => {
    if (match.params.id) {
      setCanonicalUrl(
        `${process.env.REACT_APP_DOMAIN_URL}${INTERNAL_LINKS.PUBLIC_EVENT}/${match.params.id}`
      );
      getEvent(match.params.id);
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="public-event-page">
      <Helmet>
        <title>{updatedEvent.title}</title>
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={updatedEvent.title} />
        <meta property="og:description" content={updatedEvent.about} />
        <meta
          property="og:image"
          content={updatedEvent.image || updatedEvent.image2}
        />
        <link rel="canonical" href={canonicalUrl} />
        <link
          rel="image_src"
          href={updatedEvent.image || updatedEvent.image2}
        />
      </Helmet>
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
          <Link
            to={isAuthenticated ? INTERNAL_LINKS.EVENTS : INTERNAL_LINKS.JOIN}
          >
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
        <RichEdit data={updatedEvent.description} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  updatedEvent: eventSelector(state).updatedEvent,
  isAuthenticated: authSelector(state).isAuthenticated,
});

const mapDispatchToProps = {
  getEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(PublicEventPage);
