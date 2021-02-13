import React from "react";

import {
  CustomButton,
} from "components";
import JourneyCard from "pages/Journey/JourneyCard";

import "./style.scss";

const JourneyCardList = ({
  allJourneys,
  showForm,
}) => {
  return (<div class="learning-journey-card-list">
    <div className="learning-journey-card-list__header">
        <h3>Learning journey list</h3>
        <CustomButton onClick={showForm} text="Create journey" size="sm" />
    </div>
    <div className="learning-journey-card-list__results">
      {
        allJourneys.map((item, key) => {
          return (<JourneyCard
            key={`card-${key}`}
            name={item.name}
            started={item.createdAt}
            categories={item.topics}
          />);
        })
      }
    </div>
  </div>);
};

export default JourneyCardList