import React from "react";
import { Progress, } from "antd";
import { connect } from "react-redux";
import moment from "moment";

import {
  CustomButton,
  SpecialtyItem,
} from "components";
import { categorySelector } from "redux/selectors/categorySelector";

import "./style.scss";

const JourneyCard = ({
  name,
  started,
  categories,
  allCategories,
  onClick,
}) => {
  return (<div className="learning-journey-card">
    <div className="learning-journey-card__info">
      <h2>{name}</h2>
      <span>Started: { moment(started).format("MMMM D - yyyy") }</span>
      <div className="learning-journey-card__info--topics">
        {(categories || []).map((item, index) => {
          const category = allCategories.find((cat) => cat.value === item);
          return (
            <SpecialtyItem
              key={index}
              title={category ? category.title : item}
            />
          );
        })}
      </div>
    </div>
    <div className="learning-journey-card__actions">
      <CustomButton text="Go to journey" onClick={onClick} size="sm" />
      <span className="learning-journey-card__actions--progress"><span>0</span>% completed</span>
      <Progress percent={0} size="small" showInfo={false} strokeColor="#438cef" />
    </div>
  </div>);
};

const mapStateToProps = (state, props) => ({
  allCategories: categorySelector(state).categories,
});

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JourneyCard);