import React, { useState } from "react";
import {
  Avatar,
  Dropdown,
  Menu,
  Form,
  Popconfirm,
  AutoComplete,
  Collapse,
  Switch,
  notification,
} from "antd";
import { CustomButton, CustomModal } from "components";
import Emitter from "services/emitter";
import moment from "moment-timezone";
import { DownOutlined } from "@ant-design/icons";
import { TIMEZONE_LIST } from "enum";
import { connect } from "react-redux";
import { debounce } from "lodash";
import { EVENT_TYPES } from "enum";

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
  closeMainModal,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showProfileCompletionFirewall, setShowProfileCompletionFirewall] =
    useState(false);
  const [form] = Form.useForm();

  const userTimezone = moment.tz.guess();
  const timezone = TIMEZONE_LIST.find((timezone) => timezone.value === tz);

  let startTime = moment.tz(panel.startDate, timezone.utc[0]);
  let endTime = moment.tz(panel.endDate, timezone.utc[0]);

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
    )}&dates=${moment
      .tz(panel.startDate, userTimezone)
      .format("YYYYMMDDTHHmmSSS")}/${moment
      .tz(panel.endDate, userTimezone)
      .format("YYYYMMDDTHHmmSSS")}&details=${encodeURIComponent(
      `Link to join: ${panel.linkToJoin}`
    )}`;
    window.open(googleCalendarUrl, "_blank");
  };

  const onClickAddYahooCalendar = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let yahooCalendarUrl = `https://calendar.yahoo.com/?v=60&st=${moment
      .tz(panel.panelStartAndEndDate[0], userTimezone)
      .format("YYYYMMDDTHHmm")}&et=${moment
      .tz(panel.panelStartAndEndDate[1], userTimezone)
      .format("YYYYMMDDTHHmm")}&title=${encodeURIComponent(
      panel.panelName
    )}&desc=${encodeURIComponent(`Link to join: ${panel.linkToJoin}`)}`;

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

  const checkIfUserProfileIsCompletedAndJoin = () => {
    if (userProfile.percentOfCompletion !== 100) {
      return setShowProfileCompletionFirewall(true);
    }

    handleJoinPanel(panel, "Join");
  };

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
      onClick={() => checkIfUserProfileIsCompletedAndJoin()}
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
    if (!values.user) {
      return notification.warn({
        message: "User can't be empty.",
      });
    }

    const user = filteredSearchUser.find(
      (_user) => _user.value === values.user
    );

    joinCouncilEvent(panel.id, user.id, "Join", true, !!values.isModerator);
    form.resetFields();
    setIsModalVisible(false);
  };

  const displayPanelists = panel.CouncilEventPanelists.map((panelist) => {
    const user = panelist.User;

    const isPanelModerator = panelist.isModerator;
    console.log(panelist, "isPanelModerator");

    const displayIsPanelModerator = isPanelModerator && <div>Moderator</div>;

    return (
      <div className="panelist" key={user.email}>
        <Avatar src={user.img} size={100} />
        <div>{`${user.firstName} ${user.lastName}`}</div>
        <div>{user.titleProfessions}</div>
        <div>{displayIsPanelModerator}</div>
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

  const filteredSearchUser = searchedUsersForCouncilEvent.filter(
    (user) =>
      !panel.CouncilEventPanelists.some(
        (panelist) => panelist.UserId === user.id
      )
  );

  const completeProfile = () => {
    Emitter.emit(EVENT_TYPES.EVENT_VIEW_PROFILE);
  };

  return (
    <div style={{ marginTop: "1rem", background: "#f2f2f2", padding: "1rem" }}>
      <div className="d-flex justify-between" key={panel.panelName}>
        <div>
          <div>
            <b>Panel</b>: {panel.panelName}
          </div>
          <div>
            <b>Panel Date</b>:
            {` ${moment.tz(panel.startDate, timezone.utc[0]).format("LL")} ${
              timezone.abbr
            }`}
          </div>
          <div>
            <b>Panel Start Time</b>: {startTime.format("HH:mm")} {timezone.abbr}
          </div>
          <div>
            <b>Panel End Time</b>: {endTime.format("HH:mm")} {timezone.abbr}
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
            <Form.Item name="isModerator" label="Is a moderator">
              <Switch />
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
      {showProfileCompletionFirewall && (
        <div
          className="skill-cohort-firewall"
          onClick={() => {
            closeMainModal();
            setShowProfileCompletionFirewall(false);
          }}
        >
          <div className="upgrade-notification-panel" onClick={completeProfile}>
            <h3>
              You must fully complete your profile before joining an event.
            </h3>
          </div>
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
