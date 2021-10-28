import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { connect } from "react-redux";
import { Menu } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { CustomButton, Tabs } from "components";
import jsPdf from "jspdf";
import { convertToCertainTime } from "utils/format";

import ConferenceList from "./ConferenceList";
import FilterDrawer from "./FilterDrawer";
import { GlobalConferenceFilterPanel } from "components";
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

const Description = `
  Developing Talent & Leadership behaviors. Positive Design Thinking & Strategy through Positive Leadership Strategy and POSITIVE & AGILE coaching | 2 hack habits, goal achievement, and behavior transformation in organizations, sports clubs, PYMES, and corporations.
`;
const TAB_NUM = 7;

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
  }, [getSessionsAddedbyUser]);

  const downloadPdf = async () => {
    setLoading(true);

    const template = document.createElement("div");

    template.setAttribute("id", "template-agenda");
    template.style = "width: 750px; margin-top: 1rem";

    let content = `<h1 style="text-align: center">My personalizated agenda</h1>`;

    const sessionsOrdered = sessionsUser.sort((a, b) => {
      if (a.startTime > b.startTime) {
        return 1;
      } else if (a.startTime > b.startTime) {
        return -1;
      }

      return 0;
    });

    for (const session of sessionsOrdered) {
      content += `<div style="margin: 20px 100px; border: 1px solid #e1e2ee; border-radius: 4px">
         <div style="">
            <h3 style="color: rgba(0, 0, 0, 0.85); font-weight: 500;">${
              session.title
            }</h3>
            <span style="font-size: 14px; line-height: 19px; color: #697077;">Session type: ${
              session.type
            }</span>
            <span style="font-size: 14px; line-height: 19px; color: #697077; margin: 1rem 0">${convertToCertainTime(
              session.startTime,
              session.timezone
            ).format("MMM, D, YYYY")}</span>

            <div>
            ${session.categories.map((categorie) => {
              return `<span style="border: 1px solid #438cef; color: #438cef; max-width: 200
              px
              ;">${categorie}</span>`;
            })}
            </div>
            <h3 style="color: rgba(0, 0, 0, 0.85); font-weight: 500;">Description</h3>
            <p>${session.description}<p>
         </div>
      </div>`;
    }

    template.innerHTML = content;

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
        <div className="global-conference-page__filters--button">
          <CustomButton
            text="Filters"
            onClick={() => {
              showFilterPanel();
            }}
          />
        </div>
        <div className="global-conference-container-top-menu">
          <div className="d-flex items-center">
            {userProfile.attendedToConference ? (
              <>
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
              // onClick={this.handleClick}
              //selectedKeys={"speakers"}
              mode="horizontal"
              style={{
                lineHeight: "35px",
                background: "none",
                width: "80%",
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
                <Link
                  to="/participants"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Participants
                </Link>
              </Menu.Item>
              <Menu.Item
                key="partners"
                className="sub-menu-item-global-conference"
              >
                <Link to="/partners" target="_blank" rel="noopener noreferrer">
                  Partners
                </Link>
              </Menu.Item>
              <Menu.Item
                key="bonfire"
                className="sub-menu-item-global-conference"
              >
                <Link href="/bonfire" target="_blank" rel="noopener noreferrer">
                  Bonfire
                </Link>
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
  setLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalConference);
