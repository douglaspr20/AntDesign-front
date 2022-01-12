import React, { useEffect } from "react";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { Collapse } from "antd";
import moment from "moment-timezone";
import { useHistory } from "react-router-dom";
import { INTERNAL_LINKS } from "enum";

import { actions as skillCohortActions } from "redux/actions/skillCohort-actions";

import { homeSelector } from "redux/selectors/homeSelector";
import { skillCohortSelector } from "redux/selectors/skillCohortSelector";

import "./style.scss";

const { Panel } = Collapse;

const ActivityStatus = ({
  getAllOfMyCohort,
  userProfile,
  allOfMySkillCohorts,
}) => {
  const history = useHistory();

  useEffect(() => {
    if (!isEmpty(userProfile)) {
      getAllOfMyCohort(userProfile.id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

  const handleClickLink = (cohort, resource) => {
    history.push(
      `${INTERNAL_LINKS.PROJECTX}/${cohort.id}/resources?key=1&id=${resource.id}`
    );

    window.location.reload();
  };

  const displayPanels = allOfMySkillCohorts.map((cohort, index) => {
    return (
      <Panel header={cohort.title} key={`${index}`}>
        <Collapse bordered={false}>
          {cohort.SkillCohortResources.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)).map((resource, resourceIndex) => {
            const header = (
              <div>
                {`${moment(resource.releaseDate).format("LL")}: `}
                <span
                  onClick={() => handleClickLink(cohort, resource)}
                  style={{ color: "#0000EE" }}
                >
                  {resource.title}
                </span>
              </div>
            );

            const countPersonalReflection =
              cohort.SkillCohortResourceResponses.filter(
                (response) =>
                  response.SkillCohortResourceId === resource.id &&
                  response.SkillCohortParticipantId === cohort.ParticipantId
              );

            const displayPersonalReflection =
              countPersonalReflection.length >= 2 ? "COMPLETED" : "PENDING";

            const countAssessments =
              cohort.SkillCohortResponseAssessments.filter(
                (response) =>
                  response.SkillCohortResourceId === resource.id &&
                  response.SkillCohortParticipantId === cohort.ParticipantId
              );

            const displayComments =
              countAssessments.length >= 2 ? "COMPLETED" : "PENDING";

            return (
              <Panel header={header} key={resourceIndex}>
                <div className="resource-panel">
                  <div>Personal REFLECTION: {displayPersonalReflection}</div>
                  <div>
                    Comment's on one more participant's reflection:{" "}
                    {displayComments}
                  </div>
                </div>
              </Panel>
            );
          })}
        </Collapse>
      </Panel>
    );
  });

  return (
    <div className="activity-status-wrapper">
      <Collapse>{displayPanels}</Collapse>,
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...skillCohortSelector(state),
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {
  ...skillCohortActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityStatus);

// export default ActivityStatus
