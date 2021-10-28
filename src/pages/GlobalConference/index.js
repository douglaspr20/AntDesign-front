import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import jsPdf from "jspdf";
import { Menu } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { CustomButton, Tabs, GlobalConferenceFilterPanel } from "components";
import { convertToCertainTime } from "utils/format";
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
import LogoHackingHR from "images/img-hhr-logo.png";
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

    const template = document.createElement("div");

    template.setAttribute("id", "template-agenda");
    template.style =
      "width: 800px; height: auto; display: flex; flex-direction: column;align-items: center";

    let content = `<div style="height: 1000px; width: 100%; display: flex; flex-direction: column; 
    align-items: center; justify-content: center; border-bottom: 1px solid #cfd3d6; padding-bottom: 3rem; margin-bottom: 200px">
    <img src=${LogoHackingHR} style="width: 250px; height: 250px">
    <p style="font-weight: 800 !important; font-size: 3.5rem !important; text-align: center">2022</p>
    <p style="font-weight: 800 !important; font-size: 3.5rem !important; text-align: center; padding: 0px 150px">HR Innovation
    and Future of
    Work</p>
    <span style="font-weight: 800 !important; font-size: 1.5rem !important; text-align: center">Global Online Conference and Workshop </span>
    </div>
    
    <div style="height: 950px; width: 90%; display: flex; flex-direction: column; 
    align-items: center; justify-content: flex-start; border-bottom: 1px solid #cfd3d6; padding-bottom: 3rem; margin-bottom: 150px">
      <p style="font-size: 1.3rem">Personalized Agenda – Created on ${moment().format(
        "MM-DD-YYYY"
      )} </p>
      <p style="font-size: 1.3rem">DOWNLOAD</p>
      <p style="font-size: 1.3rem">${userProfile.firstName} ${
      userProfile.lastName
    }</p>
    </div>

    <div style="height: 950px; width: 90%; display: flex; flex-direction: column; 
    align-items: center; justify-content: flex-start; border-bottom: 1px solid #cfd3d6; padding-bottom: 3rem; margin-bottom: 200px">
        <div style="display: flex; justify-content: space-between; width: 90%; padding: 0px 30px 10px 0px">
          <img src=${LogoHackingHR} style="width: 70px; height: 70px">
          <div>
            <p style="font-size: 1.2rem; font-weight: bolder">2022 HR Innovation and Future of Work</p>
            <p style="margin-top: -20px">Global Online Conference | Personalized Agenda</p>
          </div>
        </div>

        <div>
          <p style="font-weight: 800 !important; font-size: 2.5rem !important; text-align: center">Event Overview</p>
          <p style="font-size: 1.5rem; padding: 0px 2.5rem">
          This is your personalized agenda. It includes the sessions 
          you are planning to join. 
          <br>
          <br>
          You can update your personalized agenda at any time 
          you want. Also, during conference week, you can join a 
          different session than the original one you added in your 
          personalized agenda. However, notice that during 
          conference week, once you click on “join” a session, you 
          won’t be able to join any other session happening at the 
          same time. 
          <br>
          <br>
          Regarding the HR certification credits: 1) you MUST be a 
          PREMIUM member in the Hacking HR LAB (click on 
          UPGRADE to become premium). There are no exceptions; 
          2) the codes will be sent to you two weeks after the 
          conference. We will ONLY send you the codes of the 
          sessions you actually JOINED; and 3) you can watch the 
          recordings later and still earn HR certification credits. 
          Thank you and enjoy! 
          </p>
        </div>
    </div>

    </div>
    `;

    const sessionsOrdered = sessionsUser.sort((a, b) => {
      if (a.startTime > b.startTime) {
        return 1;
      } else if (a.startTime > b.startTime) {
        return -1;
      }

      return 0;
    });

    const sData = [];

    for (let i = 0; i < sessionsOrdered.length; i++) {
      let isEmpty = true;
      for (let j = 0; j < sData.length; j++) {
        if (
          moment(sessionsOrdered[i]?.startTime).format("MMMM D") ===
          sData[j].period
        ) {
          sData[j].data.push(sessionsOrdered[i]);
          isEmpty = false;
        }
      }

      if (isEmpty) {
        sData.push({
          period: moment(sessionsOrdered[i].startTime).format("MMMM D"),
          data: [sessionsOrdered[i]],
        });
      }
    }

    console.log(sData);

    for (const day of sData) {
      let conferences = "";

      for (const conference of day.data) {
        let categorieHTML = "";
        for (const categorie of conference.categories) {
          categorieHTML += `    
              <div style="
              height: 28px;
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 0 20px;
              border-radius: 0.25rem;
              border: 1px solid #438cef;;
              color: #438cef;
              max-width: 200px;
              overflow: hidden;">
              <span style="overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;">${categorie}</span>
             
              </div>`;
        }
        conferences += `
        <div style="background: #fff; border: 1px solid #cfd3d6; box-shadow: 4px 0px 14px #37215714; 
        border-radius: 0.5rem;
        opacity: 1;
        padding: 2rem; margin-bottom: 50px">
             <div style="">
                <h3 style="color: rgba(0, 0, 0, 0.85); font-weight: 500;">${
                  conference.title
                }</h3>
                <span style="font-size: 14px; line-height: 19px; color: #697077;">Session type: ${
                  conference.type
                }</span>
                <span style="font-size: 14px; line-height: 19px; color: #697077; margin: 1rem 0">${convertToCertainTime(
                  conference.startTime,
                  conference.timezone
                ).format("MMM, D, YYYY")}</span>
    
                  <div style="  
                  display: flex;
                  width: 70%;
                  flex-wrap: wrap;
                  margin-top: 1rem;"
                  >
                  ${categorieHTML}
                  </div>

                  <div style="display: flex;
                  flex-direction: column;
                  padding-top: 1rem;
                  margin-top: 1rem;
                  border-top: 1px solid #e1e2ee">

                  <h4>Description</h4>
                  <p>
                  <p>${conference.description}<p>
                  </p>

                  </div>
             </div>
          </div>
        `;
      }

      content += `  
      <div style="height: 950px; width: 90%; display: flex; flex-direction: column; 
          align-items: center; justify-content: flex-start; border-bottom: 1px solid #cfd3d6; padding-bottom: 3rem;">
          <div style="display: flex; justify-content: space-between; width: 90%; padding: 0px 30px 10px 0px">
            <img src=${LogoHackingHR} style="width: 70px; height: 70px">
            <div>
              <p style="font-size: 1.2rem; font-weight: bolder">2022 HR Innovation and Future of Work</p>
              <p style="margin-top: -20px">Global Online Conference | Personalized Agenda</p>
            </div>
          </div>

             <p style="align-self: flex-start;font-weight: 800 !important; font-size: 2.5rem !important; margin-left: 40px">
             ${day.period}
             </p>

          <div style="width: 100%"> ${conferences}</div>
          </div>
          `;
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
