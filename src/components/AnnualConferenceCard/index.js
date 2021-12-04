import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import clsx from "clsx";
import { Dropdown, Menu, Tooltip } from "antd";
import { CustomButton, SpecialtyItem } from "components";
import { homeSelector } from "redux/selectors/homeSelector";
import { DownOutlined } from "@ant-design/icons";
import { ReactComponent as IconChevronDown } from "images/icon-chevron-down.svg";
import { TIMEZONE_LIST } from "../../enum";
import "./style.scss";
import { convertToLocalTime } from "utils/format";
import moment from "moment-timezone";

const AnnualConferenceCard = ({
  session,
  attended,
  added,
  onAddSession,
  onRemoveSession,
  userProfile,
}) => {
  const [hideInfo, setHideInfo] = useState(true);

  const timezone = TIMEZONE_LIST.find(
    (item) => item.value === session.timezone
  );
  const offset = timezone.offset;

  const convertedStartTime = moment(session.startTime)
    .tz(timezone.utc[0])
    .utcOffset(offset, true);

  const convertedEndTime = moment(session.endTime)
    .tz(timezone.utc[0])
    .utcOffset(offset, true);

  const onClickDownloadCalendar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(
      `${process.env.REACT_APP_API_ENDPOINT}/public/global-conference/ics/${session.id}?userTimezone=${userProfile.timezone}`,
      "_blank"
    );
  };

  const onClickAddGoogleCalendar = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let googleCalendarUrl = `http://www.google.com/calendar/event?action=TEMPLATE&text=${
      session.title
    }&dates=${convertToLocalTime(convertedStartTime).format(
      "YYYYMMDDTHHmmSSS"
    )}/${convertToLocalTime(convertedEndTime).format(
      "YYYYMMDDTHHmmSSS"
    )}&details=${
      session.description
    }&location=${"https://www.hackinghrlab.io/global-conference"}&trp=false&sprop=https://www.hackinghrlab.io/&sprop=name:`;
    window.open(googleCalendarUrl, "_blank");
  };

  const onClickAddYahooCalendar = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let yahooCalendarUrl = `https://calendar.yahoo.com/?v=60&st=${convertToLocalTime(
      convertedStartTime
    ).format("YYYYMMDDTHHmm")}&et=${convertToLocalTime(convertedEndTime).format(
      "YYYYMMDDTHHmm"
    )}&title=${session.title}&desc=${
      session.description
    }&in_loc=https://www.hackinghrlab.io/global-conference`;

    window.open(yahooCalendarUrl, "_blank");
  };

  const downloadDropdownOptions = () => (
    <Menu style={{ position: "relative", bottom: "70px" }}>
      <Menu.Item key="1">
        <a href="/#" onClick={(e) => onClickDownloadCalendar(e)}>
          Download ICS File
        </a>
      </Menu.Item>
      <Menu.Item key="2">
        <a href="/#" onClick={(e) => onClickAddGoogleCalendar(e)}>
          Add to Google Calendar
        </a>
      </Menu.Item>
      <Menu.Item key="3">
        <a href="/#" onClick={(e) => onClickAddYahooCalendar(e)}>
          Add to Yahoo Calendar
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="annual-conference-card acc">
      <div className="acc-session-header">
        <h3>{session.title}</h3>

        {added ? (
          <CustomButton
            type="primary outlined"
            size="md"
            text="Remove"
            onClick={onRemoveSession}
            className="remove-buttom"
          />
        ) : attended ? (
          <CustomButton
            size="sm"
            text="Add To My Personalized Agenda"
            onClick={onAddSession}
          />
        ) : null}
      </div>
      {added && <div className="acc-session-added-tag">Added</div>}
      <div className="d-flex justify-between">
        <div>
          <div className="acc-session-type">{`Session type: ${session.type}`}</div>
          <div className="acc-session-date">{session.date}</div>
          <Tooltip
            placement="right"
            title={
              <a
                href="https://www.timeanddate.com/worldclock/converter.html"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#fff" }}
              >
                Convert to your time zone here
              </a>
            }
          >
            <div className="acc-session-time">
              {session.period} {session.tz}
            </div>
          </Tooltip>
        </div>
        {added && (
          <Dropdown overlay={downloadDropdownOptions}>
            <a
              href="/#"
              className="ant-dropdown-link"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              Download calendar <DownOutlined />
            </a>
          </Dropdown>
        )}
      </div>

      <div className="d-flex justify-between align-center">
        <div className="acc-session-categories">
          {session.categories.map((category, i) => (
            <SpecialtyItem key={i} title={category} />
          ))}
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
      {!hideInfo && (
        <div className="acc-details">
          {session.description && (
            <>
              <h4>Description</h4>
              <p style={{ whiteSpace: "pre-line", marginTop: "1rem" }}>
                {session.description}
              </p>
            </>
          )}
          <div className="acc-details-other-brands">
            {(session.brands || []).map((brand, index) => (
              <div className="session-brand" key={index}>
                <img src={brand} alt="brand-img" />
              </div>
            ))}
          </div>

          <div className="acc-details">
            {session.speakers && <h4>Speakers</h4>}
            {(session.speakers || []).map((speaker, index) => (
              <a
                href={speaker.linkSpeaker}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
              >
                <div className="acc-details-speaker">
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
              </a>
            ))}
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

const mapStateToProps = (state) => ({
  userProfile: homeSelector(state).userProfile,
});

export default connect(mapStateToProps)(AnnualConferenceCard);
