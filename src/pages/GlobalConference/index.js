import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import moment from "moment-timezone";
import jsPdf from "jspdf";
import { Menu, notification } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { INTERNAL_LINKS } from "enum";
import {
  CustomButton,
  Tabs,
  GlobalConferenceFilterPanel,
  CustomModal,
} from "components";
import { getAllSessions } from "redux/actions/session-actions";
import { getMarketplaceProfiles } from "redux/actions/marketplaceProfile-actions";
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

const Description = `
Welcome to the Hacking HR 2022 Global Online Conference 
planner. Here you will find all the sessions for the conference. You 
can add sessions to your personalized agenda and then download a
PDF. Notice that you can’t add two sessions that are happening the 
same day at the same time. You can also download the calendar 
invites to save the date. Finally, you can find the speakers and 
connect with other participants. Enjoy!
`;
const TAB_NUM = 5;

const GlobalConference = ({
  allSessions,
  allEvents,
  getAllEvent,
  userProfile,
  getAllSessions,
  getMarketplaceProfiles,
  addToMyEventList,
  removeFromMyEventList,
  sessionsUser,
  setLoading,
  attendToGlobalConference,
  children,
  history,
  location,
}) => {
  const [currentTab, setCurrentTab] = useState("0");
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
    if (localPathname.includes("talent-marketplace")) {
      return getMarketplaceProfiles(userProfile.id, value);
    }
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
  }, [getAllEvent]);

  useEffect(() => {
    SocketIO.on(SOCKET_EVENT_TYPE.SEND_MESSAGE_GLOBAL_CONFERENCE, (message) =>
      showModalMessage(message)
    );
  }, []);

  const downloadPdf = async () => {
    setLoading(true);

    if (sessionsUser.length < 1) {
      setLoading(false);
      return notification.warning({
        message: "You have no sessions",
        description: `Add your first session before downloading personalized agenda” if 
        someone tries to download it without having added any session to 
        their agenda`,
      });
    }

    const template = formatAnnualConference(userProfile, sessionsUser);

    const pdf = new jsPdf({
      orientation: "p",
      format: "a4",
      unit: "px",
      hotfixes: ["px_scaling"],
      precision: 32,
    });

    await pdf.html(template);

    pdf.save("Personalizated Agenda.pdf");

    setLoading(false);
  };

  const onAddBonfire = () => {
    if (userProfile.memberShip && userProfile.memberShip !== "premium") {
      return notification.warning({
        message: "Warning",
        description: `you need to be a premium user to create a bonfire`,
      });
    }
    setCreateBonfireModalVisible(true);
  };

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

  return (
    <div className="global-conference">
      <GlobalConferenceFilterPanel
        onChange={onFilterChange}
        onSearch={onSearch}
        filters={filters}
        view={localPathname}
      />
      <FilterDrawer
        onChange={onFilterChange}
        onSearch={onSearch}
        filters={filters}
        view={localPathname}
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
          </div>
          <div className="button-containers">
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
                  onClick={() => onInviteColleague()}
                  style={{ marginLeft: "1rem" }}
                  className="global-conference-buttom-options"
                />

                <CustomButton
                  size="xs"
                  text="Recommended Agenda"
                  onClick={() => setModalRecommendeAgendaVisible(true)}
                  style={{ marginLeft: "1rem" }}
                  className="global-conference-buttom-options"
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
              size="xs"
              text="Talent Marketplace"
              onClick={() =>
                history.push("/global-conference/my-talent-marketplace-profile")
              }
              style={{ marginLeft: "1rem" }}
              className="global-conference-buttom-options"
            />

            {localPathname === "personal-agenda" && (
              <CustomButton
                size="xs"
                text="Download  Personalized Agenda"
                style={{ marginLeft: "1rem" }}
                onClick={downloadPdf}
              />
            )}

            {localPathname === "bonfires" && (
              <CustomButton
                size="xs"
                text="Create Bonfire"
                style={{ marginLeft: "1rem" }}
                onClick={() => onAddBonfire()}
              />
            )}
          </div>
          <p className="global-conference-description">{Description}</p>
          <CustomButton
            text="Accessibility Requirements"
            size="xs"
            type="info"
            className="button-requirements"
            onClick={() => setModalRequirementsVisible(true)}
          />
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

              <Menu.Item
                key="partners"
                className="sub-menu-item-global-conference"
              >
                <Link to={INTERNAL_LINKS.GLOBAL_CONFERENCE_PARTNERS}>
                  Partners
                </Link>
              </Menu.Item>

              <Menu.Item
                key="bonfire"
                className="sub-menu-item-global-conference"
              >
                <Link to={INTERNAL_LINKS.GLOBAL_CONFERENCE_BONFIRE}>
                  Bonfire
                </Link>
              </Menu.Item>
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
          {(localPathname === "talent-marketplace" ||
            localPathname === "my-talent-marketplace-profile") && (
            <Menu
              mode="horizontal"
              className="sub-menu"
              selectedKeys={localPathname}
            >
              <>
                <Menu.Item
                  key="my-talent-marketplace-profile"
                  className="sub-menu-item-global-conference"
                >
                  <Link to="/global-conference/my-talent-marketplace-profile">
                    My Talent Marketplace Profile
                  </Link>
                </Menu.Item>

                <Menu.Item
                  key="talent-marketplace"
                  className="sub-menu-item-global-conference"
                >
                  <Link to="/global-conference/talent-marketplace">
                    Talent Marketplace
                  </Link>
                </Menu.Item>
              </>
            </Menu>
          )}
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
  attendToGlobalConference,
  getAllEvent,
  setLoading,
  addToMyEventList,
  removeFromMyEventList,
  getMarketplaceProfiles,
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalConference);
