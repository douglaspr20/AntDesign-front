import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Tabs } from "components";
import NoItemsMessageCard from "components/NoItemsMessageCard";

import { Doughnut, VerticalBar } from "./components";
import SponsorsFilters from "./components/SponsorsFilters";
import AdvertisderDashboard from "./Advertiser";

import {
  // options1,
  // getDoughnutData1,
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
import "./styles.scss";

const SponsorDashboard = ({
  getAllUsers,
  allUsers,
  userProfile,
  countAllUsers,
  userCount,
}) => {
  const generalDemographics = allUsers.filter(
    (item) => item.percentOfCompletion === 100
  );

  const conferenceDemographics = allUsers.filter(
    (item) => item.attendedToConference === 1
  );

  const [currentTab, setCurrentTab] = useState("0");
  const [users, setUsers] = useState(conferenceDemographics);
  const [usersGeneral, setUsersGeneral] = useState(generalDemographics);

  useEffect(() => {
    getAllUsers();
    countAllUsers();

    // eslint-disable-next-line
  }, []);

  const content = (totalUsers) => (
    <>
      <div style={{ marginTop: "1rem" }}>
        <h3>Total number of users: {userCount}</h3>
      </div>
      <SponsorsFilters
        allUsers={allUsers}
        setUsers={setUsers}
        setUsersGeneral={setUsersGeneral}
        users={users}
        usersGeneral={usersGeneral}
        generalDemographics={generalDemographics}
        conferenceDemographics={conferenceDemographics}
        tab={currentTab}
      />
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
    </>
  );

  const TabData = [
    {
      title: "General Demographics",
      content: () => content(usersGeneral || generalDemographics),
    },
    {
      title: "2022 Conference Demographics",
      content: () => content(users || conferenceDemographics),
    },
    {
      title: "Advertiser Dashboard",
      content: () => <AdvertisderDashboard />,
    },
  ];

  return (
    <div className="sponsor-dashboard-page">
      {userProfile.isSponsor ? (
        <div className="sponsor-dashboard-container">
          <Tabs data={TabData} current={currentTab} onChange={setCurrentTab} />
        </div>
      ) : (
        <div className="sponsor-page__list-wrap">
          <NoItemsMessageCard
            message={`You must be a partner to see this view.`}
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  userProfile: homeSelector(state).userProfile,
  allUsers: homeSelector(state).allUsers,
  userCount: homeSelector(state).userCount,
});

const mapDispatchToProps = {
  ...homeActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(SponsorDashboard);
