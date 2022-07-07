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

  let displayBtn;

  if (
    sprint.userParticipated &&
    moment.utc().isAfter(sprint.startDate) &&
    moment.utc().isBefore(sprint.endDate)
  ) {
    displayBtn = "Enter Dashboard";
  } else if (sprint.userParticipated && moment.utc().isAfter(sprint.endDate)) {
    displayBtn = "Completed";
  } else {
    displayBtn = "More";
  }

  const handleClick = () => {
    if (sprint.userParticipated && moment.utc().isAfter(sprint.startDate)) {
      history.push(
        `${INTERNAL_LINKS.SIMULATION_SPRINTS}/${sprint.id}/resources?key=1`
      );
    } else {
      history.push(`${INTERNAL_LINKS.SIMULATION_SPRINTS}/${sprint.id}`);
    }
  };

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
            text={displayBtn}
            onClick={handleClick}
            type={
              sprint.userParticipated &&
              moment().isAfter(moment(sprint.endDate))
                ? "secondary"
                : "primary"
            }
            size="md"
            block={true}
            disabled={
              moment.utc().isAfter(sprint.startDate) && !sprint.userParticipated
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SprintCard;
