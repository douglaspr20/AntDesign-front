import React from "react";
import { Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { SpecialtyItem, CustomButton } from "components";
import "./style.scss";

const BonfireCard = () => {
  const onClickDownloadCalendar = (day) => {
    // window.open(
    //   `${process.env.REACT_APP_API_ENDPOINT}/public/event/ics/${this.props.data.id}?day=${day}`,
    //   "_blank"
    // );
  };

  const onClickAddGoogleCalendar = (startDate, endDate) => {
    // let googleCalendarUrl = `http://www.google.com/calendar/event?action=TEMPLATE&text=${
    //   this.props.data.title
    // }&dates=${convertToLocalTime(startDate).format(
    //   "YYYYMMDDTHHmm"
    // )}/${convertToLocalTime(endDate).format("YYYYMMDDTHHmmss")}&location=${
    //   this.props.data.location
    // }&trp=false&sprop=https://www.hackinghrlab.io/&sprop=name:`;
    // window.open(googleCalendarUrl, "_blank");
  };

  const onClickAddYahooCalendar = (startDate, endDate) => {
    // let yahooCalendarUrl = `http://calendar.yahoo.com/?v=60&type=10&title=${
    //   this.props.data.title
    // }&st=${convertToLocalTime(startDate).format(
    //   "YYYYMMDDTHHmm"
    // )}&dur${convertToLocalTime(endDate).format("HHmmss")}&in_loc=${
    //   this.props.data.location
    // }`;
    // window.open(yahooCalendarUrl, "_blank");
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
        <h3>Bonfire</h3>

        <CustomButton size="sm" text="JOIN" />
      </div>

      <div className="d-flex justify-between">
        <div>
          <div className="acc-session-date">Mar, 7, 2022</div>
          <div className="acc-session-time">
            From 1:00 pm to 2:00 pm SPST (GMT-5)
          </div>
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
          <SpecialtyItem title="design-thinking" />
          <SpecialtyItem title="agility" />
          <SpecialtyItem title="strategy-and-transformation" />
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
