import React from "react";
import { Avatar, Dropdown, Menu } from "antd";
import { CustomButton } from "components";
import moment from "moment-timezone";
import { DownOutlined } from "@ant-design/icons";
import { TIMEZONE_LIST } from "enum";
import { convertToLocalTime } from "utils/format";

const CouncilEventPanel = ({ panel, userProfile, joinCouncilEvent, tz }) => {
  const timezone = TIMEZONE_LIST.find((timezone) => timezone.value === tz);
  const offset = timezone.offset;

  let startTime = moment.tz(panel.panelStartAndEndDate[0], timezone.utc[0]);
  let endTime = moment.tz(panel.panelStartAndEndDate[1], timezone.utc[0]);

  const convertedStartTime = convertToLocalTime(
    moment(startTime).utcOffset(offset, true)
  );
  const convertedEndTime = convertToLocalTime(
    moment(endTime).utcOffset(offset, true)
  );

  const handleJoinPanel = (panel, state) => {
    joinCouncilEvent(panel.id, state);
  };

  const onClickDownloadCalendar = (e) => {
    const userTimezone = moment.tz.guess();

    e.preventDefault();
    e.stopPropagation();
    window.open(
      `${process.env.REACT_APP_API_ENDPOINT}/public/council/event/panel/${panel.id}/ics?userTimezone=${userTimezone}`,
      "_blank"
    );
  };

  const onClickAddGoogleCalendar = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let googleCalendarUrl = `http://www.google.com/calendar/event?action=TEMPLATE&text=${
      panel.panelName
    }&dates=${convertedStartTime.format(
      "YYYYMMDDTHHmmSSS"
    )}/${convertedEndTime.format(
      "YYYYMMDDTHHmmSSS"
    )}&details=${`Link to join: ${panel.linkToJoin}`}`;
    window.open(googleCalendarUrl, "_blank");
  };

  const onClickAddYahooCalendar = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let yahooCalendarUrl = `https://calendar.yahoo.com/?v=60&st=${convertedStartTime.format(
      "YYYYMMDDTHHmm"
    )}&et=${convertedEndTime.format("YYYYMMDDTHHmm")}&title=${
      panel.panelName
    }&desc=${`Link to join: ${panel.linkToJoin}`}`;

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

  const isFull = panel.CouncilEventPanelists.length >= +panel.numberOfPanelists;

  const hasJoined = panel.CouncilEventPanelists.some(
    (panelist) => panelist.User.id === userProfile.id
  );

  const displayJoinBtn = hasJoined ? (
    <CustomButton
      text="Unjoin"
      onClick={() => handleJoinPanel(panel, "Unjoin")}
    />
  ) : (
    <CustomButton
      text={isFull ? "Already Full" : "Join"}
      disabled={isFull}
      onClick={() => handleJoinPanel(panel, "Join")}
    />
  );

  const displayPanelists = panel.CouncilEventPanelists.map((panelist) => {
    const user = panelist.User;
    return (
      <div className="panelist" key={user.email}>
        <Avatar src={user.img} size={100} />
        <div>{`${user.firstName} ${user.lastName}`}</div>
        <div>{user.titleProfessions}</div>
      </div>
    );
  });

  return (
    <div
      className="d-flex justify-between"
      key={panel.panelName}
      style={{ marginTop: "1rem", background: "#f2f2f2", padding: "1rem" }}
    >
      <div>
        <div>
          <b>Panel</b>: {panel.panelName}
        </div>
        <div>
          <b>Panel Date</b>:{" "}
          {moment
            .tz(panel.panelStartAndEndDate[0], timezone.utc[0])
            .format("LL")}{" "}
          ({timezone.abbr})
        </div>
        <div>
          <b>Panel Start Time</b>:{" "}
          {moment
            .tz(panel.panelStartAndEndDate[0], timezone.utc[0])
            .format("HH:mm")}
        </div>
        <div>
          <b>Panel End Time</b>:{" "}
          {moment
            .tz(panel.panelStartAndEndDate[1], timezone.utc[0])
            .format("HH:mm")}
        </div>
        <div className="d-flex" style={{ marginTop: "1rem", flexWrap: "wrap" }}>
          {displayPanelists}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {displayJoinBtn}
        {hasJoined && (
          <div style={{ marginTop: "1rem" }}>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default CouncilEventPanel;
