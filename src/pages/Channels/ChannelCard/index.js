import React from 'react';
import PropTypes from 'prop-types';
import { SvgIcon } from "components";
import { Link } from "react-router-dom";
import { INTERNAL_LINKS } from "enum";
import RenderPropsTruncatedString from 'components/RenderPropsTruncatedString.js';

import './style.scss';

const HARDCODED_COVER_PLACEHOLDER =
  "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png";

function ChannelCard({
  id,
  title,
  description, 
  image,
}) {

  return (
    <Link className="channel-card"
      to={`${INTERNAL_LINKS.CHANNELS}/${id}`}
    >
      <div className="channel-card-header">
        {image && <img src={image} alt={title || 'cover image'} />}
      </div>
      <div className="channel-card-content">
        <h3 className="channel-card-title">{title}</h3>
        <div className="d-flex items-center">
          <p className="channel-card-desc">
            <RenderPropsTruncatedString text={description} threshold={250}>
              {({ truncatedText, }) => (
                <>{truncatedText}</>
              )}
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
    </Link>
  )
}

ChannelCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
}

ChannelCard.defaultProps = {
  title: '',
  description: '',
  image: HARDCODED_COVER_PLACEHOLDER,
}

export default ChannelCard;
