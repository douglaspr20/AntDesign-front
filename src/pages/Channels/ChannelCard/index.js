import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { connect } from "react-redux";
import { SvgIcon, SpecialtyItem } from "components";
import { Link } from "react-router-dom";
import { INTERNAL_LINKS, CARD_MENUS } from "enum";
import RenderPropsTruncatedString from "components/RenderPropsTruncatedString.js";
import { categorySelector } from "redux/selectors/categorySelector";
import CardMenu from "components/CardMenu";

import { ReactComponent as IconPlus } from "images/icon-plus.svg";
import IconMenu from "images/icon-menu.svg";

import "./style.scss";

const HARDCODED_COVER_PLACEHOLDER =
  "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png";

const ChannelCard = ({
  id,
  title,
  description,
  image,
  add,
  allCategories,
  categories,
  isOwner,
  onClick,
  onMenuClick,
}) => {
  return (
    <Link
      className={clsx("channel-card", { add })}
      to={add ? "#" : `${INTERNAL_LINKS.CHANNELS}/${id}`}
      onClick={onClick}
    >
      {add ? (
        <div className="channel-card-container">
          <IconPlus />
        </div>
      ) : (
        <>
          <div className="channel-card-header">
            {image && <img src={image} alt={title || "cover image"} />}
          </div>
          <div className="channel-card-content">
            <h3 className="channel-card-title">{title}</h3>
            <div className="d-flex items-center">
              <p className="channel-card-desc">
                <RenderPropsTruncatedString text={description} threshold={250}>
                  {({ truncatedText }) => <>{truncatedText}</>}
                </RenderPropsTruncatedString>
              </p>
            </div>
            <div className="channel-card-content-categories">
              {(categories || []).map((item, index) => {
                const category = allCategories.find(
                  (cat) => cat.value === item
                );
                return (
                  <SpecialtyItem
                    key={index}
                    title={category ? category.title : item}
                    active={false}
                  />
                );
              })}
            </div>
            <div className="channel-card-content-footer">
              <div className="d-flex items-center"></div>
              <div className="d-flex items-center">
                <SvgIcon name="star" className="channel-card-icon" />
                <SvgIcon name="bookmark" className="channel-card-icon" />
              </div>
            </div>
            {isOwner && (
              <CardMenu menus={CARD_MENUS.slice(0, 1)} onClick={onMenuClick}>
                <div className="library-card-menu">
                  <img src={IconMenu} alt="icon-menu" />
                </div>
              </CardMenu>
            )}
          </div>
        </>
      )}
    </Link>
  );
};

ChannelCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  add: PropTypes.bool,
  description: PropTypes.string,
  image: PropTypes.string,
  categories: PropTypes.array,
  isOwner: PropTypes.bool,
  onClick: PropTypes.func,
  onMenuClick: PropTypes.func,
};

ChannelCard.defaultProps = {
  title: "",
  description: "",
  add: false,
  image: HARDCODED_COVER_PLACEHOLDER,
  categories: [],
  isOwner: false,
  onClick: () => {},
  onMenuClick: () => {},
};

const mapStateToProps = (state) => ({
  allCategories: categorySelector(state).categories,
});

export default connect(mapStateToProps)(ChannelCard);
