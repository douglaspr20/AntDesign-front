import React from "react";
import { useHistory } from "react-router-dom";
import moment from "moment-timezone";
import { CustomButton } from "components";
import { INTERNAL_LINKS } from "enum";
import "./style.scss";

const HARDCODED_COVER_PLACEHOLDER =
  "https://lab-user-images.s3.us-east-2.amazonaws.com/skill-cohort/1638463551319.jpeg";

const SprintCard = ({ sprint }) => {
  const history = useHistory();

  console.log(sprint);

  return (
    <div className="sprint-card">
      <div className="sprint-card-header">
        <img
          src={sprint.image ? sprint.image : HARDCODED_COVER_PLACEHOLDER}
          alt="header"
        />
      </div>
      <div className="sprint-card-content">
        <h3 className="sprint-card-title">{sprint.title}</h3>
        <div id={10} className="d-flex">
          <div
            className="sprint-card-desc"
            dangerouslySetInnerHTML={{
              __html: (sprint.description || {}).html || "",
            }}
          />
        </div>
        <h5 className="sprint-card-hr">
          Starting on {moment(sprint.startDate).format("LL")}
        </h5>
        <h5 className="sprint-card-hr">
          Finishing on {moment(sprint.endDate).format("LL")}
        </h5>
        <div className="sprint-card-join-btn">
          <CustomButton
            text="More"
            onClick={() =>
              history.push(`${INTERNAL_LINKS.SIMULATION_SPRINTS}/${sprint.id}`)
            }
            type="primary"
            size="md"
            block={true}
          />
        </div>
      </div>
    </div>
  );
};

export default SprintCard;
