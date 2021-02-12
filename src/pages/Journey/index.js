import React from "react";

import JourneyHomeMessage from "./Message";
import JourneyCardList from "./CardList";
import JourneyForm from "./Form";

import "./style.scss";

const JourneyPage = () => {
  return (<div className="learning-journey-page">
    <JourneyForm />
    <JourneyHomeMessage />
    <JourneyCardList />
  </div>);
};

export default JourneyPage;