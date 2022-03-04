import { Collapse, Row, Col } from "antd";
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
import { homeSelector } from "redux/selectors/homeSelector";
import { actions as myLearningActions } from "redux/actions/myLearning-actions";
import { actions as conferenceActions } from "redux/actions/conference-actions";

import FilterDrawer from "pages/Library/FilterDrawer";
import LearningFilterDrawer from "./LearningFilterDrawer";
import EventVideo from "./EventVideo";
import "./style.scss";

const { Panel } = Collapse;

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
  getMoreSaved,
  userProfile,
}) => {
  const [currentTab, setCurrentTab] = useState("0");
  const [listOfYears, setListOfYears] = useState([2020]);
  const [filters, setFilters] = useState({});
  const [, setFilter] = useState({});

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
  }, [currentTab]);

  const planUpdate = () => {
    Emitter.emit(EVENT_TYPES.OPEN_PAYMENT_MODAL);
  };

  const showMoreItemsWithHRCredits = () => {
    getMoreItemsWithHRCredits({
      ...filters,
      page: allItemsWithHRCreditsCurrentPage + 1,
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
      page: allSavedCurrentPage + 1,
    });
  };

  const onFilterChange = (values) => {
    setFilter(values);
  };

  const showFilterPanel = () => {
    Emitter.emit(EVENT_TYPES.OPEN_FILTER_PANEL);
  };

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
        {allCompletedCurrentPage * SETTINGS.MAX_SEARCH_ROW_NUM <
          allCompleted.count && (
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
      <div className="event-videos">
        <Collapse>
          {(allEventVideos || []).map((event) => {
            const isEventPremium = event.ticket === "premium";
            const isUserPremium = userProfile.memberShip === "premium";

            let collapsible = "disabled";

            if (isEventPremium && isUserPremium) {
              collapsible = "header";
            } else if (!isEventPremium) {
              collapsible = "header";
            }

            const header =
              collapsible === "disabled" ? (
                <div>
                  {`${event.title} - `}
                  <b>FOR PREMIUM USERS ONLY</b>
                </div>
              ) : (
                event.title
              );

            return (
              <Panel header={header} key={event.id} collapsible={collapsible}>
                {event.Libraries.map((library) => {
                  return <EventVideo library={library} key={library.id} />;
                })}
              </Panel>
            );
          })}
        </Collapse>
      </div>
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
      <div className="learnings-filter-panel">
        <LearningFilterDrawer onChange={handleFilterChange} />
      </div>
      <FilterDrawer onChange={onFilterChange} />
      <div className="search-results-container">
        <Row>
          <Col span={24}>
            <div className="search-results-container-mobile-header">
              <h3 className="filters-btn" onClick={showFilterPanel}>
                Filters
              </h3>
            </div>
          </Col>
        </Row>
        <div className="my-learnings-page-container">
          <div className="search-results-container">
            <Tabs
              data={TabData}
              current={currentTab}
              onChange={setCurrentTab}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...myLearningSelector(state),
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {
  ...myLearningActions,
  ...conferenceActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyLearingPage);
