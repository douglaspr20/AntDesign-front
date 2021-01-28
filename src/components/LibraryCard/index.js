import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { SvgIcon } from "components";
import { SEARCH_FILTERS } from "enum";

import "./style.scss";

let ContentTypes = SEARCH_FILTERS.library["Content type"];
ContentTypes = ContentTypes.reduce(
  (res, item) => ({ ...res, [item.value]: item }),
  {}
);

const LibraryCard = ({ data, locked, onClickAccess }) => {
  const [lineClamp, setLineClamp] = useState(3);
  const { title, image, description, contentType } = data || {};
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

  const onCardClick = () => {
    if (data.link && !locked) {
      window.open(data.link);
    }
  };

  return (
    <div className="library-card" onClick={onCardClick}>
      <div className="library-card-header">
        {image && <img src={image} alt="header-img" />}
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
              <img
                src={(ContentTypes[contentType || "article"] || {}).icon}
                alt="doc-icon"
              />
            </div>
            <h6>{(ContentTypes[contentType || "article"] || {}).text}</h6>
          </div>

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
