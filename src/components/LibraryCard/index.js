import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import IconDocument from "images/icon-document.svg";

import { SvgIcon } from "components";
import { INTERNAL_LINKS } from "enum";

import "./style.scss";

const LibraryCard = ({ data, locked, onClickAccess }) => {
  const [lineClamp, setLineClamp] = useState(3);
  const { title, image, description, article } = data || {};
  const randomId = `article-description-${Math.floor(Math.random() * 1000)}`;

  useEffect(() => {
    setTimeout(() => {
      getRowNum();
    }, 500);
    // eslint-disable-next-line
  }, []);

  window.addEventListener("resize", () => {
    getRowNum();
  });

  const getRowNum = () => {
    const descElement = document.querySelector(`#${randomId}`);
    if (descElement) {
      const maxRow = Math.floor(descElement.offsetHeight / 23);
      setLineClamp(maxRow ? maxRow : 1);
    }
  };

  return (
    <div className="library-card">
      <div className="library-card-header">
        <img src={image} alt="header-img" />
      </div>
      <div className="library-card-content">
        <h3 className="library-card-title">{title}</h3>
        <div id={randomId} className="d-flex items-center">
          <p
            className="library-card-desc"
            style={{
              WebkitLineClamp: lineClamp,
              maxHeight: 22 * lineClamp,
            }}
          >
            {description}
          </p>
        </div>
        <div className="library-card-content-footer">
          <NavLink to={`${INTERNAL_LINKS.ARTICLE}/${article}`}>
            <div className="d-flex items-center">
              <div className="library-card-icon">
                <img src={IconDocument} alt="doc-icon" />
              </div>
              <h6>{`Article`}</h6>
            </div>
          </NavLink>
          <div className="d-flex items-center">
            <SvgIcon name="star" className="library-card-icon" />
            <SvgIcon name="bookmark" className="library-card-icon" />
          </div>
        </div>
      </div>
      {/* {locked && (
        <div className="library-lock-icon1">
          <img src={IconLockClosed} alt="icon-lock" />
        </div>
      )} */}
      {locked && (
        <div className="library-card-hover">
          {/* <div className="library-card-hover-lock-icon">
            <img src={IconLockClosed} alt="icon-lock" />
          </div>
          <CustomButton
            text="Get unlimited access"
            type="primary"
            size="md"
            className="library-card-hover-btn"
            onClick={onClickAccess}
          /> */}
        </div>
      )}
    </div>
  );
};

LibraryCard.propTypes = {
  data: PropTypes.object,
  locked: PropTypes.bool,
  onClickAccess: PropTypes.func,
};

LibraryCard.defaultProps = {
  data: {},
  locked: true,
  onClickAccess: () => {},
};

export default LibraryCard;
