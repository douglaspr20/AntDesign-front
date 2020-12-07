import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import IconDocument from "images/icon-document.svg";

import { SvgIcon } from "components";

import "./style.scss";

const LibraryCard = ({ data }) => {
  const [lineClamp, setLineClamp] = useState(3);
  const { title, image, description } = data || {};
  const randomId = `article-description-${Math.floor(Math.random() * 1000)}`;

  useEffect(() => {
    console.log("only once callled");
    setTimeout(() => {
      getRowNum();
    }, 500);
    window.addEventListener("resize", () => {
      getRowNum();
    });
  }, []);

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
