import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import moment from "moment";
import jsPdf from "jspdf";
import { Menu, notification, Modal, Form } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import {
  CustomButton,
  Tabs,
  GlobalConferenceFilterPanel,
  CustomInput,
} from "components";

import {
  getAllSessions,
  getSessionsAddedbyUser,
} from "redux/actions/session-actions";
import {
  attendToGlobalConference,
  setLoading,
} from "redux/actions/home-actions";
import { sessionSelector } from "redux/selectors/sessionSelector";
import { homeSelector } from "redux/selectors/homeSelector";
import { categorySelector } from "redux/selectors/categorySelector";
import {
  addToMyEventList,
  removeFromMyEventList,
} from "redux/actions/event-actions";
import { convertToUTCTime, convertToLocalTime } from "utils/format";
import Emitter from "services/emitter";
import { EVENT_TYPES } from "enum";

import ConferenceList from "./ConferenceList";
import FilterDrawer from "./FilterDrawer";
import { formatAnnualConference } from "utils/formatPdf";
import PersonalAgenda from "./PersonalAgenda";
import Bonfire from "./Bonfire";

import "./style.scss";
import CategoriesSelect from "components/CategoriesSelect";

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
  allCategories,
  userProfile,
  getAllSessions,
  getSessionsAddedbyUser,
  addToMyEventList,
  removeFromMyEventList,
  sessionsUser,
  setLoading,
  attendToGlobalConference,
}) => {
  const [bonfireForm] = Form.useForm();
  const [currentTab, setCurrentTab] = useState("0");
  const [firstTabDate] = useState(moment("2022-03-07", "YYYY-MM-DD"));
  const [tabData, setTabData] = useState([]);
  const [filters, setFilters] = useState({});
  const [meta, setMeta] = useState("");
  const [modalFormVisible, setModalFormVisible] = useState(false);
  const [currentView, setCurrentView] = useState("bonfire");

  const onFilterChange = (filter) => {
    setFilters(filter);
  };

  const showFilterPanel = () => {
    Emitter.emit(EVENT_TYPES.OPEN_FILTER_PANEL);
  };

  const onSearch = (value) => {
    const startTime = convertToUTCTime(firstTabDate.clone());
    const endTime = convertToUTCTime(firstTabDate.clone().add(TAB_NUM, "days"));
    getAllSessions(startTime, endTime, value);
    setMeta(value);
  };

  // const goToPrevPage = () => {
  //   setFirstTabDate(firstTabDate.clone().subtract(TAB_NUM, "days"));
  // };

  // const goToNextPage = () => {
  //   setFirstTabDate(firstTabDate.clone().add(TAB_NUM, "days"));
  // };

  const onAttend = () => {
    const globalEvent = userProfile.events.find(
      (event) => event.isAnnualConference === 1
    );
    if (userProfile.attendedToConference === 0 && globalEvent) {
      addToMyEventList(userProfile.attendedToConference === 1 && globalEvent);
    } else if (userProfile.attendedToConference === 1 && globalEvent) {
      removeFromMyEventList(globalEvent);
      attendToGlobalConference();
    } else attendToGlobalConference();
  };

  const comingSoon = (section) => {
    notification.open({
      message: "Coming Soon",
      description: `Soon you will have access to the section of ${section}`,
    });
  };

  const handleView = (view) => {
    setCurrentView(view);
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
    if (userProfile.id) {
      getSessionsAddedbyUser(userProfile.id);
    }
  }, [getSessionsAddedbyUser, userProfile]);

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
    setModalFormVisible(true);
    // setIsUpdate(0);
    // instructorForm.resetFields();
  };

  const onCancelModalForm = () => {
    setModalFormVisible(false);
    // setIsUpdate(0);
    // instructorForm.resetFields();
  };

  if (userProfile.percentOfCompletion && userProfile.percentOfCompletion < 100)
    return <Redirect to="/" />;

  return (
    <div className="global-conference">
      <GlobalConferenceFilterPanel
        onChange={onFilterChange}
        onSearch={onSearch}
      />
      <FilterDrawer onChange={onFilterChange} onSearch={setMeta} />
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
          <div className="d-flex items-center">
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
              </>
            ) : (
              <CustomButton
                size="xs"
                text="Attend the conference"
                onClick={onAttend}
              />
            )}

            {currentView === "personal-agenda" && (
              <CustomButton
                size="xs"
                text="Download  Personalized Agenda"
                style={{ marginLeft: "1rem" }}
                onClick={downloadPdf}
              />
            )}

            {currentView === "bonfire" && (
              <CustomButton
                size="xs"
                text="Create Bonfire"
                style={{ marginLeft: "1rem" }}
                onClick={() => onAddBonfire()}
              />
            )}
          </div>
          <p className="global-conference-description">{Description}</p>
          <div className="global-conference-pagination">
            <Menu
              mode="horizontal"
              style={{
                lineHeight: "35px",
                background: "none",
                margin: "0px auto",
                width: "90%",
                display: "flex",
                justifyContent: "center",
              }}
              selectedKeys={currentView}
            >
              <Menu.Item
                key="conferences-schedule"
                className="sub-menu-item-global-conference"
                onClick={() => handleView("conference-schedule")}
              >
                <Link to="/global-conference">Conference Schedule</Link>
              </Menu.Item>

              <Menu.Item
                key="speakers"
                className="sub-menu-item-global-conference"
              >
                <Link to="/speakers" target="_blank" rel="noopener noreferrer">
                  Speakers
                </Link>
              </Menu.Item>
              <Menu.Item
                key="participants"
                className="sub-menu-item-global-conference"
              >
                <Link
                  to="/global-conference"
                  onClick={() => comingSoon("Participants")}
                >
                  Participants
                </Link>
              </Menu.Item>
              <Menu.Item
                key="partners"
                className="sub-menu-item-global-conference"
              >
                <Link
                  to="/global-conference"
                  onClick={() => comingSoon("Partners")}
                >
                  Partners
                </Link>
              </Menu.Item>
              <Menu.Item
                key="bonfire"
                className="sub-menu-item-global-conference"
              >
                <Link
                  to="/global-conference"
                  onClick={() => handleView("bonfire")}
                >
                  Bonfire
                </Link>
              </Menu.Item>
              <Menu.Item
                key="personal-agenda"
                className="sub-menu-item-global-conference"
                onClick={() => handleView("personal-agenda")}
              >
                <Link to="/global-conference">My personal agenda</Link>
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
        </div>
        {currentView === "conference-schedule" && (
          <div className="global-conference-tabs">
            <Tabs
              data={tabData}
              current={currentTab}
              onChange={setCurrentTab}
            />
          </div>
        )}

        {currentView === "personal-agenda" && (
          <PersonalAgenda sessionsUser={sessionsUser} filters={filters} />
        )}

        {currentView === "bonfire" && <Bonfire />}
      </div>

      <Modal
        visible={modalFormVisible}
        onCancel={() => {
          onCancelModalForm();
        }}
        onOk={() => {
          //instructorForm.submit();
        }}
      >
        <Form
          form={bonfireForm}
          layout="vertical"
          onFinish={(data) => {
            //handleInstructor(data);
          }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Title is required." }]}
          >
            <CustomInput />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <CustomInput multiple={true} />
          </Form.Item>

          <Form.Item
            name="time"
            label="Time"
            rules={[{ required: true, message: "Time is required." }]}
          >
            <CustomInput type="time" />
          </Form.Item>

          <Form.Item name="categories" label="Categories">
            <CategoriesSelect options={allCategories} />
          </Form.Item>

          <Form.Item
            label="Link"
            name="link"
            rules={[{ required: true, message: "Link is required." }]}
          >
            <CustomInput />
          </Form.Item>
        </Form>
      </Modal>
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
  allCategories: categorySelector(state).categories,
});

const mapDispatchToProps = {
  getAllSessions,
  getSessionsAddedbyUser,
  attendToGlobalConference,
  setLoading,
  addToMyEventList,
  removeFromMyEventList,
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalConference);
