import React from "react";
import { Progress } from "antd";

import {
  CustomButton,
} from "components";

import "./style.scss";

const JourneyCard = () => {
  return (<div className="learning-journey-card">
    <div className="learning-journey-card__info">
      <h2>HR Management & Coaching</h2>
      <span>Started: January 01 - 2021</span>
    </div>
    <div className="learning-journey-card__actions">
      <CustomButton text="Go to journey" size="sm" />
      <span className="learning-journey-card__actions--progress"><span>37</span>% completed</span>
      <Progress percent={37} size="small" showInfo={false} strokeColor="#438cef" />
    </div>
  </div>);
};

export default JourneyCard;