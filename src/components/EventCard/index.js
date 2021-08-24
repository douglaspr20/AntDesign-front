import React from "react";
import PropTypes from "prop-types";
import { Dropdown, Menu } from "antd";
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
import { convertToLocalTime } from "utils/format";

import "./style.scss";

class EventCard extends React.Component {
  onAttend = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onAttend(true);
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

  onClickDownloadCalendar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(
      `${process.env.REACT_APP_API_ENDPOINT}/public/event/ics/${this.props.data.id}`,
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

  onClickAddGoogleCalendar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { data } = this.props || {};
    let description = "";
    if (data.description) {
      description = this.getDescriptionHTML(data);
    }
    let googleCalendarUrl = `http://www.google.com/calendar/event?action=TEMPLATE&text=${
      this.props.data.title
    }&dates=${convertToLocalTime(this.props.data.startDate).format(
      "YYYYMMDDTHHmm"
    )}/${convertToLocalTime(this.props.data.endDate).format(
      "YYYYMMDDTHHmmss"
    )}&details=${description}&location=${
      this.props.data.location
    }&trp=false&sprop=https://www.hackinghrlab.io/&sprop=name:`;
    window.open(googleCalendarUrl, "_blank");
  };

  onClickAddYahooCalendar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { data } = this.props || {};
    let description = "";
    if (data.description) {
      description = this.getDescriptionHTML(data);
    }
    let yahooCalendarUrl = `http://calendar.yahoo.com/?v=60&type=10&title=${
      this.props.data.title
    }&st=${convertToLocalTime(this.props.data.startDate).format(
      "YYYYMMDDTHHmm"
    )}&dur${convertToLocalTime(this.props.data.endDate).format(
      "HHmmss"
    )}&desc=${description}&in_loc=${this.props.data.location}`;
    window.open(yahooCalendarUrl, "_blank");
  };

  downloadDropdownOptions = () => (
    <Menu>
      <Menu.Item key="1">
        <a href="/#" onClick={this.onClickDownloadCalendar}>
          Download ICS File
        </a>
      </Menu.Item>
      <Menu.Item key="2">
        <a href="/#" onClick={this.onClickAddGoogleCalendar}>
          Add to Google Calendar
        </a>
      </Menu.Item>
      <Menu.Item key="3">
        <a href="/#" onClick={this.onClickAddYahooCalendar}>
          Add to Yahoo Calendar
        </a>
      </Menu.Item>
    </Menu>
  );

  render() {
    const {
      data: { title, type, ticket, location, status, image, period, showClaim },
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
                <Dropdown overlay={this.downloadDropdownOptions}>
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
};

EventCard.defaultProps = {
  data: {},
  className: "",
  edit: false,
  type: CARD_TYPE.VIEW,
  onClick: () => {},
  onAttend: () => {},
  onMenuClick: () => {},
  onConfirmAttendance: () => {},
  onConfirmCredit: () => {},
};

export default withRouter(EventCard);
