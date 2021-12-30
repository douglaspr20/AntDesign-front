import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Image, Space } from "antd";
import { CustomButton, SpecialtyItem } from "components";
import { COUNTRIES, PROFILE_SETTINGS, INTERNAL_LINKS, JOB_BOARD } from "enum";
import IconBack from "images/icon-back.svg";

import { actions as jobBoardActions } from "redux/actions/jobBoard-actions";
import { jobBoardSelector } from "redux/selectors/jobBoardSelector";

import "./styles.scss";

const JobPostDetailsPage = ({ getJobPost, jobPost }) => {
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    getJobPost(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const country = COUNTRIES.find(
    (country) => country.value === jobPost.country
  );

  const displayLocation = (jobPost?.location || [])
    .map((location) => {
      const data = JOB_BOARD.LOCATIONS.find((loc) => loc.value === location);

      return data.text;
    })
    .join("/");

  const displayPreferredSkills = (jobPost?.preferredSkills || []).map(
    (skill, index) => {
      const data = PROFILE_SETTINGS.TOPICS.find(
        (topic) => topic.value === skill
      );

      return <SpecialtyItem key={index} title={data.text} />;
    }
  );

  const handleBtnClick = () => {
    window.open(jobPost?.linkToApply, "_blank");
  };

  return (
    <div className="job-board-details-page">
      <div className="job-board-details-wrapper">
        {/* <div className="back-to-job-board">
          <div
            className="job-board-detail-page-header-content-back-btn"
            onClick={() => history.push(INTERNAL_LINKS.JOB_BOARD)}
          >
            <div className="job-board-detail-page-header-content-back">
              <div className="job-board-detail-page-header-content-back-img">
                <img src={IconBack} alt="icon-back" />
              </div>
              <h4>Back to Job Board</h4>
            </div>
          </div>
        </div> */}
        <div className="job-board-details-content">
          <div
            className="job-board-detail-page-header-content-back-btn"
            onClick={() => history.push(INTERNAL_LINKS.JOB_BOARD)}
          >
            <div className="job-board-detail-page-header-content-back">
              <div className="job-board-detail-page-header-content-back-img">
                <img src={IconBack} alt="icon-back" />
              </div>
              <h4>Back to Job Board</h4>
            </div>
          </div>
          <div className="section1">
            <div>
              <Image src={jobPost.companyLogo} width={225} height={100}/>
            </div>
            <div>
              <CustomButton text="Apply" onClick={handleBtnClick} />
            </div>
          </div>
          <div className="section2">
            <h3>Company Description</h3>
            <div>{jobPost.companyDescription}</div>
          </div>
          <div className="section3">
            <Space direction="vertical" size="middle">
              <h3>{jobPost.title}</h3>
              <section
                dangerouslySetInnerHTML={{
                  __html: jobPost?.jobDescription?.html,
                }}
              />
              <div>{`${jobPost.city}, ${country?.text}`}</div>
              <div>{displayLocation}</div>
              <div>{jobPost.salary}</div>
              <div>{jobPost.level}</div>
              <div>
                <Space wrap>{displayPreferredSkills}</Space>
              </div>
            </Space>
          </div>
          <div className="section4">
            <CustomButton text="Apply" onClick={handleBtnClick} />
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  ...jobBoardSelector(state),
});

const mapDispatchToProps = {
  ...jobBoardActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(JobPostDetailsPage);
