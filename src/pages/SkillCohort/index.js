import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment-timezone";
import qs from "query-string";
import { Tabs } from "components";
import { useLocation } from "react-router-dom";
import { INTERNAL_LINKS } from "enum";

import { homeSelector } from "redux/selectors/homeSelector";
import { skillCohortSelector } from "redux/selectors/skillCohortSelector";
import { skillCohortParticipantSelector } from "redux/selectors/skillCohortParticipantSelector";

import { actions as skillCohortActions } from "redux/actions/skillCohort-actions";
import { actions as skillCohortParticipantActions } from "redux/actions/skillCohortParticipant-actions";

import SkillCohortFilterDrawer from "./SkillCohortFilterDrawer";
import SkillCohortCard from "./SkillCohortCard";
import ActivityStatus from "./ActivityStatus";

import "./style.scss";

moment().tz("America/Los_Angeles").format();

const SkillCohort = ({
  allSkillCohorts,
  getAllSkillCohorts,
  userProfile,
  getAllParticipated,
  allParticipated,
  allOfMySkillCohorts,
  getAllOfMyCohort,
}) => {
  useEffect(() => {
    getAllSkillCohorts([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [currentTab, setCurrentTab] = useState("0");

  const location = useLocation();

  const parsed = qs.parse(location.search);

  useEffect(() => {
    if (userProfile.id) {
      getAllParticipated(userProfile.id);
      getAllOfMyCohort(userProfile.id);
    }
    // eslint-disable-next-line
  }, [userProfile]);

  useEffect(() => {
    setCurrentTab(parsed.key);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.history.replaceState(
      null,
      "Page",
      `${INTERNAL_LINKS.PROJECTX}?key=${currentTab}`
    );
  }, [currentTab]);

  const handleFilterChange = (filter) => {
    getAllSkillCohorts(filter.category);
  };

  const displaySkillCohorts = allSkillCohorts.map((skillCohort) => {
    const hasAccess = allParticipated.some((participant) => {
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
    if (
      moment(a.startDate).format("YYYY-MM-DD HH:mm:ss") >
      moment(b.startDate).format("YYYY-MM-DD HH:mm:ss")
    ) {
      return 1;
    }

    if (
      moment(a.startDate).format("YYYY-MM-DD HH:mm:ss") <
      moment(b.startDate).format("YYYY-MM-DD HH:mm:ss")
    ) {
      return -1;
    }

    return 0;
  });

  const displayMySkillCohorts = sortedAllOfMySkillCohorts.map((skillCohort) => {
    return <SkillCohortCard key={skillCohort.id} skillCohort={skillCohort} />;
  });

  const TabData = [
    {
      title: "General Information",
      content: () => {
        return <div className="skill-cohort-list">General Information</div>;
      },
    },
    {
      title: "All Cohorts",
      content: () => {
        return <div className="skill-cohort-list">{displaySkillCohorts}</div>;
      },
    },
    {
      title: "My Cohorts",
      content: () => {
        return <div className="skill-cohort-list">{displayMySkillCohorts}</div>;
      },
    },
    {
      title: "Activity Status",
      content: () => {
        return <ActivityStatus />;
      },
    },
  ];

  return (
    <div className="skill-cohort-page">
      <SkillCohortFilterDrawer onChange={handleFilterChange} />
      <div className="skill-cohort-page-container">
        <div className="search-results-container">
          <Tabs data={TabData} current={currentTab} onChange={setCurrentTab} />
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
