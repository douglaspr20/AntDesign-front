import React from "react";

import JourneyHomeMessage from "./Message";
import JourneyCardList from "./CardList";

import "./style.scss";

const JourneyPage = () => {
  return (<div className="learning-journey-page">
    <JourneyHomeMessage />
    <JourneyCardList />
  </div>);
};

export default JourneyPage;