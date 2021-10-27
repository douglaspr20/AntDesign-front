import React from "react";
import PropTypes from "prop-types";
import { Dropdown, Menu, Space } from "antd";
import { CheckOutlined, DownOutlined } from "@ant-design/icons";
import draftToHtml from "draftjs-to-html";

import clsx from "clsx";
import { withRouter } from "react-router-dom";

import { CustomButton, SpecialtyItem } from "components";
import { EVENT_TYPES, INTERNAL_LINKS, CARD_TYPE } from "enum";
import Emitter from "services/emitter";
import CardMenu from "../CardMenu";
import { ReactComponent as IconPlus } from "images/icon-plus.svg";
import IconMenu from "images/icon-menu.svg";
import { convertToCertainTime, convertToLocalTime } from "utils/format";

import "./style.scss";

class EventCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showFirewall: false,
    };
  }

  onAttend = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const userProfile = this.props.userProfile;

    if (this.props.data.ticket === "premium") {
      if (userProfile && userProfile.memberShip === "premium") {
        this.props.onAttend(true);
      } else {
        this.setState({ showFirewall: true });
      }
    } else {
      this.props.onAttend(true);
    }
  };

  onCancelAttend = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onAttend(false);
  };

  openEventDetails = () => {
    this.props.onClick(this.props.data);
  };

  onClickConfirm = (e) => {
    e.preventDefault();
    e.stopPropagation();

    Emitter.emit(EVENT_TYPES.OPEN_ATTENDANCE_DISCLAIMER, this.props.data);

    this.props.onConfirmAttendance(this.props.data);
  };

  onClickClaimDigitalCertificate = (e) => {
    e.preventDefault();
    e.stopPropagation();

    window.open(
      `${INTERNAL_LINKS.CERTIFICATE}/${this.props.data.id}`,
      "_blank"
    );
  };

  onClickClaimCredits = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.props.onConfirmCredit(this.props.data);
  };

  planUpgrade = (e) => {
    e.preventDefault();
    e.stopPropagation();
    Emitter.emit(EVENT_TYPES.OPEN_PAYMENT_MODAL);
  };

  onClickDownloadCalendar = (day) => {
    window.open(
      `${process.env.REACT_APP_API_ENDPOINT}/public/event/ics/${this.props.data.id}?day=${day}`,
      "_blank"
    );
  };

  getDescriptionHTML = (item) => {
    let description = "";

    if (item.description && item.description.blocks) {
      description = draftToHtml(item.description);
    } else if (item.description && item.description.html) {
      description = item.description.html;
    }

    return encodeURIComponent(description);
  };

  onClickAddGoogleCalendar = (startDate, endDate) => {
    let googleCalendarUrl = `http://www.google.com/calendar/event?action=TEMPLATE&text=${
      this.props.data.title
    }&dates=${convertToLocalTime(startDate).format(
      "YYYYMMDDTHHmm"
    )}/${convertToLocalTime(endDate).format("YYYYMMDDTHHmmss")}&location=${
      this.props.data.location
    }&trp=false&sprop=https://www.hackinghrlab.io/&sprop=name:`;

    window.open(googleCalendarUrl, "_blank");
  };

  onClickAddYahooCalendar = (startDate, endDate) => {
    let yahooCalendarUrl = `http://calendar.yahoo.com/?v=60&type=10&title=${
      this.props.data.title
    }&st=${convertToLocalTime(startDate).format(
      "YYYYMMDDTHHmm"
    )}&dur${convertToLocalTime(endDate).format("HHmmss")}&in_loc=${
      this.props.data.location
    }`;
    window.open(yahooCalendarUrl, "_blank");
  };

  handleOnClick = ({ item, key, domEvent }) => {
    domEvent.stopPropagation();
    domEvent.preventDefault();

    const [startTime, endTime, day] = item.props.value;

    switch (key) {
      case "1":
        this.onClickDownloadCalendar(day);
        break;
      case "2":
        this.onClickAddGoogleCalendar(startTime, endTime);
        break;
      case "3":
        this.onClickAddYahooCalendar(startTime, endTime);
        break;
      default:
      //
    }
  };

  downloadDropdownOptions = (startTime, endTime, day) => {
    return (
      <Menu onClick={this.handleOnClick}>
        <Menu.Item key="1" value={[startTime, endTime, day]}>
          Download ICS File
        </Menu.Item>
        <Menu.Item key="2" value={[startTime, endTime]}>
          Add to Google Calendar
        </Menu.Item>
        <Menu.Item key="3" value={[startTime, endTime]}>
          Add to Yahoo Calendar
        </Menu.Item>
      </Menu>
    );
  };

  render() {
    const {
      data: {
        title,
        type,
        ticket,
        location,
        status,
        image,
        period,
        showClaim,
        startAndEndTimes,
        timezone,
      },
      className,
      edit,
      type: cardType,
      onMenuClick,
    } = this.props;

    return (
      <div
        className={clsx("event-card", className)}
        onClick={this.openEventDetails}
      >
        {this.state.showFirewall && (
          <div
            className="event-card-firewall"
            onClick={() => this.setState({ showFirewall: false })}
          >
            <div
              className="upgrade-notification-panel"
              onClick={this.planUpgrade}
            >
              <h3>
                Upgrade to a PREMIUM Membership and get unlimited access to the
                LAB features
              </h3>
            </div>
          </div>
        )}
        {cardType === CARD_TYPE.ADD ? (
          <div className="event-card-plus">
            <IconPlus />
          </div>
        ) : (
          <>
            <div className="event-card-img">
              {image && <img src={image} alt="card-img" />}
            </div>
            <div className="event-card-content d-flex flex-column justify-between items-start">
              <h3>{title}</h3>
              <h5>{period}</h5>
              <h5>{`${location ? location.join(",") : ""} event`}</h5>
              {status !== "past" && status !== "confirmed" && (
                <Space direction="vertical">
                  {startAndEndTimes.map((time, index) => {
                    const startTime = convertToCertainTime(time.startTime, timezone);
                    const endTime = convertToCertainTime(time.endTime, timezone);

                    return (
                      <div className="d-flex" key={index}>
                        <Space size="middle">
                          <Dropdown
                            overlay={this.downloadDropdownOptions(startTime, endTime, index)}
                          >
                            <a
                              href="/#"
                              className="ant-dropdown-link"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                            >
                              {startAndEndTimes.length > 1
                                ? `Download Day ${index + 1}`
                                : "Download Calendar"}
                              <DownOutlined />
                            </a>
                          </Dropdown>
                          <div>{`${startTime.format("HH:mm")} - ${endTime.format("HH:mm")}`}</div>
                        </Space>
                      </div>
                    );
                  })}
                </Space>
              )}
              <h6 className="event-card-cost">{ticket}</h6>
              {type && type.length > 0 && (
                <div className="event-card-topics">
                  {type.map((ty, index) => (
                    <SpecialtyItem key={index} title={ty} active={false} />
                  ))}
                </div>
              )}
              <div className="event-card-content-footer">
                <div className="event-card-content-footer-actions">
                  {!["going", "attend"].includes(status) && showClaim === 1 && (
                    <div className="claim-buttons">
                      <CustomButton
                        className="claim-digital-certificate"
                        text="Confirm I attended this event"
                        size="md"
                        type="primary outlined"
                        onClick={this.onClickClaimCredits}
                      />
                    </div>
                  )}
                  {status === "attend" && (
                    <CustomButton
                      text="Attend"
                      size="md"
                      type="primary"
                      onClick={this.onAttend}
                    />
                  )}
                  {status === "going" && (
                    <div className="going-group-part">
                      <div className="going-label">
                        <CheckOutlined />
                        <span>I'm going</span>
                      </div>
                      <CustomButton
                        className="not-going-btn"
                        text="Not going"
                        size="md"
                        type="remove"
                        remove={true}
                        onClick={this.onCancelAttend}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            {edit && (
              <CardMenu onClick={onMenuClick}>
                <div className="event-card-menu">
                  <img src={IconMenu} alt="icon-menu" />
                </div>
              </CardMenu>
            )}
          </>
        )}
      </div>
    );
  }
}

EventCard.propTypes = {
  data: PropTypes.object,
  className: PropTypes.string,
  edit: PropTypes.bool,
  type: PropTypes.string,
  onClick: PropTypes.func,
  onAttend: PropTypes.func,
  onMenuClick: PropTypes.func,
  onConfirmAttendance: PropTypes.func,
  onConfirmCredit: PropTypes.func,
  userProfile: PropTypes.object,
};

EventCard.defaultProps = {
  data: {},
  className: "",
  edit: false,
  type: CARD_TYPE.VIEW,
  userProfile: {},
  onClick: () => {},
  onAttend: () => {},
  onMenuClick: () => {},
  onConfirmAttendance: () => {},
  onConfirmCredit: () => {},
};

export default withRouter(EventCard);
