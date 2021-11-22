import React, { useState, useEffect } from "react";
import { Tabs } from "components";
import { connect } from "react-redux";
import {
  LibraryCard,
  ConferenceCard,
  EpisodeCard,
  PodcastSeriesCard,
} from "components";
import Emitter from "services/emitter";
import { EVENT_TYPES } from "enum";

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
}) => {
  const [currentTab, setCurrentTab] = useState("0");
  const [listOfYears, setListOfYears] = useState([2020]);

  useEffect(() => {
    getAllSaved([]);
    getAllCompleted([]);
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

  const TabData = [
    {
      title: "Items w/ HR Credits",
      content: () => <div>Coming soon.</div>,
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
