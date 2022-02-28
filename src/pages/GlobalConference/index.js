import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import moment from "moment-timezone";
import jsPdf from "jspdf";
import { Menu, notification } from "antd";
import { INTERNAL_LINKS } from "enum";
import {
  CustomButton,
  Tabs,
  GlobalConferenceFilterPanel,
  CustomModal,
} from "components";
import {
  getAllSessions,
  getSessionsUserJoined,
} from "redux/actions/session-actions";
import {
  attendToGlobalConference,
  setLoading,
} from "redux/actions/home-actions";
import { sessionSelector } from "redux/selectors/sessionSelector";
import { homeSelector } from "redux/selectors/homeSelector";
import { eventSelector } from "redux/selectors/eventSelector";
import {
  addToMyEventList,
  getAllEvent,
  removeFromMyEventList,
} from "redux/actions/event-actions";
import { convertToUTCTime, convertToLocalTime } from "utils/format";
import { formatAnnualConference } from "utils/formatPdf";
import Emitter from "services/emitter";
import SocketIO from "services/socket";
import { EVENT_TYPES, SOCKET_EVENT_TYPE } from "enum";
import ConferenceList from "./ConferenceList";
import FilterDrawer from "./FilterDrawer";
import RecommendedAgendaModal from "./RecommendedAgendaModal";
import AccessibilityRequirementsModal from "./AccessibilityRequirementsModal";
import InviteColleaguesFormModal from "./InviteColleaguesFormModal";
import CreateBonfireModal from "./CreateBonfireModal";

import "./style.scss";
import AcceptTermsAndConditions from "./AcceptTermsAndConditions";
import { CheckOutlined } from "@ant-design/icons";

const Description = `
Welcome to the Hacking HR 2022 Global Online Conference
planner. Here you will find all the sessions for the conference. You
can add sessions to your personalized agenda and then download a
PDF. Notice that you can’t add two sessions that are happening the
same day at the same time. You can also download the calendar
invites to save the date. Finally, you can find the speakers and
connect with other participants. Enjoy!
`;
const TAB_NUM = 6;

const GlobalConference = ({
  allSessions,
  sessionsUserJoined,
  allEvents,
  getAllEvent,
  userProfile,
  getAllSessions,
  getSessionsUserJoined,
  addToMyEventList,
  removeFromMyEventList,
  sessionsUser,
  setLoading,
  attendToGlobalConference,
  children,
  location,
}) => {
  const [currentTab, setCurrentTab] = useState("0");
  const [selectTab, setSelectTab] = useState("Mar 07");

  const [firstTabDate] = useState(moment("2022-03-07", "YYYY-MM-DD"));
  const [tabData, setTabData] = useState([]);
  const [filters, setFilters] = useState({});
  const [meta, setMeta] = useState("");
  const [createBonfireModalVisible, setCreateBonfireModalVisible] =
    useState(false);
  const [
    modalFormInviteColleaguesVisible,
    setModalFormInviteColleaguesVisible,
  ] = useState(false);
  const [modalRequirementsVisible, setModalRequirementsVisible] =
    useState(false);

  const [modalMessageVisible, setModalMessageVisible] = useState(false);
  const [messageAdmin, setMessageAdmin] = useState("");
  const [modalRecommendeAgendaVisible, setModalRecommendeAgendaVisible] =
    useState(false);
  const [modalVisibleWelcomingMessage, setModalVisibleWelcomingMessage] =
    useState(false);

  const localPathname =
    location.pathname.split("/")[2] || location.pathname.split("/")[1];

  const onFilterChange = (filter) => {
    setFilters(filter);
  };

  const showFilterPanel = () => {
    Emitter.emit(EVENT_TYPES.OPEN_FILTER_PANEL);
  };

  const onSearch = (value) => {
    const startTime = convertToUTCTime(firstTabDate.clone());
    const endTime = convertToUTCTime(firstTabDate.clone().add(TAB_NUM, "days"));
    setMeta(value);
    getAllSessions(startTime, endTime, value);
  };

  // const goToPrevPage = () => {
  //   setFirstTabDate(firstTabDate.clone().subtract(TAB_NUM, "days"));
  // };

  // const goToNextPage = () => {
  //   setFirstTabDate(firstTabDate.clone().add(TAB_NUM, "days"));
  // };

  const onAttend = () => {
    const globalEvent = allEvents.find(
      (event) => event.isAnnualConference === 1
    );

    if (userProfile.attendedToConference === 0) {
      attendToGlobalConference();
      addToMyEventList(globalEvent);
    } else {
      removeFromMyEventList(globalEvent);
      attendToGlobalConference();
    }
  };

  const showModalMessage = (message) => {
    setMessageAdmin(message);
    setModalMessageVisible(true);
    setTimeout(() => {
      setModalMessageVisible(false);
    }, 5000);
  };

  useEffect(() => {
    if (firstTabDate) {
      // get sessions data
      const startTime = convertToUTCTime(firstTabDate.clone());
      const endTime = convertToUTCTime(
        firstTabDate.clone().add(TAB_NUM, "days")
      );
      getAllSessions(startTime, endTime);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstTabDate]);

  useEffect(() => {
    const filterSessions = (data, date) => {
      return data.filter((item) => {
        return (
          convertToLocalTime(item.startTime).format("YYYY-MM-DD") ===
          date.format("YYYY-MM-DD")
        );
      });
    };
    const tData = Array.from(Array(TAB_NUM).keys()).map((item) => {
      const date = firstTabDate.clone().add(item, "days");
      const data = filterSessions(allSessions, date);

      return {
        title: date.format("MMM DD"),
        content: () => (
          <ConferenceList data={data} filters={filters} meta={meta} />
        ),
      };
    });

    setTabData(tData);
  }, [firstTabDate, allSessions, filters, meta]);

  useEffect(() => {
    getAllEvent();
    if (userProfile?.sessionsJoined?.length > 0) {
      getSessionsUserJoined(userProfile.sessionsJoined);
    }
  }, [getAllEvent, getSessionsUserJoined, userProfile]);

  useEffect(() => {
    SocketIO.on(SOCKET_EVENT_TYPE.SEND_MESSAGE_GLOBAL_CONFERENCE, (message) =>
      showModalMessage(message)
    );
  }, [userProfile]);

  const downloadPdf = async (option) => {
    setLoading(true);

    if (sessionsUser.length < 1 && option === "personal-agenda") {
      setLoading(false);
      return notification.warning({
        message: "You have no sessions",
        description: `Add your first session before downloading personalized agenda” if
        someone tries to download it without having added any session to
        their agenda`,
      });
    } else if (sessionsUserJoined < 1 && option === "report-sessions-joined") {
      setLoading(false);
      return notification.warning({
        message: "You haven't joined any session",
        description: `Join your first session before downloading the joined sessions report`,
      });
    }

    const template = formatAnnualConference(
      userProfile,
      option === "personal-agenda"
        ? sessionsUser
        : option === "conference-schedule"
        ? allSessions
        : sessionsUserJoined,
      option
    );

    const pdf = new jsPdf({
      orientation: "p",
      format: "a4",
      unit: "px",
      hotfixes: ["px_scaling"],
      precision: 32,
    });

    await pdf.html(template);

    pdf.save(
      option === "personal-agenda"
        ? "Personalizated Agenda.pdf"
        : option === "conference-schedule"
        ? "Conference Schedule.pdf"
        : "Report sessions joined"
    );

    setLoading(false);
  };

  // const onAddBonfire = () => {
  //   if (userProfile.memberShip && userProfile.memberShip !== "premium") {
  //     return notification.warning({
  //       message: "Warning",
  //       description: `you need to be a premium user to create a bonfire`,
  //     });
  //   }
  //   setCreateBonfireModalVisible(true);
  // };

  const onInviteColleague = () => {
    if (userProfile.memberShip && userProfile.memberShip !== "premium") {
      return notification.warning({
        message: "Warning",
        description: `you need to be a premium user to invite a user`,
      });
    }
    setModalFormInviteColleaguesVisible(true);
  };

  useEffect(() => {
    setFilters({});
  }, [localPathname]);

  const childrenWithFilterProp = children
    ? React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { filters, onSearch });
        }
        return child;
      })
    : null;

  if (userProfile.percentOfCompletion && userProfile.percentOfCompletion < 100)
    return <Redirect to="/" />;

  const handleCustomTab = (tabTitle, tabIndex) => {
    setCurrentTab(`${tabIndex}`);
    setSelectTab(tabTitle);
  };

  return (
    <div className="global-conference">
      <GlobalConferenceFilterPanel
        onChange={onFilterChange}
        onSearch={onSearch}
        filters={filters}
        view={localPathname}
        onAttend={onAttend}
        onInviteColleague={onInviteColleague}
        setModalRequirementsVisible={setModalRequirementsVisible}
        setModalVisibleWelcomingMessage={setModalVisibleWelcomingMessage}
        downloadPdf={downloadPdf}
      />
      <FilterDrawer
        onChange={onFilterChange}
        onSearch={onSearch}
        filters={filters}
        view={localPathname}
        onAttend={onAttend}
        onInviteColleague={onInviteColleague}
        setModalRequirementsVisible={setModalRequirementsVisible}
      />

      <div className="global-conference-container">
        <div className="global-conference-container-top-menu">
          <div className="global-conference__filters--button">
            <CustomButton
              text="Filters"
              onClick={() => {
                showFilterPanel();
              }}
            />

            {window.screen.width <= 1024 && (
              <div
                className="button-containers"
                style={{ marginBottom: "10px" }}
              >
                {userProfile.attendedToConference ? (
                  <>
                    <div className="attending-label">
                      <CheckOutlined />
                      <span>I'm attending</span>
                    </div>
                    <CustomButton
                      className="not-going-button"
                      text="Not attending"
                      size="xs"
                      type="remove"
                      remove={true}
                      onClick={onAttend}
                    />
                    <CustomButton
                      size="xs"
                      text="Invite Your Colleagues"
                      style={{ padding: "0px 28px" }}
                      onClick={onInviteColleague}
                    />
                  </>
                ) : (
                  <CustomButton
                    size="xs"
                    text="Attend the conference"
                    onClick={onAttend}
                  />
                )}
                <CustomButton
                  text="Accessibility Requirements"
                  size="xs"
                  type="info"
                  className="button-requirements"
                  onClick={() => setModalRequirementsVisible(true)}
                />

                <CustomButton
                  text="Welcoming Message"
                  size="xs"
                  style={{ padding: "0px 35px", marginTop: "12px" }}
                  onClick={() => setModalVisibleWelcomingMessage(true)}
                />
                {/* <CustomButton
                  size="xs"
                  text="Download Full Schedule"
                  style={{ marginTop: "12px", padding: "0px 22px" }}
                  onClick={() => downloadPdf("conference-schedule")}
                /> */}

                {localPathname === "personal-agenda" && (
                  <>
                    <CustomButton
                      size="xs"
                      text="Download Personalized Agenda"
                      style={{ marginTop: "12px", padding: "0px 0px" }}
                      onClick={() => downloadPdf("personal-agenda")}
                    />

                    {moment().date() >= 7 &&
                      moment().month() >= 2 &&
                      moment().year >= 2022 && (
                        <CustomButton
                          size="xs"
                          text="Download Personalized Participation Report"
                          style={{ marginTop: "12px", padding: "0px 0px" }}
                          onClick={() => downloadPdf("report-sessions-joined")}
                        />
                      )}
                  </>
                )}
              </div>
            )}
          </div>
          <div className="global-conference-pagination">
            <Menu
              mode="horizontal"
              className="sub-menu"
              selectedKeys={localPathname}
            >
              <Menu.Item
                key="global-conference"
                className="sub-menu-item-global-conference"
              >
                <Link to="/global-conference">Conference Schedule</Link>
              </Menu.Item>

              <Menu.Item
                key="speakers"
                className="sub-menu-item-global-conference"
              >
                <Link to={INTERNAL_LINKS.GLOBAL_CONFERENCE_SPEAKERS}>
                  Speakers
                </Link>
              </Menu.Item>
              <Menu.Item
                key="participants"
                className="sub-menu-item-global-conference"
              >
                <Link to={INTERNAL_LINKS.GLOBAL_CONFERENCE_PARTICIPANTS}>
                  Participants
                </Link>
              </Menu.Item>

              {/* <Menu.Item
                key="partners"
                className="sub-menu-item-global-conference"
              >
                <Link to={INTERNAL_LINKS.GLOBAL_CONFERENCE_PARTNERS}>
                  Partners
                </Link>
              </Menu.Item> */}

              {/* <Menu.Item
                key="bonfire"
                className="sub-menu-item-global-conference"
              >
                <Link to={INTERNAL_LINKS.GLOBAL_CONFERENCE_BONFIRE}>
                  Bonfire
                </Link>
              </Menu.Item> */}
              <Menu.Item
                key="personal-agenda"
                className="sub-menu-item-global-conference"
              >
                <Link to={INTERNAL_LINKS.GLOBAL_CONFERENCE_PERSONAL_AGENDA}>
                  My Personal Agenda
                </Link>
              </Menu.Item>

              <Menu.Item
                key="conference-leaderboard"
                className="sub-menu-item-global-conference"
              >
                <Link to={INTERNAL_LINKS.GLOBAL_CONFERENCE_LEADERBOARD}>
                  Conference Leaderboard
                </Link>
              </Menu.Item>
            </Menu>

            {!childrenWithFilterProp && (
              <Menu
                mode="horizontal"
                className="sub-menu"
                selectedKeys={selectTab}
                style={{ display: "flex", justifyContent: "center" }}
              >
                {tabData.map((tab, index) => (
                  <Menu.Item
                    key={tab.title}
                    className="sub-menu-item-global-conference-fake-tabs"
                    onClick={() => handleCustomTab(tab.title, index)}
                  >
                    {tab.title}
                  </Menu.Item>
                ))}
              </Menu>
            )}

            {/* <div style={{ display: "flex" }}>
              <CustomButton
                type="primary outlined"
                size="xs"
                text="<"
                onClick={goToPrevPage}
              />
              <CustomButton
                type="primary outlined"
                size="xs"
                text=">"
                onClick={goToNextPage}
              />
            </div> */}
          </div>
        </div>
        {childrenWithFilterProp ? (
          childrenWithFilterProp
        ) : (
          <div className="global-conference-tabs">
            <Tabs
              data={tabData}
              current={currentTab}
              onChange={setCurrentTab}
            />
          </div>
        )}
      </div>

      <CreateBonfireModal
        visible={createBonfireModalVisible}
        onCancel={() => setCreateBonfireModalVisible(false)}
      />

      <InviteColleaguesFormModal
        visible={modalFormInviteColleaguesVisible}
        onCancel={() => {
          setModalFormInviteColleaguesVisible(false);
        }}
      />

      <AccessibilityRequirementsModal
        visible={modalRequirementsVisible}
        onCancel={() => setModalRequirementsVisible(false)}
      />

      <CustomModal
        visible={modalMessageVisible}
        title="Attention!"
        width={500}
        onCancel={() => setModalMessageVisible(false)}
      >
        <div dangerouslySetInnerHTML={{ __html: messageAdmin.html }} />
      </CustomModal>

      <RecommendedAgendaModal
        visible={modalRecommendeAgendaVisible}
        onCancel={() => setModalRecommendeAgendaVisible(false)}
      />

      <CustomModal
        visible={modalVisibleWelcomingMessage}
        title="Welcome to Hacking HR 2022"
        width={500}
        onCancel={() => setModalVisibleWelcomingMessage(false)}
      >
        <p className="global-conference-description">{Description}</p>
      </CustomModal>

      <AcceptTermsAndConditions />
    </div>
  );
};

GlobalConference.propTypes = {
  title: PropTypes.string,
};

GlobalConference.defaultProps = {
  title: "",
};

const mapStateToProps = (state) => ({
  ...sessionSelector(state),
  userProfile: homeSelector(state).userProfile,
  allEvents: eventSelector(state).allEvents,
});

const mapDispatchToProps = {
  getAllSessions,
  getSessionsUserJoined,
  attendToGlobalConference,
  getAllEvent,
  setLoading,
  addToMyEventList,
  removeFromMyEventList,
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalConference);
