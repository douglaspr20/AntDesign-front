import { Row, Col } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment-timezone";
import { useParams } from "react-router-dom";
import { initial, isEmpty } from "lodash";
import { CustomButton } from "components";
import { SETTINGS  } from "enum";
import IconLoadingMore from "images/icon-loading-more.gif";

import { skillCohortResourceSelector } from "redux/selectors/skillCohortResourceSelector";
import { skillCohortParticipantSelector } from "redux/selectors/skillCohortParticipantSelector";
import { homeSelector } from "redux/selectors/homeSelector";

import { actions as skillCohortResourceActions } from "redux/actions/skillCohortResource-actions";
import { actions as skillCohortParticipantActions } from "redux/actions/skillCohortParticipant-actions";

import ResourceCard from "./ResourceCard";
import "./style.scss";

const SkillCohortResources = ({
  getAllSkillCohortResources,
  allSkillCohortResources,
  getSkillCohortParticipant,
  skillCohortParticipant,
  userProfile,
  currentPage,
  getMoreSkillCohortResources,
  loading,
  countOfResults,
}) => {
  const dateToday = moment().tz("America/Los_Angeles");
  const { id } = useParams();

  useEffect(() => {
    getAllSkillCohortResources(id, {
      date: dateToday.format("YYYY-MM-DD HH:mm:ssZ"),
    });
    if (userProfile.id) {
      getSkillCohortParticipant(id, userProfile.id);
    }
    // eslint-disable-next-line
  }, [userProfile]);

  const showMore = () => {
    getMoreSkillCohortResources(id, {
      date: dateToday.format("YYYY-MM-DD HH:mm:ssZ"),
      page: currentPage + 1,
    });
  };

  const todayResource = allSkillCohortResources.at(-1) || {};
  const previousResources = initial(allSkillCohortResources) || [];

  const displayTodaysResource = !isEmpty(todayResource) && (
    <ResourceCard
      skillCohortResource={todayResource}
      isPreviousResource={false}
      skillCohortParticipant={skillCohortParticipant}
    />
  );

  const displayPreviousResources = previousResources
    .reverse()
    .map((resource) => {
      const diff = dateToday.diff(
        moment(resource.releaseDate).tz("America/Los_Angeles"),
        "day"
      );
      const isYesterday = diff === 1;

      return (
        <ResourceCard
          skillCohortResource={resource}
          key={resource.id}
          isPreviousResource={true}
          skillCohortParticipant={skillCohortParticipant}
          isYesterday={isYesterday}
        />
      );
    });

  return (
    <div className="skill-cohort-resources-page">
      <div className="skill-cohort-resources-page-container">
        <div className="container-header d-flex justify-between items-start">
          <div className="todays-resource">
            <div>
              <h3 className="todays-resource-text">Today's Resource</h3>
              {displayTodaysResource}
            </div>
            {/* <div className="meeting-link">
              <h3>Meeting Date this week: October 31, 2021 12 AM</h3>
              <a href="#">Test link</a>
            </div> */}
          </div>
        </div>
        <Row className="previous">
          <Col span={24}>
            <div className="container-header-previous d-flex justify-between items-center">
              {!isEmpty(previousResources) && <h3>Previous Resources</h3>}
            </div>
          </Col>
        </Row>
        <div className="skill-cohort-resources-list previous-resource">
          {displayPreviousResources}
        </div>
        {currentPage * SETTINGS.MAX_SEARCH_ROW_NUM < countOfResults && (
          <div className="search-results-container-footer d-flex justify-center items-center">
            {loading && (
              <div className="resources-page-loading-more">
                <img src={IconLoadingMore} alt="loading-more-img" />
              </div>
            )}
            {!loading && (
              <CustomButton
                text="Show more"
                type="primary outlined"
                size="lg"
                onClick={showMore}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...skillCohortResourceSelector(state),
  ...skillCohortParticipantSelector(state),
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {
  ...skillCohortResourceActions,
  ...skillCohortParticipantActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SkillCohortResources);
