import React, { useState, useEffect } from "react";
import {Tabs, CustomSelect } from "components";
import "./styles.scss";
import { connect } from "react-redux";
import { Doughnut, VerticalBar } from "./components";
// import CategoriesSelect from "components/CategoriesSelect";

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
import { COUNTRIES, PROFILE_SETTINGS } from "enum";

const SponsorDashboard = ({ getAllUsers, allUsers }) => {
  const [currentTab, setCurrentTab] = useState("0");
  const [users, setUsers] = useState(null);
  const [usersGeneral, setUsersGeneral] = useState(null);
  // const [usersConferenceDomegraphics, setUsersConferenceDomegraphics] = useState(null)

  const generalDemographics = allUsers.filter(
    (item) => item.percentOfCompletion === 100
  );

  const conferenceDemographics = allUsers.filter(
    (item) => item.attendedToConference === 1
  );

  const OrgSizes = PROFILE_SETTINGS.ORG_SIZES;
  const JobLevels = PROFILE_SETTINGS.JOB_LEVELS;
  const WorkAreas = PROFILE_SETTINGS.WORK_AREAS;
  const topics = PROFILE_SETTINGS.TOPICS;

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line
  }, []);

  const onTopicsFilterChange = (value) => {
    setUsers(null);
    setUsersGeneral(null);

    const general = generalDemographics?.filter((item) =>
      item.topicsOfInterest?.includes(value)
    );
    const conference = conferenceDemographics?.filter((item) =>
      item.topicsOfInterest?.includes(value)
    );

    setUsersGeneral(general);
    setUsers(conference);
  };

  const searchCountries = (value) => {
    if (value === "") {
      setUsers(generalDemographics);
      return setUsersGeneral(generalDemographics);
    }

    const general = generalDemographics?.filter(
      (item) => item?.location === value
    );
    const conference = conferenceDemographics?.filter(
      (item) => item?.location === value
    );

    setUsersGeneral(general);
    setUsers(conference);
  };

  const sizeFilter = (value) => {
    const conference = generalDemographics?.filter(
      (item) => item?.sizeOfOrganization === value
    );

    const general = conferenceDemographics?.filter(
      (item) => item?.sizeOfOrganization === value
    );

    setUsers(conference);
    setUsersGeneral(general);
  };

  const jobLvlFilter = (value) => {
    const conference = generalDemographics?.filter(
      (item) => item?.recentJobLevel === value
    );

    const general = conferenceDemographics?.filter(
      (item) => item?.recentJobLevel === value
    );

    setUsers(conference);
    setUsersGeneral(general);
  };

  const workAreasFilter = (value) => {
    const general = generalDemographics?.filter((item) =>
      item.recentWorkArea?.some((el) => el === value)
    );

    const conference = conferenceDemographics?.filter((item) =>
      item.recentWorkArea?.some((el) => el === value)
    );

    setUsers(conference);
    setUsersGeneral(general);
  };

  const content = (totalUsers) => (
    <>
      <div className="filters-container">
        <div className="filter-item">
          <h4>Topics</h4>
          <CustomSelect
            options={topics}
            bordered
            onChange={onTopicsFilterChange}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          />
        </div>
        <div className="filter-item">
          <h4>Countries</h4>
          <CustomSelect
            options={COUNTRIES}
            bordered
            onChange={searchCountries}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          />
        </div>
        <div className="filter-item">
          <h4>Size of the organization</h4>
          <CustomSelect
            options={OrgSizes}
            bordered
            onChange={sizeFilter}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          />
        </div>
        <div className="filter-item">
          <h4>Recent job level</h4>
          <CustomSelect
            options={JobLevels}
            bordered
            onChange={jobLvlFilter}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          />
        </div>
        <div className="filter-item">
          <h4>Recently worked</h4>
          <CustomSelect
            options={WorkAreas}
            bordered
            onChange={workAreasFilter}filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          />
        </div>
      </div>
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
  ];

  return (
    <div className="sponsor-dashboard-page">
      {/* <SponsorFilterPanel
        filters={filters}
        setFilters={setFilters}
        onChange={onTopicsFilterChange}
      /> */}
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
