import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment-timezone";
import { Tabs } from 'components'

import { homeSelector } from "redux/selectors/homeSelector";
import { skillCohortSelector } from "redux/selectors/skillCohortSelector";
import { skillCohortParticipantSelector } from "redux/selectors/skillCohortParticipantSelector";

import { actions as skillCohortActions } from "redux/actions/skillCohort-actions";
import { actions as skillCohortParticipantActions } from "redux/actions/skillCohortParticipant-actions";

import SkillCohortFilterDrawer from "./SkillCohortFilterDrawer";
import SkillCohortCard from "./SkillCohortCard";

import "./style.scss";

moment().tz("America/Los_Angeles").format();

const SkillCohort = ({
  allSkillCohorts,
  getAllSkillCohorts,
  userProfile,
  getAllParticipated,
  allSkillCohortParticipants,
  allOfMySkillCohorts,
  getAllOfMyCohort
}) => {
  useEffect(() => {
    getAllSkillCohorts([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [currentTab, setCurrentTab] = useState("0")

  useEffect(() => {
    if (userProfile.id) {
      getAllParticipated(userProfile.id);
      getAllOfMyCohort(userProfile.id)
    }
    // eslint-disable-next-line
  }, [userProfile]);

  const handleFilterChange = (filter) => {
    getAllSkillCohorts(filter.category);
  };

  const displaySkillCohorts = allSkillCohorts.map((skillCohort) => {
    const hasAccess = allSkillCohortParticipants.some((participant) => {
      return participant.SkillCohortId === skillCohort.id;
    });

    return (
      <SkillCohortCard
        key={skillCohort.id}
        skillCohort={skillCohort}
        hasAccess={hasAccess}
      />
    );
  });

  const sortedAllOfMySkillCohorts = allOfMySkillCohorts.sort((a, b) => {
    if (moment(a.startDate).format("YYYY-MM-DD HH:mm:ss") > moment(b.startDate).format("YYYY-MM-DD HH:mm:ss")) {
      return 1
    } 

    if (moment(a.startDate).format("YYYY-MM-DD HH:mm:ss") < moment(b.startDate).format("YYYY-MM-DD HH:mm:ss")) {
      return -1
    } 

    return 0
  })

  const displayMySkillCohorts = sortedAllOfMySkillCohorts.map((skillCohort) => {

    return (
      <SkillCohortCard
        key={skillCohort.id}
        skillCohort={skillCohort}
        hasAccess={true}
      />
    );
  });

  const TabData = [
    {
      title: "All Cohorts",
      content: () => {
        return <div className="skill-cohort-list">{displaySkillCohorts}</div>
      }
    },
    {
      title: "My Cohorts",
      content: () => {
        return <div className="skill-cohort-list">{displayMySkillCohorts}</div>
      }
    }
  ]

  return (
    <div className="skill-cohort-page">
      <SkillCohortFilterDrawer onChange={handleFilterChange} />
      <div className="skill-cohort-page-container">
        <div className="search-results-container">
          <Tabs data={TabData} current={currentTab} onChange={setCurrentTab}/>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...skillCohortSelector(state),
  ...skillCohortParticipantSelector(state),
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {
  ...skillCohortActions,
  ...skillCohortParticipantActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(SkillCohort);
