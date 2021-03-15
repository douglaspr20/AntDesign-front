import React from 'react';

import HomeRecommendationsItem from './Item';

import "./style.scss";

const HomeRecommendationsColumn = ({
  columnTitle,
  type,
  items=[],
}) => {
  return (<div className="column-container">
    <div className="column-container__title-container">
      <h3>{ columnTitle }</h3>
    </div>
    <div className="column-container__content">
      {
        items.map((item, index) => <HomeRecommendationsItem key={`${type}-${index}`} element={item} type={type} /> )
      }
    </div>
  </div>);
};

export default HomeRecommendationsColumn;