import React from "react";
import PropTypes from "prop-types";

import { SvgIcon } from "components";

import IconVideo from "images/icon-video.svg";

import "./style.scss";

const ConferenceCard = ({ data }) => {
  const { title, image } = data || {};

  const onCardClick = () => {
    if (data.link) {
      // window.open(data.link);
    }
  };

  return (
    <div className="conference-card" onClick={onCardClick}>
      <div className="conference-card-header">
        {image && <img src={image} alt="header-img" />}
      </div>
      <div className="conference-card-content">
        <h3 className="conference-card-title">{title}</h3>
        <div className="conference-card-content-footer">
          <div className="d-flex items-center">
            <div className="conference-card-icon">
              <img src={IconVideo} alt="doc-icon" />
            </div>
            <h6>Video</h6>
          </div>

          <div className="d-flex items-center">
            <SvgIcon name="star" className="conference-card-icon" />
            <SvgIcon name="bookmark" className="conference-card-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

ConferenceCard.propTypes = {
  data: PropTypes.object,
};

ConferenceCard.defaultProps = {
  data: {},
};

export default ConferenceCard;
