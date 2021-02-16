import React from 'react';
import { Switch, Progress } from 'antd';
import {
  CustomButton,
} from "components";
import JourneyDetailsCard from './Card';

import './style.scss';

const JourneyDetails = () => {
  return (<div className="journey-details-container">
    <div className="journey-details-container__header">
      <h3>HR Management & Coaching</h3>
      <div className="journey-details-container__header--progress">
        <span><span>0</span>% completed</span>
        <Progress percent={0} size="small" showInfo={false} strokeColor="#438cef" />
      </div>
    </div>
    <div className="journey-details-container__actions">
      <CustomButton text="Edit journey" size="sm" type="primary outlined" />
      <div className="journey-details-container__actions--switch">
        View removed items <Switch unCheckedChildren="No" checkedChildren="Yes" />
      </div>
    </div>
    <div className="journey-details-container__date">
      <h4>Started: January 01 - 2021</h4>
    </div>
    <div className="journey-details-container__list">
      <JourneyDetailsCard />
      <JourneyDetailsCard />
      <JourneyDetailsCard />
      <JourneyDetailsCard />
      <JourneyDetailsCard />
    </div>
  </div>);
}

export default JourneyDetails;