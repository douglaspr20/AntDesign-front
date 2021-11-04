import React from "react";
import { Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { SpecialtyItem, CustomButton } from "components";
import moment from "moment-timezone";
import { convertToLocalTime } from "utils/format";
import "./style.scss";

const BonfireCard = ({ bonfire }) => {
  const onClickDownloadCalendar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // window.open(
    //   `${process.env.REACT_APP_API_ENDPOINT}/public/event/ics/${this.props.data.id}?day=${day}`,
    //   "_blank"
    // );
  };

  const onClickAddGoogleCalendar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let googleCalendarUrl = `http://www.google.com/calendar/event?action=TEMPLATE&text=${
      bonfire.title
    }&dates=${convertToLocalTime(bonfire.startTime).format(
      "YYYYMMDDTHHmm"
    )}/${convertToLocalTime(bonfire.endTime).format(
      "YYYYMMDDTHHmmss"
    )}&trp=false&sprop=https://www.hackinghrlab.io/&sprop=name:`;
    window.open(googleCalendarUrl, "_blank");
  };

  const onClickAddYahooCalendar = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let yahooCalendarUrl = `http://calendar.yahoo.com/?v=60&type=10&title=${
      bonfire.title
    }&st=${convertToLocalTime(bonfire.startTime).format(
      "YYYYMMDDTHHmm"
    )}&dur${convertToLocalTime(bonfire.endTime).format("HHmmss")}`;
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
    <div className="bonfire-card">
      <div className="acc-session-header">
        <h3>{bonfire.title}</h3>

        <CustomButton size="sm" text="JOIN" />
      </div>

      <div className="d-flex justify-between">
        <div>
          <div className="acc-session-date">
            {moment(bonfire.startTime).format("MMM, D, YYYY")}
          </div>
          <div className="acc-session-time">{bonfire.hours}</div>
        </div>

        <Dropdown overlay={downloadDropdownOptions}>
          <a
            href="/#"
            className="ant-dropdown-link"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            style={{ marginTop: ".5rem" }}
          >
            Download calendar <DownOutlined />
          </a>
        </Dropdown>
      </div>

      <div className="d-flex justify-between align-center">
        <div className="acc-session-categories">
          {bonfire.categories.map((category, i) => (
            <SpecialtyItem title={category} key={i} />
          ))}
        </div>
      </div>
      <div className="acc-details">
        <h4>Description</h4>
        <p style={{ whiteSpace: "pre-line", marginTop: "1rem" }}>Description</p>
      </div>
    </div>
  );
};

export default BonfireCard;
