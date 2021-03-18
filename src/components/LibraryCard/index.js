import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { SvgIcon } from "components";
import { SEARCH_FILTERS, CARD_TYPE } from "enum";
import { ReactComponent as IconPlus } from "images/icon-plus.svg";

import "./style.scss";

let ContentTypes = SEARCH_FILTERS.library["Content type"];
ContentTypes = ContentTypes.reduce(
  (res, item) => ({ ...res, [item.value]: item }),
  {}
);

const LibraryCard = ({ data, locked, type, onClickAccess, onAdd }) => {
  const [lineClamp, setLineClamp] = useState(3);
  const { title, image, description, contentType } = data || {};
  const randomId = `article-description-${Math.floor(Math.random() * 1000)}`;

  useEffect(() => {
    let isMounted = true;
    setTimeout(() => {
      if (isMounted) {
        getRowNum();
      }
    }, 500);

    return () => {
      isMounted = false;
    };
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
    if (type === CARD_TYPE.ADD) {
      onAdd();
    } else if (data.link && !locked) {
      window.open(data.link);
    }
  };

  return (
    <div
      className={clsx("library-card", { add: type === CARD_TYPE.ADD })}
      onClick={onCardClick}
    >
      {type === CARD_TYPE.ADD ? (
        <div className="library-card-plus">
          <IconPlus />
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

LibraryCard.propTypes = {
  data: PropTypes.object,
  locked: PropTypes.bool,
  type: PropTypes.string,
  onClickAccess: PropTypes.func,
  onAdd: PropTypes.func,
};

LibraryCard.defaultProps = {
  data: {},
  locked: true,
  type: CARD_TYPE.VIEW,
  onClickAccess: () => {},
  onAdd: () => {},
};

export default LibraryCard;
