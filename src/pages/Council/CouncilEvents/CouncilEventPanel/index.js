import React, { useState } from "react";
import {
  Avatar,
  Dropdown,
  Menu,
  Form,
  Popconfirm,
  AutoComplete,
  Collapse,
} from "antd";
import { CustomButton, CustomModal } from "components";
import moment from "moment-timezone";
import { DownOutlined } from "@ant-design/icons";
import { TIMEZONE_LIST } from "enum";
import { convertToLocalTime } from "utils/format";
import { connect } from "react-redux";
import { debounce } from "lodash";

import { actions as councilEventActions } from "redux/actions/council-events-actions";
import { councilEventSelector } from "redux/selectors/councilEventSelector";
import { homeSelector } from "redux/selectors/homeSelector";

import CommentForm from "./CommentForm";

const { Panel } = Collapse;

const CouncilEventPanel = ({
  panel,
  userProfile,
  joinCouncilEvent,
  tz,
  status,
  removeCouncilEventPanelist,
  searchUserForCouncilEventPanelist,
  searchedUsersForCouncilEvent,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

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
    joinCouncilEvent(panel.id, userProfile.id, state);
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

    let googleCalendarUrl = `http://www.google.com/calendar/event?action=TEMPLATE&text=${encodeURIComponent(
      panel.panelName
    )}&dates=${convertedStartTime.format(
      "YYYYMMDDTHHmmSSS"
    )}/${convertedEndTime.format(
      "YYYYMMDDTHHmmSSS"
    )}&details=${encodeURIComponent(`Link to join: ${panel.linkToJoin}`)}`;
    window.open(googleCalendarUrl, "_blank");
  };

  const onClickAddYahooCalendar = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let yahooCalendarUrl = `https://calendar.yahoo.com/?v=60&st=${convertedStartTime.format(
      "YYYYMMDDTHHmm"
    )}&et=${convertedEndTime.format(
      "YYYYMMDDTHHmm"
    )}&title=${encodeURIComponent(panel.panelName)}&desc=${encodeURIComponent(
      `Link to join: ${panel.linkToJoin}`
    )}`;

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

  const councilEventPanelist = panel.CouncilEventPanelists.find(
    (panelist) => panelist.User.id === userProfile.id
  );

  const hasJoined = !!councilEventPanelist;

  const displayJoinBtn = hasJoined ? (
    <CustomButton
      text="Withdraw"
      onClick={() => handleJoinPanel(panel, "Unjoin")}
      type="third"
      size="small"
    />
  ) : (
    <CustomButton
      text={isFull ? "Already Full" : "Join"}
      disabled={isFull}
      onClick={() => handleJoinPanel(panel, "Join")}
      size="small"
    />
  );

  const handleRemovePanelist = (id) => {
    removeCouncilEventPanelist(panel.id, id);
  };

  const handleSearchUser = (values) => {
    const runDebounce = debounce(() => {
      searchUserForCouncilEventPanelist(values);
    }, 1500);

    runDebounce();
  };

  const handleOnFinish = (values) => {
    const user = filteredSearchUser.find(
      (_user) => _user.value === values.user
    );

    joinCouncilEvent(panel.id, user.id, "Join");
    form.resetFields();
    setIsModalVisible(false);
  };

  const displayPanelists = panel.CouncilEventPanelists.map((panelist) => {
    const user = panelist.User;

    return (
      <div className="panelist" key={user.email}>
        <Avatar src={user.img} size={100} />
        <div>{`${user.firstName} ${user.lastName}`}</div>
        <div>{user.titleProfessions}</div>
        {userProfile.isExpertCouncilAdmin && (
          <Popconfirm
            title="Do you want to remove this panelist?"
            onConfirm={() => handleRemovePanelist(panelist.id)}
          >
            <CustomButton text="Remove" type="third" size="small" />
          </Popconfirm>
        )}
      </div>
    );
  });

  console.log("CouncilEventPanelistId", panel);

  const filteredSearchUser = searchedUsersForCouncilEvent.filter(
    (user) =>
      !panel.CouncilEventPanelists.some(
        (panelist) => panelist.UserId === user.id
      )
  );

  return (
    <div style={{ marginTop: "1rem", background: "#f2f2f2", padding: "1rem" }}>
      <div className="d-flex justify-between" key={panel.panelName}>
        <div>
          <div>
            <b>Panel</b>: {panel.panelName}
          </div>
          <div>
            <b>Panel Date</b>:
            {` ${moment
              .tz(panel.panelStartAndEndDate[0], timezone.utc[0])
              .format("LL")} ${timezone.abbr}`}
          </div>
          <div>
            <b>Panel Start Time</b>:{" "}
            {moment
              .tz(panel.panelStartAndEndDate[0], timezone.utc[0])
              .format("HH:mm")}{" "}
            {timezone.abbr}
          </div>
          <div>
            <b>Panel End Time</b>:{" "}
            {moment
              .tz(panel.panelStartAndEndDate[1], timezone.utc[0])
              .format("HH:mm")}{" "}
            {timezone.abbr}
          </div>
          <div
            className="d-flex"
            style={{ marginTop: "1rem", flexWrap: "wrap" }}
          >
            {displayPanelists}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {userProfile.isExpertCouncilAdmin && (
            <CustomButton
              size="small"
              text="Add user"
              style={{ marginBottom: "1rem" }}
              type="secondary"
              onClick={() => setIsModalVisible(true)}
            />
          )}
          {status !== "closed" && displayJoinBtn}
          {hasJoined && (
            <>
              <div style={{ marginTop: "5px" }}>
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
            </>
          )}
        </div>
        <CustomModal
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          title="Add user"
          width={420}
        >
          <Form form={form} layout="vertical" onFinish={handleOnFinish}>
            <Form.Item
              name="user"
              label="Search user"
              required={[{ required: true }]}
            >
              <AutoComplete
                size="large"
                onSearch={handleSearchUser}
                options={filteredSearchUser}
              />
            </Form.Item>
            <Form.Item>
              <CustomButton htmlType="submit" text="Add" block />
            </Form.Item>
          </Form>
        </CustomModal>
      </div>
      {hasJoined && (
        <div style={{ marginTop: "1rem" }}>
          <Collapse accordion>
            <Panel header="Click here to see comments" key="1">
              <CommentForm
                councilEventPanelComments={panel.CouncilEventPanelComments}
                CouncilEventPanelId={panel.id}
                CouncilEventPanelistId={councilEventPanelist?.id}
              />
            </Panel>
          </Collapse>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...councilEventSelector(state),
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {
  ...councilEventActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(CouncilEventPanel);
