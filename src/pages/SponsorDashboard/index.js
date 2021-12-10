import React, { useState, useEffect } from "react";
import { Tabs } from "components";
import "./styles.scss";
import { connect } from "react-redux";
import { Doughnut } from "./components";

import { options1, getDoughnutData1, options2, getDoughnutData2, options3, getDoughnutData3, optionCountry, getCountries } from './data'

import { actions as homeActions } from "redux/actions/home-actions";
import { homeSelector } from "redux/selectors/homeSelector";

const barLabels = [
  "C-Suite",
  "VP or SVP",
  "Director",
  "Manager",
  "Professional",
  "Junior",
];

const SponsorDashboard = ({ getAllUsers, allUsers }) => {
  const [currentTab, setCurrentTab] = useState("0");

  useEffect(() => {
    getAllUsers();

    // eslint-disable-next-line
  }, []);


  const TabData = [
    {
      title: "Demographics",
      content: () => (
        <div className="demographic-container">
          <div className="chart-container">
            <Doughnut data={getCountries(allUsers)} options={optionCountry}/>
          </div>
          <div className="chart-container">
            <Doughnut data={getDoughnutData1(allUsers)} options={options1}/>
          </div>
          <div className="chart-container">
            <Doughnut data={getDoughnutData2(allUsers)} options={options2}/>
          </div>
          <div className="chart-container">
            <Doughnut data={getDoughnutData3(allUsers)} options={options3}/>
          </div>
        </div>
      ),
    },
    {
      title: "Engagements",
      content: () => <div>Content 2</div>,
    },
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
