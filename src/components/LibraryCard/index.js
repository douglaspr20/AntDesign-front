import React from "react";
import PropTypes from "prop-types";

import IconDocument from "images/icon-document.svg";

import { SvgIcon } from "components";

import "./style.scss";

const LibraryCard = ({ data }) => {
  const { title, image, description } = data || {};
  return (
    <div className="library-card">
      <div className="library-card-header">
        <img src={image} alt="header-img" />
      </div>
      <div className="library-card-content">
        <h3 className="library-card-title">{title}</h3>
        <p classname="library-card-desc">{description}</p>
        <div className="library-card-content-footer">
          <div className="d-flex items-center">
            <div className="library-card-icon">
              <img src={IconDocument} alt="doc-icon" />
            </div>
            <h6>{`Article`}</h6>
          </div>
          <div className="d-flex items-center">
            <SvgIcon name="star" className="library-card-icon" />
            <SvgIcon name="bookmark" />
          </div>
        </div>
      </div>
    </div>
  );
};

LibraryCard.propTypes = {
  data: PropTypes.object,
  onClickAccess: PropTypes.func,
};

LibraryCard.defaultProps = {
  data: {},
  onClickAccess: () => {},
};

export default LibraryCard;
