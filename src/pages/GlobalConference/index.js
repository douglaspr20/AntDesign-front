import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import jsPdf from "jspdf";
import { Menu, notification } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { CustomButton, Tabs, GlobalConferenceFilterPanel } from "components";
import ConferenceList from "./ConferenceList";
import FilterDrawer from "./FilterDrawer";
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
import { convertToUTCTime, convertToLocalTime } from "utils/format";
import Emitter from "services/emitter";
import { EVENT_TYPES } from "enum";
import "./style.scss";
import { Link } from "react-router-dom";
import { formatAnnualConference } from "utils/formatPdf";

const Description = `
  Developing Talent & Leadership behaviors. Positive Design Thinking & Strategy through Positive Leadership Strategy and POSITIVE & AGILE coaching | 2 hack habits, goal achievement, and behavior transformation in organizations, sports clubs, PYMES, and corporations.
`;
const TAB_NUM = 6;

const GlobalConference = ({
  allSessions,
  userProfile,
  getAllSessions,
  getSessionsAddedbyUser,
  sessionsUser,
  setLoading,
  attendToGlobalConference,
}) => {
  const [currentTab, setCurrentTab] = useState("0");
  const [firstTabDate, setFirstTabDate] = useState(
    moment("2022-03-07", "YYYY-MM-DD")
  );
  const [tabData, setTabData] = useState([]);
  const [filters, setFilters] = useState({});
  const [meta, setMeta] = useState("");

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

  const goToPrevPage = () => {
    setFirstTabDate(firstTabDate.clone().subtract(TAB_NUM, "days"));
  };

  const goToNextPage = () => {
    setFirstTabDate(firstTabDate.clone().add(TAB_NUM, "days"));
  };

  const onAttend = () => {
    attendToGlobalConference();
  };

  const comingSoon = (section) => {
    notification.open({
      message: "Coming Soon",
      description: `Soon you will have access to the section of ${section}`,
    });
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

            <CustomButton
              size="xs"
              text="Download  Personalized Agenda"
              style={{ marginLeft: "1rem" }}
              onClick={downloadPdf}
            />
          </div>
          <p className="global-conference-description">{Description}</p>
          <div className="global-conference-pagination">
            <Menu
              mode="horizontal"
              style={{
                lineHeight: "35px",
                background: "none",
                margin: "0px auto",
                width: "70%",
                display: "flex",
                justifyContent: "center",
              }}
            >
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
                <Link onClick={() => comingSoon("Participants")}>
                  Participants
                </Link>
              </Menu.Item>
              <Menu.Item
                key="partners"
                className="sub-menu-item-global-conference"
              >
                <Link onClick={() => comingSoon("Partners")}>Partners</Link>
              </Menu.Item>
              <Menu.Item
                key="bonfire"
                className="sub-menu-item-global-conference"
              >
                <Link onClick={() => comingSoon("Bonfire")}>Bonfire</Link>
              </Menu.Item>
            </Menu>
            <div style={{ display: "flex" }}>
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
            </div>
          </div>
        </div>

        <div className="global-conference-tabs">
          <Tabs data={tabData} current={currentTab} onChange={setCurrentTab} />
        </div>
      </div>
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
});

const mapDispatchToProps = {
  getAllSessions,
  getSessionsAddedbyUser,
  attendToGlobalConference,
  setLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalConference);
