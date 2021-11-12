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

import LearningFilterDrawer from "./LearningFilterDrawer";
import "./style.scss";

const MyLearingPage = ({ getAllSaved, allSaved, getAllCompleted, allCompleted }) => {
  const [currentTab, setCurrentTab] = useState("0");

  useEffect(() => {
    getAllSaved([]);
    getAllCompleted([])
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
            return <ConferenceCard key={index} data={item} />;
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
            return <ConferenceCard key={index} data={item} />;
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
      title: "Saved Items",
      content: displaySavedItems,
    },
    {
      title: "Finished Items",
      content: displayCompletedItems
    },
  ];

  const handleFilterChange = (filter) => {
    getAllSaved(filter);
    getAllCompleted(filter)
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
};

export default connect(mapStateToProps, mapDispatchToProps)(MyLearingPage);
