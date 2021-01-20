import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, } from 'antd';
import moment from "moment";

import './style.scss';

const HARDCODED_COVER_PLACEHOLDER = 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png';
const DATE_FORMAT = "MMMM DD, YYYY";

function EpisodeCard({
  created_at,
  episode_number,
  episode_cover = HARDCODED_COVER_PLACEHOLDER,
  links = [],
  onEdit = () => {},
  onRemove = () => {},
  isAdmin = false,
}) {

  return (
    <div className="podcast-episode__card">
      <div className="podcast-episode__card-cover"
        style={{
          backgroundImage: `url(${episode_cover ? episode_cover : HARDCODED_COVER_PLACEHOLDER})`,
        }}
      ></div>
      <div className="podcast-episode__card-body">
        <div className="podcast-episode__card-body-data">
          <span className="podcast-episode__card-body-data-episode-num">
            Episode #{episode_number}
          </span>
          <span className="podcast-episode__card-body-data-episode-date">
            {moment(created_at).format(DATE_FORMAT)}
          </span>
        </div>
        
        {links.length > 0 &&
          <div className="podcast-episode__card-body-links">
            <span className="podcast-episode__card-body-links-heading" style={{width: '100%'}}>
              Listen on:
            </span>
            {links.map((link, i) => (
              <Tooltip
                key={i}
                placement="top"
                title={link.label}
              >
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
        }
        {
          isAdmin &&
          <div className="podcast-episode__card-actions">
            <a onClick={onEdit}>Edit</a>
            <a onClick={onRemove}>Remove</a>
          </div>
        }
      </div>
    </div>
  );
}

EpisodeCard.propTypes = {
  created_at: PropTypes.object.isRequired,
  episode_number: PropTypes.number.isRequired,
  episode_cover: PropTypes.string,
  links: PropTypes.array,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  isAdmin: PropTypes.bool
};

export default EpisodeCard;
