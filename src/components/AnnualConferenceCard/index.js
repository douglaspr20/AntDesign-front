import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { CustomButton } from "components";
import { ReactComponent as IconChevronDown } from "images/icon-chevron-down.svg";

import { INTERNAL_LINKS } from "../../enum";

import "./style.scss";
import { Link } from "react-router-dom";

const AnnualConferenceCard = ({
  session,
  attended,
  added,
  onAddSession,
  onRemoveSession,
}) => {
  const [hideInfo, setHideInfo] = useState(true);

  return (
    <div className="annual-conference-card acc">
      <div className="acc-session-header">
        <h3>{session.title}</h3>
        <Link to={`${INTERNAL_LINKS.SPEAKERS}/${session.id}`}>Speakers</Link>
        {added ? (
          <CustomButton
            type="primary outlined"
            size="md"
            text="Remove"
            onClick={onRemoveSession}
          />
        ) : attended ? (
          <CustomButton size="md" text="Add session" onClick={onAddSession} />
        ) : null}
      </div>
      {added && <div className="acc-session-added-tag">Added</div>}
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
                  <h4>{speaker.name}</h4>
                  <h5>{speaker.description}</h5>
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
  added: PropTypes.bool,
  onAddSession: PropTypes.func,
  onRemoveSession: PropTypes.func,
};

AnnualConferenceCard.defaultProps = {
  session: {},
  attended: 0,
  added: false,
  onAddSession: () => {},
  onRemoveSession: () => {},
};

export default AnnualConferenceCard;
