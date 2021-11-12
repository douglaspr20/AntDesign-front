import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { INTERNAL_LINKS } from "enum";
import { CustomButton } from "components";
import moment from "moment-timezone";

import "./style.scss";

const HARDCODED_COVER_PLACEHOLDER =
  "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png";

const SkillCohortCard = (props) => {
  const { id, title, description, image, startDate, endDate } =
    props.skillCohort;
  const { hasAccess } = props;

  const [hasCohortStarted, setHasCohortStarted] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const dateToday = moment()
      .tz("America/Los_Angeles")
      .format("YYYY-MM-DD HH:mm:ssZ");

    if (
      dateToday >
      moment(startDate).tz("America/Los_Angeles").format("YYYY-MM-DD HH:mm:ssZ")
    ) {
      setHasCohortStarted(true);
    } else {
      setHasCohortStarted(false);
    }
    // eslint-disable-next-line
  }, []);

  const randomId = `skill-cohort-description-${Math.floor(
    Math.random() * 1000
  )}`;

  const handleClickMore = () => {
    if (hasAccess && hasCohortStarted) {
      history.push(`${INTERNAL_LINKS.PROJECTX}/${id}/resources`);
    } else {
      history.push(`${INTERNAL_LINKS.PROJECTX}/${id}`);
    }
  };

  let displayBtn;
  if (hasCohortStarted && hasAccess) {
    displayBtn = "Enter Dashboard";
  } else {
    displayBtn = "More";
  }

  return (
    <div className="skill-cohort-card">
      <div className="skill-cohort-card-header">
        {image ? (
          <img src={image} alt="header" />
        ) : (
          <img src={HARDCODED_COVER_PLACEHOLDER} alt="header" />
        )}
      </div>
      <div className="skill-cohort-card-content">
        <h3 className="skill-cohort-card-title">{title}</h3>
        <div id={randomId} className="d-flex">
          <div
            className="skill-cohort-card-desc"
            dangerouslySetInnerHTML={{
              __html: (description || {}).html || "",
            }}
          />
        </div>
        <h5 className="skill-cohort-card-hr">
          Starting on {moment(startDate).format("LL")}
        </h5>
        <h5 className="skill-cohort-card-hr">
          Finishing on {moment(endDate).format("LL")}
        </h5>
        <div className="skill-cohort-card-join-btn">
          <CustomButton
            text={displayBtn}
            onClick={handleClickMore}
            size="md"
            block={true}
          />
        </div>
      </div>
    </div>
  );
};

export default SkillCohortCard;
