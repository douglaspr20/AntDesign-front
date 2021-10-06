import React from "react";
import { useHistory } from "react-router-dom";
import { INTERNAL_LINKS } from "enum";
import { CustomButton } from "components";
import moment from 'moment-timezone'

import "./style.scss";

moment().tz("America/Los_Angeles").format();

const HARDCODED_COVER_PLACEHOLDER =
  "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png";

const SkillCohortCard = (props) => {
    const { id, title, description, image, startDate, endDate } = props.skillCohort
    const history = useHistory()
    const randomId = `skill-cohort-description-${Math.floor(
        Math.random() * 1000
      )}`;

    const handleClickMore = () => {
        history.push(`${INTERNAL_LINKS.SKILL_COHORTS}/${id}`)
    }

    return (
        <div className="skill-cohort-card">
            <div className="skill-cohort-card-header">
            { image ? 
                <img src={image} alt="header"/> :
                <img src={HARDCODED_COVER_PLACEHOLDER} alt="header"/>
            }
            </div>
            <div className="skill-cohort-card-content">
                <h3 className="skill-cohort-card-title">{title}</h3>
                <div id={randomId} className="d-flex">
                    <p className="skill-cohort-card-desc" style={{WebkitLineClamp: 12, maxHeight: 50 * 12 }}>
                        {description}
                    </p>
                </div>
                    <h5 className="skill-cohort-card-hr">
                        { moment(startDate).format('LL') } to { moment(endDate).format('LL') }
                    </h5>
                <div className="skill-cohort-card-join-btn" >
                    <CustomButton text="More" onClick={handleClickMore}/>
                </div>
            </div>
        </div>
  );
            
}

export default SkillCohortCard