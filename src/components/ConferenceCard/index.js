import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ReactPlayer from "react-player";
import { SpecialtyItem } from "components";
import { categorySelector } from "redux/selectors/categorySelector";

import IconVideo from "images/icon-video.svg";

import "./style.scss";

const ConferenceCard = ({ data, allCategories, keyword, frequency }) => {
  const { title, year, categories } = data || {};

  const onCardClick = () => {
    if (data.link) {
      window.open(data.link);
    }
  };

  return (
    <div className="conference-card" onClick={onCardClick}>
      <div className="conference-card-header">
        <ReactPlayer
          className="conference-card-player"
          controls={false}
          url={data.link}
        />
      </div>
      <div className="conference-card-content">
        <h3 className="conference-card-title">{title}</h3>
        <h6 className="conference-card-year">{year}</h6>
        <div className="conference-card-categories">
          {(categories || []).map((item, index) => {
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
        <div className="conference-card-content-footer">
          <div className="d-flex items-center">
            <div className="conference-card-icon">
              <img src={IconVideo} alt="doc-icon" />
            </div>
            <h6>Video</h6>
          </div>

          {/* <div className="d-flex items-center">
            <SvgIcon name="star" className="conference-card-icon" />
            <SvgIcon name="bookmark" className="conference-card-icon" />
          </div> */}
        </div>
      </div>
      {frequency ? (
        <div className="conference-card-keyword">
          {`${keyword}: Found ${frequency} time${frequency > 1 ? "s" : ""}`}
        </div>
      ) : null}
    </div>
  );
};

ConferenceCard.propTypes = {
  data: PropTypes.object,
  frequency: PropTypes.number,
  keyword: PropTypes.string,
};

ConferenceCard.defaultProps = {
  data: {},
  frequency: 0,
  keyword: "",
};

const mapStateToProps = (state) => ({
  allCategories: categorySelector(state).categories,
});

export default connect(mapStateToProps)(ConferenceCard);
