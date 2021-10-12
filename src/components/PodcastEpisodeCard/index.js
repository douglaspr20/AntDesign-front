import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Tooltip } from "antd";
import moment from "moment";
import clsx from "clsx";
import ReactPlayer from "react-player";


import { SpecialtyItem } from "components";
import { categorySelector } from "redux/selectors/categorySelector";
import { CARD_TYPE, INTERNAL_LINKS } from "enum";
import { ReactComponent as IconPlus } from "images/icon-plus.svg";
import CardMenu from "../CardMenu";
import IconMenu from "images/icon-menu.svg";

import "./style.scss";

const DATE_FORMAT = "MMMM DD, YYYY";

function EpisodeCard({
  created_at,
  episode_number,
  episode_cover,
  categories,
  links,
  allCategories,
  title,
  type,
  keyword,
  frequency,
  onAdd,
  onMenuClick,
  isInternalLink,
  episode,
}) {
  const onCardClick = () => {
    if (type === CARD_TYPE.ADD) {
      onAdd();
    } else if (isInternalLink === false) {
      window.location = `${INTERNAL_LINKS.LIBRARY_ITEM}/podcast/${episode.id}`;
    }
  };

  return (
    <div
      className={clsx("podcast-episode__card", { add: type === CARD_TYPE.ADD })}
      onClick={onCardClick}
    >
      {type === CARD_TYPE.ADD ? (
        <div className="podcast-episode__card-plus">
          <IconPlus />
        </div>
      ) : (
        <>
          <div className="podcast-episode__card-cover">
            {isInternalLink === false ? (
              <>
                {episode_cover ? (
                  <img src={episode_cover} alt="header-img" />
                ) : (
                  <div />
                )}
              </>
            ) : (
              <ReactPlayer
                className="podcast-episode__player"
                controls={isInternalLink === true}
                url={episode.vimeoLink}
              />
            )}
          </div>
          <div className="podcast-episode__card-body">
            <div className="podcast-episode__card-body-data">
              <span className="podcast-episode__card-body-data-episode-num">
                Episode #{episode_number}
              </span>
              <span className="podcast-episode__card-body-data-episode-date">
                {moment(created_at).format(DATE_FORMAT)}
              </span>
            </div>
            <div className="podcast-episode__card-body-title">{title}</div>
            <div className="podcast-episode__card-body-links">
              {links.length > 0 && (
                <>
                  <span className="podcast-episode__card-body-links-heading">
                    Listen on:
                  </span>
                  <div className="link-list">
                    {links.map((link, i) => (
                      <Tooltip key={i} placement="top" title={link.label}>
                        <a
                          className="podcast-episode__card-body-link"
                          href={link.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span
                            className="podcast-episode__card-body-link-icon"
                            style={{
                              backgroundImage: `url(${link.icon})`,
                            }}
                            aria-label={`Listen on ${link.label}`}
                          ></span>
                        </a>
                      </Tooltip>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="podcast-episode__card-body-categories">
              {(categories || []).map((item, index) => {
                const category = allCategories.find(
                  (cat) => cat.value === item
                );
                return (
                  <SpecialtyItem
                    key={index}
                    title={category ? category.title : item}
                  />
                );
              })}
            </div>
            {type === CARD_TYPE.EDIT && (
              <CardMenu onClick={onMenuClick}>
                <div className="podcast-episode__card-menu">
                  <img src={IconMenu} alt="icon-menu" />
                </div>
              </CardMenu>
            )}
            {frequency ? (
              <div className="podcast-episode__card-keyword">
                {`${keyword}: Found ${frequency} time${
                  frequency > 1 ? "s" : ""
                }`}
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}

EpisodeCard.propTypes = {
  created_at: PropTypes.object,
  episode_number: PropTypes.number,
  episode_cover: PropTypes.string,
  categories: PropTypes.array,
  links: PropTypes.array,
  title: PropTypes.string,
  type: PropTypes.string,
  frequency: PropTypes.number,
  keyword: PropTypes.string,
  onAdd: PropTypes.func,
  onMenuClick: PropTypes.func,
  isInternalLink: PropTypes.bool,
  episode: PropTypes.object,
};

EpisodeCard.defaultProps = {
  created_at: {},
  episode_number: 0,
  episode_cover: "",
  categories: [],
  links: [],
  title: "",
  type: CARD_TYPE.VIEW,
  frequency: 0,
  keyword: "",
  onAdd: () => {},
  onMenuClick: () => {},
  isInternalLink: false,
  episode: null,
};

const mapStateToProps = (state) => ({
  allCategories: categorySelector(state).categories,
});

export default connect(mapStateToProps)(EpisodeCard);
