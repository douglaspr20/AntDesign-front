import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { connect } from "react-redux";
import { Menu } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { CustomButton, Tabs } from "components";

import ConferenceList from "./ConferenceList";
import FilterDrawer from "./FilterDrawer";
import { GlobalConferenceFilterPanel } from "components";
import {
  getAllSessions,
  getSessionsAddedbyUser,
} from "redux/actions/session-actions";
import { attendToGlobalConference } from "redux/actions/home-actions";
import { sessionSelector } from "redux/selectors/sessionSelector";
import { homeSelector } from "redux/selectors/homeSelector";
import { convertToUTCTime, convertToLocalTime } from "utils/format";

import Emitter from "services/emitter";
import { EVENT_TYPES } from "enum";

import "./style.scss";

const Description = `
  Developing Talent & Leadership behaviors. Positive Design Thinking & Strategy through Positive Leadership Strategy and POSITIVE & AGILE coaching | 2 hack habits, goal achievement, and behavior transformation in organizations, sports clubs, PYMES, and corporations.
`;
const TAB_NUM = 7;

const GlobalConference = ({
  allSessions,
  userProfile,
  getAllSessions,
  getSessionsAddedbyUser,
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
    // getAllSessions({
    //   ...filters,
    //   meta: value,
    // });
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
    getSessionsAddedbyUser(1);
  }, []);

  return (
    <div className="global-conference">
      <GlobalConferenceFilterPanel
        onChange={onFilterChange}
        onSearch={onSearch}
      />
      <FilterDrawer onChange={onFilterChange} onSearch={setMeta} />
      <div className="global-conference-container">
        <div className="global-conference-page__filters--button">
          <CustomButton
            text="Filters"
            onClick={() => {
              showFilterPanel();
            }}
          />
        </div>
        <div className="global-conference-container-top-menu">
          {userProfile.attendedToConference ? (
            <div className="d-flex items-center">
              <div className="attending-label">
                <CheckOutlined />
                <span>I'm attending</span>
              </div>
              <CustomButton
                className="not-going-btn"
                text="Not attending"
                size="xs"
                type="remove"
                remove={true}
                onClick={onAttend}
              />
            </div>
          ) : (
            <CustomButton
              size="xs"
              text="Attend the conference"
              onClick={onAttend}
            />
          )}
          <p className="global-conference-description">{Description}</p>
          <div className="global-conference-pagination">
            <Menu
              // onClick={this.handleClick}
              //selectedKeys={"speakers"}
              mode="horizontal"
              style={{
                lineHeight: "35px",
                background: "none",
                width: "80%",
              }}
            >
              <Menu.Item key="speakers">
                <a
                  href="http://localhost:3001/speakers"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Speakers
                </a>
              </Menu.Item>
              <Menu.Item key="participants">
                <a
                  href="https://www.hackinghrlab.io/participants"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Participants
                </a>
              </Menu.Item>
              <Menu.Item key="partners">
                <a
                  href="https://www.hackinghrlab.io/partners"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Partners
                </a>
              </Menu.Item>
              <Menu.Item key="bonfire">
                <a
                  href="https://www.hackinghrlab.io/bonfire"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bonfire
                </a>
              </Menu.Item>
            </Menu>
            <div>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalConference);
