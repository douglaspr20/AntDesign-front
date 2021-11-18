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
  allEventVideosCurrentPage
}) => {
  const [currentTab, setCurrentTab] = useState("0");
  const [listOfYears, setListOfYears] = useState([2020]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    getAllSaved([]);
    getAllCompleted([]);
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

  const planUpdate = () => {
    Emitter.emit(EVENT_TYPES.OPEN_PAYMENT_MODAL);
  };

  const showMore = () => {
    getMoreItemsWithHRCredits({
      ...filters,
      page: allItemsWithHRCreditsCurrentPage + 1,
    });
  };

  const displaySavedItems = () => (
    <div className="saved-for-later">
      {Object.keys(allSaved).map((key, indx) => {
        if (key === "allLibraries") {
          return allSaved[key].map((item, index) => {
            return (
              <LibraryCard key={index} data={item} onClickAccess={planUpdate} />
            );
          });
        } else if (key === "allConferenceLibraries") {
          return allSaved[key].map((item, index) => {
            return (
              <ConferenceCard
                key={index}
                data={item}
                listOfYearsIndex={listOfYears.findIndex(
                  (year) => year === item.year
                )}
              />
            );
          });
        } else if (key === "allPodcasts") {
          return allSaved[key].map((item, index) => {
            return (
              <EpisodeCard
                key={index}
                links={getPodcastLinks(item)}
                episode={item}
              />
            );
          });
        } else {
          return allSaved[key].map((item, index) => {
            return <PodcastSeriesCard key={index} data={item} />;
          });
        }
      })}
    </div>
  );

  const displayCompletedItems = () => (
    <div className="completed-items">
      {Object.keys(allCompleted).map((key, indx) => {
        if (key === "allLibraries") {
          return allCompleted[key].map((item, index) => {
            return (
              <LibraryCard key={index} data={item} onClickAccess={planUpdate} />
            );
          });
        } else if (key === "allConferenceLibraries") {
          return allCompleted[key].map((item, index) => {
            return (
              <ConferenceCard
                key={index}
                data={item}
                listOfYearsIndex={listOfYears.findIndex(
                  (year) => year === item.year
                )}
              />
            );
          });
        } else if (key === "allPodcasts") {
          return allCompleted[key].map((item, index) => {
            return (
              <EpisodeCard
                key={index}
                links={getPodcastLinks(item)}
                episode={item}
              />
            );
          });
        } else {
          return allCompleted[key].map((item, index) => {
            return <PodcastSeriesCard key={index} data={item} />;
          });
        }
      })}
    </div>
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
              onClick={showMore}
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
        {/* {allEventVideosCurrentPage * SETTINGS.MAX_SEARCH_ROW_NUM < allEventVideos.count && (
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
              onClick={showMore}
            />
          )}
        </div>
      )} */}
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
