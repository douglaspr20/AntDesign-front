import { CustomButton } from "components";
import React from "react";
import { connect } from "react-redux";
import moment from "moment-timezone";
import { Space, Tooltip } from "antd";

import { actions as SkillCohortResourceActions } from "redux/actions/skillCohortResource-actions";
import "./style.scss";

const SimulationResourceCard = () => {
  const handleJoinTheConversation = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const displayResourcesBtn = (
    <div className="skill-cohort-resource-card-content">
      <div className="skill-cohort-resource-card-join-btn">
        <CustomButton
          text="Join the conversation"
          onClick={handleJoinTheConversation}
        />
      </div>
    </div>
  );

  return (
    <div>
      <div className="card">
        <Space direction="vertical" size="middle">
          <h3>Example resource</h3>
          <Tooltip title="Example description">
            <div className="description truncate">Example description</div>
          </Tooltip>
          <div className="description">{moment().format("LL")}</div>
        </Space>
        {displayResourcesBtn}
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  ...SkillCohortResourceActions,
};

export default connect(null, mapDispatchToProps)(SimulationResourceCard);
