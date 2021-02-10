import React from "react";

import {
  CustomButton,
  CustomDrawer,
} from "components";
import JourneyCard from "pages/Journey/JourneyCard";

import "./style.scss";

const JourneyCardList = () => {
  return (<div class="learning-journey-card-list">
    <div className="learning-journey-card-list__header">
        <h3>Learning journey list</h3>
        <CustomButton text="Create journey" size="sm" />
    </div>
    <div className="learning-journey-card-list__results">
      <JourneyCard />
    </div>
  </div>);
};

export default JourneyCardList;