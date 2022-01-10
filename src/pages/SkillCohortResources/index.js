import { Row, Col, Card, Avatar, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment-timezone";
import { useParams } from "react-router-dom";
import { CustomButton, Tabs } from "components";
import { SETTINGS } from "enum";
import IconLoadingMore from "images/icon-loading-more.gif";
import { isEmpty } from "lodash";
import { UserOutlined } from "@ant-design/icons";
import OpengraphReactComponent from "opengraph-react";

import { skillCohortResourceSelector } from "redux/selectors/skillCohortResourceSelector";
import { skillCohortParticipantSelector } from "redux/selectors/skillCohortParticipantSelector";
import { homeSelector } from "redux/selectors/homeSelector";

import { actions as skillCohortResourceActions } from "redux/actions/skillCohortResource-actions";
import { actions as skillCohortActions } from "redux/actions/skillCohort-actions";
import { actions as skillCohortParticipantActions } from "redux/actions/skillCohortParticipant-actions";

import SkillCohortPanel from "./SkillCohortPanel";
import ResourceCard from "./ResourceCard";
import SkillCohortResourceForm from "./SkillCohortResourceForm";
import SkillCohortResourceReply from "./SkillCohortResourceReply";
import "./style.scss";

const SkillCohortResources = ({
  getAllSkillCohortResources,
  allSkillCohortResources,
  getSkillCohortParticipant,
  userProfile,
  currentPage,
  getMoreSkillCohortResources,
  loading,
  countOfResults,
  getSkillCohort,
  skillCohortResource,
  getAllSkillCohortParticipants,
  allSkillCohortParticipants,
  getSkillCohortResource,
  getEntireResources,
}) => {
  const dateToday = moment().tz("America/Los_Angeles");
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState("0");

  useEffect(() => {
    getSkillCohort(id);
    getAllSkillCohortParticipants(id);
    getAllSkillCohortResources(id, {
      date: dateToday.format("YYYY-MM-DD HH:mm:ssZ"),
    });
    getEntireResources(id, dateToday.format("YYYY-MM-DD HH:mm:ssZ"));

    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (userProfile.id) {
      getSkillCohortParticipant(id, userProfile.id);
    }

    // eslint-disable-next-line
  }, [userProfile, id]);

  useEffect(() => {
    if (!isEmpty(allSkillCohortResources)) {
      getSkillCohortResource(allSkillCohortResources[0].id);
    }

    // eslint-disable-next-line
  }, [allSkillCohortResources, id]);

  const showMore = () => {
    getMoreSkillCohortResources(id, {
      date: dateToday.format("YYYY-MM-DD HH:mm:ssZ"),
      page: currentPage + 1,
    });
  };

  const switchToConversationtab = () => {
    setCurrentTab("1");
  };

  const displayTodaysResource = !isEmpty(allSkillCohortResources[0]) && (
    <ResourceCard
      skillCohortResource={allSkillCohortResources[0]}
      switchTab={switchToConversationtab}
    />
  );

  const displayPreviousResources = allSkillCohortResources
    .slice(1, allSkillCohortResources.length)
    .map((resource) => {
      return (
        <ResourceCard
          key={resource.id}
          skillCohortResource={resource}
          switchTab={switchToConversationtab}
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
        <Col className="participant-col" key={index}>
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

  const displayConversation = (
    <div className="display-conversation-container">
      <div className="display-conversation">
        <OpengraphReactComponent
          key={skillCohortResource.id}
          site={skillCohortResource.resourceLink}
          appId={process.env.REACT_APP_OPENGRAPH_KEY}
          loader={<Spin></Spin>}
          size="large"
          acceptLang="auto"
        />
      </div>
      <div className="comment-container-1">
        <SkillCohortResourceForm
          key={skillCohortResource.id}
          isResponse
          resource={skillCohortResource}
        />
      </div>
      {skillCohortResource?.SkillCohortResourceResponses?.map((response) => {
        return (
          <SkillCohortResourceReply key={response.id} response={response} />
        );
      }) || []}
    </div>
  );

  const TabData = [
    {
      title: "Resources",
      content: () => {
        return <div className="wrapper-2">{displayResources}</div>;
      },
    },
    {
      title: "Conversations",
      content: () => displayConversation,
    },
    {
      title: "Participants",
      content: () => (
        <div className="display-participants">{displayParticipants}</div>
      ),
    },
    // {
    //   title: "Playgrounds",
    //   content: () => <div className="wrapper-2">Playground</div>,
    // },
  ];

  return (
    <div className="skill-cohort-resources-page">
      <div className="skill-cohort-resources-page-container">
        {currentTab === "1" && <SkillCohortPanel />}
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
