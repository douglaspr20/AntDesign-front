import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { SETTINGS } from "enum";
import { CustomButton } from "components";
import IconLoadingMore from "images/icon-loading-more.gif";

import { actions as jobBoardActions } from "redux/actions/jobBoard-actions";

import { jobBoardSelector } from "redux/selectors/jobBoardSelector";
import { homeSelector } from "redux/selectors/homeSelector";

import JobBoardFilterPanel from "./JobBoardFilterPanel";
import JobPost from "./JobPostCard";
import RecruiterView from "./RecruiterView";
import "./styles.scss";

const JobBoardPage = ({
  userProfile,
  getAllJobPosts,
  allJobPosts,
  currentPage,
  countOfResults,
  loading,
  getMoreJobPosts,
  getMyJobPosts,
}) => {
  const [filter, setFilter] = useState({});

  const isPremium = userProfile.memberShip === "premium";

  useEffect(() => {
    getAllJobPosts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

  const handleFilterOnChange = (values) => {
    setFilter(values);
    getAllJobPosts(values);
    getMyJobPosts(values);
  };

  const showMore = () => {
    getMoreJobPosts({
      page: currentPage + 1,
    });
  };

  const displayMainJobPosts = (jobPosts) => {
    return (
      <>
        <div className="job-posts-container">
          {jobPosts?.map((post, index) => {
            return <JobPost post={post} key={index} />;
          })}
        </div>
        {currentPage * SETTINGS.MAX_SEARCH_ROW_NUM < countOfResults && (
          <div className="search-results-container-footer d-flex justify-center items-center">
            {loading && (
              <div className="job-board-page-loading-more">
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
      </>
    );
  };

  return (
    <div className="d-flex job-board-page">
      <JobBoardFilterPanel onChange={handleFilterOnChange} />
      <div className="job-posts-wrapper">
        {!isEmpty(userProfile.memberShip) && isPremium && (
          <RecruiterView mainJobPosts={displayMainJobPosts} filter={filter}/>
        )}
        {!isEmpty(userProfile.memberShip) && !isPremium && (
          <div>
            {displayMainJobPosts(allJobPosts)}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userProfile: homeSelector(state).userProfile,
  ...jobBoardSelector(state),
});

const mapDispatchToProps = {
  ...jobBoardActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(JobBoardPage);
