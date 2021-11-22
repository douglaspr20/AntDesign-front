import React, { useState, useEffect } from "react";
import { Tabs } from "components";
import { connect } from "react-redux";
import {
  LibraryCard,
  ConferenceCard,
  EpisodeCard,
  PodcastSeriesCard,
  CustomButton,
} from "components";
import Emitter from "services/emitter";
import { EVENT_TYPES, SETTINGS } from "enum";

import IconLoadingMore from "images/icon-loading-more.gif";

import getPodcastLinks from "utils/getPodcastLinks.js";

import { myLearningSelector } from "redux/selectors/myLearningSelector";
import { actions as myLearningActions } from "redux/actions/myLearning-actions";
import { actions as conferenceActions } from "redux/actions/conference-actions";

import LearningFilterDrawer from "./LearningFilterDrawer";
import "./style.scss";

const MyLearingPage = ({
  getAllSaved,
  allSaved,
  getAllCompleted,
  allCompleted,
  searchConferenceLibraries,
  getAllItemsWithHRCredits,
  getMoreItemsWithHRCredits,
  allItemsWithHRCredits,
  allItemsWithHRCreditsCurrentPage,
  loading,
  getAllEventVideos,
  allEventVideos,
  allEventVideosCurrentPage,
  getMoreEventVideos,
  allCompletedCurrentPage,
  getMoreCompleted,
  allSavedCurrentPage,
  getMoreSaved
}) => {
  const [currentTab, setCurrentTab] = useState("0");
  const [listOfYears, setListOfYears] = useState([2020]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    getAllSaved({});
    getAllCompleted({});
    getAllItemsWithHRCredits({});
    getAllEventVideos({});

    const getListOfYears = (startYear) => {
      const currentYear = new Date().getFullYear();
      const years = [];

      while (startYear <= currentYear) {
        years.push(startYear++);
      }

      return years;
    };

    const listOfYears = getListOfYears([2020]);
    searchConferenceLibraries({}, listOfYears);
    setListOfYears(listOfYears.reverse());

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (currentTab === "0") {
      getAllEventVideos({
        ...filters,
      });
    } else if (currentTab === "1") {
      getAllItemsWithHRCredits({
        ...filters,
      });
    } else if (currentTab === "2") {
      getAllSaved({
        ...filters,
      });
    } else {
      getAllCompleted({
        ...filters,
      });
    }

    // eslint-disable-next-line
  }, [currentTab])

  const planUpdate = () => {
    Emitter.emit(EVENT_TYPES.OPEN_PAYMENT_MODAL);
  };

  const showMoreItemsWithHRCredits = () => {
    getMoreItemsWithHRCredits({
      ...filters,
      page: allItemsWithHRCreditsCurrentPage + 1,
    });
  };

  const showMoreEventVideos = () => {
    getMoreEventVideos({
      ...filters,
      page: allEventVideosCurrentPage + 1,
    });
  };

  const showMoreCompleted = () => {
    getMoreCompleted({
      ...filters,
      page: allCompletedCurrentPage + 1,
    });
  };

  const showMoreSaved = () => {
    getMoreSaved({
      ...filters,
      page: allSavedCurrentPage + 1
    })
  }

  const displaySavedItems = () => (
    <>
      <div className="saved-for-later">
        {allSaved?.rows?.map((item, index) => {
          if (item.type === "libraries") {
            return (
              <LibraryCard key={index} data={item} onClickAccess={planUpdate} />
            );
          } else if (item.type === "conferences") {
            return (
              <ConferenceCard
                key={index}
                data={item}
                listOfYearsIndex={listOfYears.findIndex(
                  (year) => year === item.year
                )}
              />
            );
          } else if (item.type === "podcasts") {
            return (
              <EpisodeCard
                key={index}
                links={getPodcastLinks(item)}
                episode={item}
              />
            );
          } else {
            return <PodcastSeriesCard key={index} data={item} />;
          }
        }) || []}
      </div>
      <>
        {allSavedCurrentPage * SETTINGS.MAX_SEARCH_ROW_NUM < allSaved.count && (
          <div className="search-results-container-footer d-flex justify-center items-center">
            {loading && (
              <div className="my-learnings-page-loading-more">
                <img src={IconLoadingMore} alt="loading-more-img" />
              </div>
            )}
            {!loading && (
              <CustomButton
                text="Show More"
                type="primary outlined"
                size="lg"
                onClick={showMoreSaved}
              />
            )}
          </div>
        )}
      </>
    </>
  );

  const displayCompletedItems = () => (
    <>
      <div className="completed-items">
        {allCompleted?.rows?.map((item, index) => {
          if (item.type === "libraries") {
            return (
              <LibraryCard key={index} data={item} onClickAccess={planUpdate} />
            );
          } else if (item.type === "conferences") {
            return (
              <ConferenceCard
                key={index}
                data={item}
                listOfYearsIndex={listOfYears.findIndex(
                  (year) => year === item.year
                )}
              />
            );
          } else if (item.type === "podcasts") {
            return (
              <EpisodeCard
                key={index}
                links={getPodcastLinks(item)}
                episode={item}
              />
            );
          } else {
            return <PodcastSeriesCard key={index} data={item} />;
          }
        }) || []}
      </div>
      <>
        {allCompletedCurrentPage * SETTINGS.MAX_SEARCH_ROW_NUM < allCompleted.count && (
          <div className="search-results-container-footer d-flex justify-center items-center">
            {loading && (
              <div className="my-learnings-page-loading-more">
                <img src={IconLoadingMore} alt="loading-more-img" />
              </div>
            )}
            {!loading && (
              <CustomButton
                text="Show More"
                type="primary outlined"
                size="lg"
                onClick={showMoreCompleted}
              />
            )}
          </div>
        )}
      </>
    </>
  );

  const allItemWithHRCreditsCount = allItemsWithHRCredits?.rows?.length || 0;

  const displayItemsWithHRCredits = () => (
    <>
      <div className="items-with-hr-credits">
        {allItemsWithHRCredits.rows?.map((item, index) => {
          if (item.type === "conferences") {
            return (
              <ConferenceCard
                key={index}
                data={item}
                listOfYearsIndex={listOfYears.findIndex(
                  (year) => year === item.year
                )}
                isInHRCredits={true}
              />
            );
          } else if (item.type === "libraries") {
            return (
              <LibraryCard
                key={index}
                data={item}
                onClickAccess={planUpdate}
                isInHRCredits={true}
              />
            );
          } else {
            return (
              <PodcastSeriesCard key={index} data={item} isInHRCredits={true} />
            );
          }
        })}
      </div>
      {allItemWithHRCreditsCount < allItemsWithHRCredits.count && (
        <div className="search-results-container-footer d-flex justify-center items-center">
          {loading && (
            <div className="my-learnings-page-loading-more">
              <img src={IconLoadingMore} alt="loading-more-img" />
            </div>
          )}
          {!loading && (
            <CustomButton
              text="Show More"
              type="primary outlined"
              size="lg"
              onClick={showMoreItemsWithHRCredits}
            />
          )}
        </div>
      )}
    </>
  );

  const displayEventVideos = () => {
    return (
      <>
        <div className="items-with-hr-credits">
          {allEventVideos?.rows?.map((item, index) => {
            return (
              <LibraryCard key={index} data={item} onClickAccess={planUpdate} />
            );
          })}
        </div>
        {allEventVideosCurrentPage * SETTINGS.MAX_SEARCH_ROW_NUM <
          allEventVideos.count && (
          <div className="search-results-container-footer d-flex justify-center items-center">
            {loading && (
              <div className="my-learnings-page-loading-more">
                <img src={IconLoadingMore} alt="loading-more-img" />
              </div>
            )}
            {!loading && (
              <CustomButton
                text="Show More"
                type="primary outlined"
                size="lg"
                onClick={showMoreEventVideos}
              />
            )}
          </div>
        )}
      </>
    );
  };

  const TabData = [
    {
      title: "Event Videos",
      content: displayEventVideos,
    },
    {
      title: "Items w/ HR Credits",
      content: displayItemsWithHRCredits,
    },
    {
      title: "Saved Items",
      content: displaySavedItems,
    },
    {
      title: "Completed Items",
      content: displayCompletedItems,
    },
  ];

  const handleFilterChange = (filter) => {
    getAllSaved(filter);
    getAllCompleted(filter);
    getAllItemsWithHRCredits(filter);
    getAllEventVideos(filter);

    setFilters(filter);
  };

  return (
    <div className="my-learnings-page">
      <LearningFilterDrawer onChange={handleFilterChange} />
      <div className="my-learnings-page-container">
        <div className="search-results-container">
          <Tabs data={TabData} current={currentTab} onChange={setCurrentTab} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...myLearningSelector(state),
});

const mapDispatchToProps = {
  ...myLearningActions,
  ...conferenceActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyLearingPage);
