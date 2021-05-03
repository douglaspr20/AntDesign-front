import React, { useState } from "react";
import PropTypes from "prop-types";

import { CustomButton, Tabs } from "components";

import ConferenceList from "./ConferenceList";

import "./style.scss";

const Description = `
  Developing Talent & Leadership behaviors. Positive Design Thinking & Strategy through Positive Leadership Strategy and POSITIVE & AGILE coaching | 2 hack habits, goal achievement, and behavior transformation in organizations, sports clubs, PYMES, and corporations.
`;

const GlobalConference = ({ title }) => {
  const [currentTab, setCurrentTab] = useState("0");

  const TabData = [
    {
      title: "March 07",
      content: () => <ConferenceList />,
    },
    {
      title: "March 08",
      content: () => <ConferenceList />,
    },
    {
      title: "March 09",
      content: () => <ConferenceList />,
    },
    {
      title: "March 10",
      content: () => <ConferenceList />,
    },
    {
      title: "March 11",
      content: () => <ConferenceList />,
    },
  ];

  return (
    <div className="global-conference">
      <div className="global-conference-container">
        <div className="w-full d-flex justify-between items-center">
          <h3>HHRR Global Conference 2021</h3>
          <CustomButton size="xs" text="Attend the conference" />
        </div>
        <p className="global-conference-description">{Description}</p>
        <div className="global-conference-tabs">
          <Tabs data={TabData} current={currentTab} onChange={setCurrentTab} />
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

export default GlobalConference;
