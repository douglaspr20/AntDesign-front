import React, { useState, useEffect } from "react";
import { Tabs } from "components";
import "./styles.scss";
import { connect } from "react-redux";
import { Doughnut, VerticalBar } from "./components";

import {
  options1,
  getDoughnutData1,
  options2,
  getDoughnutData2,
  options3,
  getDoughnutData3,
  optionCountry,
  getCountries,
  sizeOfOrganizationOption,
  sizeOfOrganizationChart,
  topicsOfInterestOption,
  topicsOfInterestChart,
} from "./data";

import { actions as homeActions } from "redux/actions/home-actions";
import { homeSelector } from "redux/selectors/homeSelector";

const SponsorDashboard = ({ getAllUsers, allUsers }) => {
  const [currentTab, setCurrentTab] = useState("0");

  const generalDemographics = allUsers.filter(
    (item) => item.percentOfCompletion === 100
  );

  const conferenceDemographics = allUsers.filter(
    (item) => item.attendedToConference === 1
  );

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line
  }, []);
  
  const content = (totalUsers) => (
    <div className="demographic-container">
      <div className="chart-container">
        <VerticalBar data={getDoughnutData3(totalUsers)} options={options3} />
      </div>
      <div className="chart-container">
        <VerticalBar
          data={topicsOfInterestChart(totalUsers)}
          options={topicsOfInterestOption}
        />
      </div>
      <div className="chart-container">
        <Doughnut
          data={sizeOfOrganizationChart(totalUsers)}
          options={sizeOfOrganizationOption}
        />
      </div>
      <div className="chart-container">
        <Doughnut data={getCountries(totalUsers)} options={optionCountry} />
      </div>
      {/* <div className="chart-container">
    <Doughnut data={getDoughnutData1(allUsers)} options={options1} />
  </div> */}
      <div className="chart-container">
        <Doughnut data={getDoughnutData2(totalUsers)} options={options2} />
      </div>
    </div>
  );

  const TabData = [
    {
      title: "Demographics",
      content: () => content(allUsers),
    },
    {
      title: "General demographics",
      content: () => content(generalDemographics),
    },
    {
      title: "Conference demographics",
      content: () => content(conferenceDemographics),
    },
    // {
    //   title: "Engagements",
    //   content: () => <div>Content 2</div>,
    // },
  ];

  return (
    <div className="sponsor-dashboard-page">
      <div className="sponsor-dashboard-container">
        <Tabs data={TabData} current={currentTab} onChange={setCurrentTab} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  allUsers: homeSelector(state).allUsers,
});

const mapDispatchToProps = {
  ...homeActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(SponsorDashboard);
