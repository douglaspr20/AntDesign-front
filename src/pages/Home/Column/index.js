import React, { useEffect, useState } from 'react';
import { CustomButton } from "components";

import HomeRecommendationsItem from './Item';

import "./style.scss";

const HomeRecommendationsColumn = ({
  columnTitle,
  type,
  items = [],
}) => {
  const [buttonText, setButtonText] = useState("View more");
  useEffect(() => {
    switch (type) {
      case "podcast":
        setButtonText("Listen more podcast");
        break;
      case "conference":
        setButtonText("More videos");
        break;
      case "event":
        setButtonText("More events");
        break;
      default:
          // do nothing
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (<div className="column-container">
    <div className="column-container__title-container">
      <h3>{columnTitle}</h3>
    </div>
    <div className="column-container__content">
      {
        items.map((item, index) => <HomeRecommendationsItem key={`${type}-${index}`} element={item} type={type} />)
      }
    </div>
    <div className="column-container__button-container">
      <CustomButton type="primary outlined" size="md" text={buttonText} />
    </div>
  </div>);
};

export default HomeRecommendationsColumn;