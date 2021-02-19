import React from 'react';
import { Switch, Progress } from 'antd';
import { connect } from "react-redux";
import moment from 'moment';

import {
  unsetJourney,
} from "redux/actions/journey-actions";
import { journeySelector } from "redux/selectors/journeySelector";
import { journeyItemSelector } from "redux/selectors/journeyItemSelector";

import {
  CustomButton,
} from "components";
import JourneyDetailsCard from './Card';
import { ReactComponent as IconArrowBackCircleOutline } from 'images/icon-arrow-back-circle-outline.svg';

import './style.scss';

const JourneyDetails = ({
  journey,
  allJourneyItems,
  unsetJourney,
}) => {
  const contentType = {
    'article': "Article",
    'event': "Event",
    'podcast': "Podcast",
    'video': "Video",
  };
  const getDescription = (item) => {
    if(item.contentType === 'event'){
      const description = JSON.parse(item.description);
      return description.blocks[0].text;
    }else{
      return item.description;
    }
  };
  return (<div className="journey-details-container">
    <div className="journey-details-container__header">
      <div className="journey-details-container__header--back">
        <IconArrowBackCircleOutline onClick={() => { unsetJourney(); }} />
        <h3>{ journey ? journey.name : '' }</h3>
      </div>
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
      <h4>Started: {moment(journey.createdAt).format("MMMM DD - YYYY")}</h4>
    </div>
    <div className="journey-details-container__list">
      { 
        allJourneyItems.map((item) => {
          return(<JourneyDetailsCard
            title={item.title}
            image={item.image}
            description={getDescription(item)}
            type={contentType[item.contentType]}
          />);
        })
      }
    </div>
  </div>);
}

const mapStateToProps = (state, props) => ({
  journey: journeySelector(state).journey,
  allJourneyItems: journeyItemSelector(state).allJourneyItems,
});

const mapDispatchToProps = {
  unsetJourney,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JourneyDetails);