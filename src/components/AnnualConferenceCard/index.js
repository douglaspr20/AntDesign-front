import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import clsx from "clsx";

import { CustomButton } from "components";
import { ReactComponent as IconChevronDown } from "images/icon-chevron-down.svg";

import "./style.scss";

const AnnualConferenceCard = ({ session }) => {
  const [hideInfo, setHideInfo] = useState(true);

  return (
    <div className="annual-conference-card acc">
      <div className="acc-session-header">
        <h3>{session.title}</h3>
        <CustomButton size="md" text="Add session" />
      </div>
      <div className="acc-session-type">{`Session type: ${session.type}`}</div>
      <div className="acc-session-date">
        {moment(session.startTime).format("MMMM, D, YYYY")}
      </div>
      <div className="d-flex justify-between align-center">
        <div className="acc-session-time">
          {`From ${moment(session.startTime).format("h:mm a")} to ${moment(
            session.endTime
          ).format("h:mm a")}. ${session.timezone}`}
        </div>
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
    </div>
  );
};

AnnualConferenceCard.propTypes = {
  session: PropTypes.object,
};

AnnualConferenceCard.defaultProps = {
  session: {},
};

export default AnnualConferenceCard;
