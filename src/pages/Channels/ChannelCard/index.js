import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { SvgIcon } from "components";
import { Link } from "react-router-dom";
import { INTERNAL_LINKS } from "enum";
import RenderPropsTruncatedString from "components/RenderPropsTruncatedString.js";

import { ReactComponent as IconPlus } from "images/icon-plus.svg";
import "./style.scss";

const HARDCODED_COVER_PLACEHOLDER =
  "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png";

const ChannelCard = ({ id, title, description, image, add, onClick }) => {
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
            <div className="channel-card-content-footer">
              <div className="d-flex items-center"></div>
              <div className="d-flex items-center">
                <SvgIcon name="star" className="channel-card-icon" />
                <SvgIcon name="bookmark" className="channel-card-icon" />
              </div>
            </div>
          </div>
        </>
      )}
    </Link>
  );
};

ChannelCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  add: PropTypes.bool,
  description: PropTypes.string,
  image: PropTypes.string,
  onClick: PropTypes.func,
};

ChannelCard.defaultProps = {
  title: "",
  description: "",
  add: false,
  image: HARDCODED_COVER_PLACEHOLDER,
  onClick: () => {},
};

export default ChannelCard;
