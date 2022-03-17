import React from "react";
import { Avatar, Dropdown, Menu } from "antd";
import { CustomButton } from "components";
import moment from "moment-timezone";
import { DownOutlined } from "@ant-design/icons";

const CouncilEventPanel = ({ panel, userProfile, joinCouncilEvent }) => {
  const userTimezone = moment.tz.guess();
  const startTime = panel.panelStartAndEndDate[0];
  const endDate = panel.panelStartAndEndDate[1];

  const convertedStartTimeToLocalTimezone = moment.tz(startTime, userTimezone);
  const convertedEndTimeToLocalTimezone = moment.tz(endDate, userTimezone);

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
    }&dates=${convertedStartTimeToLocalTimezone.format(
      "YYYYMMDDTHHmmSSS"
    )}/${convertedEndTimeToLocalTimezone.format(
      "YYYYMMDDTHHmmSSS"
    )}&details=${`Link to join: ${panel.linkToJoin}`}`;
    window.open(googleCalendarUrl, "_blank");
  };

  const onClickAddYahooCalendar = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let yahooCalendarUrl = `https://calendar.yahoo.com/?v=60&st=${convertedStartTimeToLocalTimezone.format(
      "YYYYMMDDTHHmm"
    )}&et=${convertedEndTimeToLocalTimezone.format("YYYYMMDDTHHmm")}&title=${
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
        <div>Panel: {panel.panelName}</div>
        <div>
          Panel Date: {moment(panel.panelStartAndEndDate[0]).format("LL")}
        </div>
        <div>
          Panel Start Time:{" "}
          {moment(panel.panelStartAndEndDate[0]).format("HH:mm")}
        </div>
        <div>
          Panel End Time:{" "}
          {moment(panel.panelStartAndEndDate[1]).format("HH:mm")}
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
