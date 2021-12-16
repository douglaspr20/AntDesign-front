import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import moment from "moment-timezone";
import jsPdf from "jspdf";
import { Menu, notification, Modal, Form, Timeline, Space } from "antd";
import {
  CheckOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  CustomButton,
  Tabs,
  GlobalConferenceFilterPanel,
  CustomInput,
  CustomCheckbox,
  CustomSelect,
  CustomModal,
} from "components";
import {
  getAllSessions,
  getSessionsAddedbyUser,
  recommendedAgenda,
} from "redux/actions/session-actions";
import {
  attendToGlobalConference,
  setLoading,
  createInvitation,
  confirmAccessibilityRequirements,
} from "redux/actions/home-actions";
import { createBonfire } from "redux/actions/bonfire-actions";
import { sessionSelector } from "redux/selectors/sessionSelector";
import { homeSelector } from "redux/selectors/homeSelector";
import { categorySelector } from "redux/selectors/categorySelector";
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
import { EVENT_TYPES, SOCKET_EVENT_TYPE, TIMEZONE_LIST } from "enum";
import ConferenceList from "./ConferenceList";
import FilterDrawer from "./FilterDrawer";
import PersonalAgenda from "./PersonalAgenda";
import Bonfire from "./Bonfire";

import CategoriesSelect from "components/CategoriesSelect";
import Speakers from "./Speakers";
import Partners from "./Partners";
import Participants from "./Participants";
import ConferenceLeaderboard from "./ConferenceLeaderboard";

import "./style.scss";
import RecommendedAgendaForm from "./RecommendedAgenda";

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
  allCategories,
  allEvents,
  getAllEvent,
  createBonfire,
  userProfile,
  getAllSessions,
  getSessionsAddedbyUser,
  addToMyEventList,
  removeFromMyEventList,
  sessionsUser,
  setLoading,
  attendToGlobalConference,
  createInvitation,
  confirmAccessibilityRequirements,
  recommendedAgenda,
  recommendedAgendaSessions,
}) => {
  const [bonfireForm] = Form.useForm();
  const [colleaguesForm] = Form.useForm();

  const [currentTab, setCurrentTab] = useState("0");
  const [firstTabDate] = useState(moment("2021-12-17", "YYYY-MM-DD"));
  const [tabData, setTabData] = useState([]);
  const [filters, setFilters] = useState({});
  const [meta, setMeta] = useState("");
  const [modalFormVisible, setModalFormVisible] = useState(false);
  const [
    modalFormInviteColleaguesVisible,
    setModalFormInviteColleaguesVisible,
  ] = useState(false);
  const [modalRequirementsVisible, setModalRequirementsVisible] =
    useState(false);

  const [modalMessageVisible, setModalMessageVisible] = useState(false);
  const [messageAdmin, setMessageAdmin] = useState("");
  const [isConsultantOrHRTech, setIsConsultantOrHRTech] = useState(false);
  const [currentView, setCurrentView] = useState("conference-schedule");
  const [modalRecommendeAgendaVisible, setModalRecommendeAgendaVisible] =
    useState(false);
  const [recommendedAgendaStep, setRecommendedAgendaStep] = useState(0);
  const [recommendedAgendaForm, setRecommendedAgendaForm] = useState({});

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

  const handleView = (view) => {
    setCurrentView(view);
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
    if (userProfile.id) {
      getSessionsAddedbyUser(userProfile.id);
    }
  }, [getSessionsAddedbyUser, userProfile]);

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
    setModalFormVisible(true);
    bonfireForm.resetFields();
  };

  const onCancelModalForm = () => {
    setModalFormVisible(false);
    setModalFormInviteColleaguesVisible(false);
    colleaguesForm.resetFields();
    bonfireForm.resetFields();
  };

  const onInviteColleague = () => {
    if (userProfile.memberShip && userProfile.memberShip !== "premium") {
      return notification.warning({
        message: "Warning",
        description: `you need to be a premium user to invite a user`,
      });
    }
    setModalFormInviteColleaguesVisible(true);
    colleaguesForm.resetFields();
  };

  const handleChecked = (e) => {
    setIsConsultantOrHRTech(e.target.checked);
  };

  const handleBonfire = (data) => {
    const timezone = TIMEZONE_LIST.find(
      (timezone) => timezone.value === data.timezone
    );
    const convertedStartTime = moment
      .tz(
        data.time.format("YYYY-MM-DD h:mm a"),
        "YYYY-MM-DD h:mm a",
        timezone.utc[0]
      )
      .utc()
      .format();

    const convertedEndTime = moment
      .tz(
        data.time.format("YYYY-MM-DD h:mm a"),
        "YYYY-MM-DD h:mm a",
        timezone.utc[0]
      )
      .utc()
      .add("hour", 1)
      .format();

    const bonfireInfo = {
      title: data.title,
      description: data.description,
      link: data.link,
      startTime: convertedStartTime,
      endTime: convertedEndTime,
      isConsultantOrHRTech,
      categories: data.categories,
      bonfireCreator: userProfile.id,
      timezone: data.timezone,
    };

    setModalFormVisible(false);

    createBonfire(bonfireInfo, (error) => {
      if (error) {
        notification.error({
          message: error || "Something went wrong. Please try again.",
        });
      }
    });

    bonfireForm.resetFields();
  };

  const handleSubmitEmailColleagues = (data) => {
    createInvitation(data.usersInvited, userProfile.id);

    setModalFormInviteColleaguesVisible(false);

    colleaguesForm.resetFields();
  };

  const handleConfirmAccessibilityRequirements = (userId) => {
    confirmAccessibilityRequirements(userId, (error) => {
      if (error) {
        notification.error({
          message: error || "Something went wrong. Please try again.",
        });
      }
    });
    setModalRequirementsVisible(false);
  };

  const handleSubmitRecommendedAgenda = (data) => {
    if (data.topics) {
      if (recommendedAgendaStep !== 1) {
        setRecommendedAgendaStep(recommendedAgendaStep + 1);
        setRecommendedAgendaForm({
          ...recommendedAgendaForm,
          ...data,
        });
      }
    } else if (recommendedAgendaForm.topics && data.time) {
      const newRecomendedAgendaValues = {
        ...recommendedAgendaForm,
        ...data,
      };
      recommendedAgenda(newRecomendedAgendaValues);
      setModalRecommendeAgendaVisible(false);
      setRecommendedAgendaStep(0);
      setCurrentView("recommended-agenda");
    }
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
              selectedKeys={currentView}
            >
              <Menu.Item
                key="conference-schedule"
                className="sub-menu-item-global-conference"
                onClick={() => handleView("conference-schedule")}
              >
                <Link to="/global-conference">Conference Schedule</Link>
              </Menu.Item>

              <Menu.Item
                key="speakers"
                className="sub-menu-item-global-conference"
              >
                <Link
                  to="/global-conference"
                  onClick={() => handleView("speakers")}
                >
                  Speakers
                </Link>
              </Menu.Item>
              <Menu.Item
                key="participants"
                className="sub-menu-item-global-conference"
              >
                <Link
                  to="/global-conference"
                  onClick={() => handleView("participants")}
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
                  onClick={() => handleView("partners")}
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
                <Link to="/global-conference">My Personal Agenda</Link>
              </Menu.Item>

              <Menu.Item
                key="conference-leaderboard"
                className="sub-menu-item-global-conference"
                onClick={() => handleView("conference-leaderboard")}
              >
                <Link to="/global-conference">Conference Leaderboard</Link>
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
        {currentView === "speakers" && <Speakers />}
        {currentView === "participants" && <Participants />}
        {currentView === "partners" && <Partners />}
        {currentView === "bonfire" && <Bonfire />}
        {currentView === "personal-agenda" && (
          <PersonalAgenda sessionsUser={sessionsUser} filters={filters} />
        )}

        {currentView === "recommended-agenda" && (
          <>
            {recommendedAgendaSessions.length > 0 ? (
              <PersonalAgenda
                sessionsUser={recommendedAgendaSessions}
                filters={filters}
              />
            ) : (
              <div className="sessions-not-found">
                <h1>No Sessions Found For Your Recommended Agenda</h1>
                <CustomButton
                  type="primary"
                  text="Reload"
                  size="md"
                  onClick={() => setCurrentView("conference-schedule")}
                />
              </div>
            )}
          </>
        )}
        {currentView === "conference-leaderboard" && <ConferenceLeaderboard />}
      </div>

      <Modal
        visible={modalFormVisible}
        onCancel={() => {
          onCancelModalForm();
        }}
        onOk={() => {
          bonfireForm.submit();
        }}
      >
        <Form
          form={bonfireForm}
          layout="vertical"
          onFinish={(data) => {
            handleBonfire(data);
          }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Title is required." }]}
          >
            <CustomInput />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Description is required." }]}
          >
            <CustomInput multiple={true} />
          </Form.Item>

          <Form.Item
            name="time"
            label="Start time"
            rules={[{ required: true, message: "Time is required." }]}
          >
            <CustomInput type="time" />
          </Form.Item>

          <Form.Item
            name={"timezone"}
            label="Timezone"
            rules={[{ required: true, message: "Timezone is required." }]}
          >
            <CustomSelect
              showSearch
              options={TIMEZONE_LIST}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              className="border"
            />
          </Form.Item>

          <Form.Item
            name="categories"
            label="Categories"
            rules={[{ required: true, message: "Categories is required." }]}
          >
            <CategoriesSelect options={allCategories} />
          </Form.Item>

          <Form.Item
            label="Link"
            name="link"
            rules={[{ required: true, message: "Link is required." }]}
          >
            <CustomInput />
          </Form.Item>

          <Form.Item name="isConsultantOrHRTech">
            <CustomCheckbox
              onChange={handleChecked}
              checked={isConsultantOrHRTech}
            >
              Are you a consultant or HR tech/service vendor?
            </CustomCheckbox>

            {isConsultantOrHRTech && (
              <p style={{ color: "#e61e47" }}>
                Please note: you should not use the bonfire feature to sell
                services or products. These are networking conversations. This
                is a mandatory requirement. Bonfires are not the venues for
                selling and you will be banned from using this feature if you
                use it for a purpose other than networking
              </p>
            )}
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        visible={modalFormInviteColleaguesVisible}
        footer={null}
        width={800}
        onCancel={() => {
          onCancelModalForm();
        }}
        bodyStyle={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Form
          layout="vertical"
          onFinish={(data) => {
            handleSubmitEmailColleagues(data);
          }}
          autoComplete="off"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          form={colleaguesForm}
        >
          <Form.List
            name="usersInvited"
            initialValue={[{ name: "", email: "" }]}
          >
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space
                    Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      label="Name"
                      name={[name, "name"]}
                      fieldKey={[fieldKey, "name"]}
                      rules={[
                        {
                          required: true,
                          message: "Please Enter the Name of Invited",
                        },
                      ]}
                    >
                      <CustomInput />
                    </Form.Item>

                    <Form.Item
                      label="Email"
                      name={[name, "email"]}
                      fieldKey={[fieldKey, "email"]}
                      rules={[
                        {
                          required: true,
                          type: "email",
                          message: "is not valid Email",
                        },
                      ]}
                    >
                      <CustomInput />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <CustomButton
                    type="info"
                    text="Invite another colleague"
                    size="xs"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    className="button-invite-colleague"
                  />
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item>
            <CustomButton size="xs" text="Invite" htmlType="submit" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="We would love to hear about your access requirements. The ways we can help are:"
        centered
        visible={modalRequirementsVisible}
        width={800}
        footer={[
          <CustomButton
            text="Click here to confirm (we will get in touch with you)"
            onClick={() =>
              handleConfirmAccessibilityRequirements(userProfile.id)
            }
            size="xs"
          />,
        ]}
        onCancel={() => setModalRequirementsVisible(false)}
      >
        <TransformWrapper initialScale={1}>
          {({ zoomIn, zoomOut }) => (
            <div style={{ display: "flex" }}>
              <TransformComponent>
                <Timeline style={{ padding: "20px" }}>
                  <Timeline.Item>
                    Help reviewing or selecting your sessions to build your own
                    agenda (perhaps due to a vision, hearing or learning
                    impairment)
                  </Timeline.Item>
                  <Timeline.Item>
                    A transcript or only-audio file of the sessions (although
                    autogenerated captions will be provided for all the panels
                    during the conference, and for the presentations the week
                    after the conference).
                  </Timeline.Item>
                  <p>
                    Please confirm below and we will get in touch in touch with
                    you via email. Thank you!
                  </p>
                </Timeline>
              </TransformComponent>
              <div>
                <CustomButton
                  className="zoom-button"
                  text="+"
                  onClick={(e) => zoomIn(e)}
                />
                <CustomButton
                  className="zoom-button"
                  text="-"
                  onClick={(e) => zoomOut(e)}
                />
              </div>
            </div>
          )}
        </TransformWrapper>
      </Modal>
      <CustomModal
        visible={modalMessageVisible}
        title="Attention!"
        width={500}
        onCancel={() => setModalMessageVisible(false)}
      >
        <div dangerouslySetInnerHTML={{ __html: messageAdmin.html }} />
      </CustomModal>

      <Modal
        centered
        visible={modalRecommendeAgendaVisible}
        onCancel={() => {
          setModalRecommendeAgendaVisible(false);
          setRecommendedAgendaStep(0);
        }}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={(data) => handleSubmitRecommendedAgenda(data)}
          style={{ textAlign: "center" }}
        >
          <RecommendedAgendaForm
            allCategories={allCategories}
            step={recommendedAgendaStep}
          />
          <CustomButton
            htmlType="submit"
            text={recommendedAgendaStep === 1 ? "Send" : "Next"}
            type="primary"
            size="md"
          />
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
  allEvents: eventSelector(state).allEvents,
});

const mapDispatchToProps = {
  getAllSessions,
  getSessionsAddedbyUser,
  attendToGlobalConference,
  createBonfire,
  getAllEvent,
  setLoading,
  addToMyEventList,
  removeFromMyEventList,
  createInvitation,
  confirmAccessibilityRequirements,
  recommendedAgenda,
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalConference);
