import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Tabs, CustomButton } from "components";
import { SETTINGS } from "enum";
import IconLoadingMore from "images/icon-loading-more.gif";

import { actions as jobBoardActions } from "redux/actions/jobBoard-actions";

import { jobBoardSelector } from "redux/selectors/jobBoardSelector";
import { homeSelector } from "redux/selectors/homeSelector";

import { JobPostCard, RecruiterView } from "./JobBoard";
import TalentMarketplaceProfile from './TalentMarketplaceProfile'
import TalentMarketplaceFilterPanel from "./TalentMarketplaceFilterPanel";
import "./styles.scss";

const TalentMarketplacePage = ({
  userProfile,
  getAllJobPosts,
  allJobPosts,
  currentPage,
  loading,
  countOfResults,
  getMoreJobPosts,
}) => {
  const [currentTab, setCurrentTab] = useState("0");
  const [filter, setFilter] = useState({});

  const isPremium = userProfile.memberShip === "premium";

  useEffect(() => {
    getAllJobPosts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

  useEffect(() => {
    if (currentTab === "2") {
      getAllJobPosts(filter);
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab]);

  const handleFilterOnChange = (values) => {
    setFilter(values);
    getAllJobPosts(values);
  };

  const showMore = () => {
    getMoreJobPosts({
      ...filter,
      page: currentPage + 1,
    });
  };

  const displayMainJobPosts = () => {
    return (
      <>
        <div className="job-posts-container">
          {allJobPosts?.map((post, index) => {
            return <JobPostCard post={post} key={index} />;
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

  const TabData = [
    {
      title: "My Talent Marketplace Profile",
      content: () => <TalentMarketplaceProfile />,
    },
    {
      title: "Talent Marketplace",
      content: () => <div>talent marketplace</div>,
    },
    {
      title: "Main job board",
      // content: () => <div>{mainJobPosts(allJobPosts)}</div>,
      content: displayMainJobPosts,
    },
  ];

  if (isPremium) {
    const myJobPosts = {
      title: "My posted jobs",
      // content: displayMyPostedJobs,
      content: () => <RecruiterView filter={filter} />,
    };

    TabData.push(myJobPosts);
  }

  return (
    <div className="talent-marketplace-page">
      <TalentMarketplaceFilterPanel onChange={handleFilterOnChange} />
      <div className="talent-marketplace-tabs-wrapper">
        <Tabs data={TabData} current={currentTab} onChange={setCurrentTab} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...jobBoardSelector(state),
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {
  ...jobBoardActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TalentMarketplacePage);
