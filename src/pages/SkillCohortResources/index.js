import { Row, Col, Card, Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment-timezone";
import { useParams } from "react-router-dom";
import { CustomButton, Tabs } from "components";
import { SETTINGS } from "enum";
import IconLoadingMore from "images/icon-loading-more.gif";
import { isEmpty } from "lodash";
import { UserOutlined } from "@ant-design/icons";

import { skillCohortResourceSelector } from "redux/selectors/skillCohortResourceSelector";
import { skillCohortParticipantSelector } from "redux/selectors/skillCohortParticipantSelector";
import { homeSelector } from "redux/selectors/homeSelector";

import { actions as skillCohortResourceActions } from "redux/actions/skillCohortResource-actions";
import { actions as skillCohortActions } from "redux/actions/skillCohort-actions";
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
  getSkillCohort,
  getSkillCohortResource,
  skillCohortResource,
  getAllSkillCohortParticipants,
  allSkillCohortParticipants,
}) => {
  const dateToday = moment().tz("America/Los_Angeles");
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState("0");

  useEffect(() => {
    getAllSkillCohortResources(id, {
      date: dateToday.format("YYYY-MM-DD HH:mm:ssZ"),
    });
    if (userProfile.id) {
      getSkillCohortParticipant(id, userProfile.id);
    }
    getSkillCohort(id);
    getSkillCohortResource(id);
    getAllSkillCohortParticipants(id);
    // eslint-disable-next-line
  }, [userProfile]);

  const showMore = () => {
    getMoreSkillCohortResources(id, {
      date: dateToday.format("YYYY-MM-DD HH:mm:ssZ"),
      page: currentPage + 1,
    });
  };

  const displayTodaysResource = !isEmpty(skillCohortResource) && (
    <ResourceCard
      skillCohortResource={skillCohortResource}
      isPreviousResource={false}
      skillCohortParticipant={skillCohortParticipant}
    />
  );

  const displayPreviousResources = allSkillCohortResources.map((resource) => {
    const diff = dateToday.diff(moment(resource.releaseDate), "day");
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

  const displayResources = (
    <div className="wrapper">
      <div className="container-header d-flex justify-between items-start">
        <div className="todays-resource">
          <div>
            <h3 className="todays-resource-text">Today's Resource</h3>
            {displayTodaysResource}
          </div>
        </div>
      </div>
      <Row className="previous">
        <Col span={24}>
          <div className="container-header-previous d-flex justify-between items-center">
            {!isEmpty(allSkillCohortResources) && <h3>Previous Resources</h3>}
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
              text="Show More"
              type="primary outlined"
              size="lg"
              onClick={showMore}
            />
          )}
        </div>
      )}
    </div>
  );

  const displayParticipants = allSkillCohortParticipants.map(
    (participant, index) => {
      const user = participant.User;
      const name = `${user.firstName} ${user.lastName}`;

      return (
        <Col className="participant-col">
          <a
            href={user.personalLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card
              hoverable
              bordered
              type="inner"
              extra={<UserOutlined />}
              bodyStyle={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {user.img ? (
                <Avatar size={180} src={user.img} alt={name} />
              ) : (
                <Avatar size={180} icon={<UserOutlined />} />
              )}

              <div style={{ textAlign: "center" }}>
                <p className="participant-name">{name}</p>
                <p>{user.titleProfessions}</p>
              </div>
            </Card>
          </a>
        </Col>
      );
    }
  );

  const TabData = [
    {
      title: "Daily Resources",
      content: () => displayResources,
    },
    // {
    //   title: "Meetings",
    //   content: () => "Meeting Links",
    // },
    {
      title: "Participants",
      content: () => (
        <div className="display-participants">{displayParticipants}</div>
      ),
    },
    // {
    //   title: "Cohort Analytics",
    //   content: () => "Cohort Analytics",
    // },
  ];

  return (
    <div className="skill-cohort-resources-page">
      <div className="skill-cohort-resources-page-container">
        <div className="skill-cohort-resources-page-container-header">
          TEXT = TBD
        </div>
        <div className="wrapper">
          <Tabs
            data={TabData}
            current={currentTab}
            onChange={setCurrentTab}
            centered
          />
        </div>
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
  ...skillCohortActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SkillCohortResources);
