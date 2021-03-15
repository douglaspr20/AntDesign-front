import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import moment from 'moment';

import { SpecialtyItem, CustomButton } from "components";
import { categorySelector } from "redux/selectors/categorySelector";

import { ReactComponent as IconDocument } from "images/icon-document.svg";
import { ReactComponent as IconVideo } from "images/icon-video.svg";

import "./style.scss";

const HARDCODED_COVER_PLACEHOLDER =
  "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png";

const HomeRecommendationsItem = ({
  element,
  allCategories,
  type,
}) => {
  const [image, setImage] = useState(HARDCODED_COVER_PLACEHOLDER);
  const contentType = {
    'article': { text: "Article", icon: <IconDocument /> },
    'video': { text: "Video", icon: <IconVideo /> },
  };

  useEffect(() => {
    if (type === "podcast") {
      setImage(element.imageUrl);
    } else if (type !== "conference") {
      setImage(element.image);
    }
  }, []);

  return (<div className="item-container">
    {
      type === "conference" ?
        <></>
        :
        <img src={image} alt={`image-${type}-${element.id}`} />
    }
    <h3>{element.title}</h3>
    { type === "library" &&
      <p>{element.description}</p>
    }
    { type !== "library" &&
      <span className="item-date">{moment(element.createdAt).format("DD MMMM")}</span>
    }
    { type === "library" && element.contentType &&
      <div class="item-icon-container">{contentType[element.contentType].icon} {contentType[element.contentType].text}</div>
    }
    { type !== "library" &&
      <div className="recomendation-topics">
        {(element.topics || element.categories || []).map((item, index) => {
          const category = allCategories.find((cat) => cat.value === item);
          return (
            <SpecialtyItem
              key={index}
              title={category ? category.title : item}
              active={false}
            />
          );
        })}
      </div>
    }
    { type === "event" &&
      <CustomButton text="Attend" size="sm" />
    }
  </div>);
}

const mapStateToProps = (state) => ({
  allCategories: categorySelector(state).categories,
});

export default connect(mapStateToProps)(HomeRecommendationsItem);