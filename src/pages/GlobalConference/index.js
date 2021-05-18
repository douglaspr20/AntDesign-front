import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { connect } from "react-redux";

import { CustomButton, Tabs } from "components";

import ConferenceList from "./ConferenceList";
import { getAllSessions } from "redux/actions/session-actions";
import { sessionSelector } from "redux/selectors/sessionSelector";
import { convertToUTCTime, convertToLocalTime } from "utils/format";

import "./style.scss";

const Description = `
  Developing Talent & Leadership behaviors. Positive Design Thinking & Strategy through Positive Leadership Strategy and POSITIVE & AGILE coaching | 2 hack habits, goal achievement, and behavior transformation in organizations, sports clubs, PYMES, and corporations.
`;
const TAB_NUM = 7;

const GlobalConference = ({ allSessions, getAllSessions }) => {
  const [currentTab, setCurrentTab] = useState("0");
  const [firstTabDate, setFirstTabDate] = useState(moment().startOf("day"));
  const [tabData, setTabData] = useState([]);

  const goToPrevPage = () => {
    setFirstTabDate(firstTabDate.clone().subtract(TAB_NUM, "days"));
  };

  const goToNextPage = () => {
    setFirstTabDate(firstTabDate.clone().add(TAB_NUM, "days"));
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
        content: () => <ConferenceList data={data} />,
      };
    });

    setTabData(tData);
  }, [firstTabDate, allSessions]);

  return (
    <div className="global-conference">
      <div className="global-conference-container">
        <div className="w-full d-flex justify-between items-center">
          <h3>HHRR Global Conference 2021</h3>
          <CustomButton size="xs" text="Attend the conference" />
        </div>
        <p className="global-conference-description">{Description}</p>
        <div className="global-conference-tabs">
          <div className="global-conference-pagination">
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
});

const mapDispatchToProps = {
  getAllSessions,
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalConference);
