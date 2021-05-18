import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { CustomButton } from "components";
import { ReactComponent as IconChevronDown } from "images/icon-chevron-down.svg";

import "./style.scss";

const AnnualConferenceCard = ({ session, attended }) => {
  const [hideInfo, setHideInfo] = useState(true);

  return (
    <div className="annual-conference-card acc">
      <div className="acc-session-header">
        <h3>{session.title}</h3>
        {attended ? <CustomButton size="md" text="Add session" /> : null}
      </div>
      <div className="acc-session-type">{`Session type: ${session.type}`}</div>
      <div className="acc-session-date">{session.date}</div>
      <div className="d-flex justify-between align-center">
        <div className="acc-session-time">{session.period}</div>
        <div
          className="acc-session-toggle"
          onClick={() => setHideInfo(!hideInfo)}
        >
          {hideInfo ? "Review session" : "Hide information"}
          <div className={clsx("acc-session-toggle-icon", { hide: !hideInfo })}>
            <IconChevronDown />
          </div>
        </div>
      </div>
      {!hideInfo && (
        <div className="acc-details">
          <div className="acc-details-speakers">
            {(session.speakers || []).map((speaker, index) => (
              <div className="acc-details-speaker" key={index}>
                <div className="acc-details-speaker-image">
                  {speaker.img ? (
                    <img src={speaker.img} alt="speaker-img" />
                  ) : (
                    <div className="empty" />
                  )}
                </div>
                <div className="acc-details-speaker-desc">
                  <h4>{`${speaker.firstName} ${speaker.lastName}`}</h4>
                  <h5>{speaker.title}</h5>
                </div>
              </div>
            ))}
          </div>
          <div className="acc-details-other">
            {session.description && (
              <>
                <h4>Description</h4>
                <p>{session.description}</p>
              </>
            )}
            <div className="acc-details-other-brands">
              {(session.brands || []).map((brand, index) => (
                <div className="session-brand" key={index}>
                  <img src={brand} alt="brand-img" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

AnnualConferenceCard.propTypes = {
  session: PropTypes.object,
  attended: PropTypes.number,
};

AnnualConferenceCard.defaultProps = {
  session: {},
  attended: 0,
};

export default AnnualConferenceCard;
