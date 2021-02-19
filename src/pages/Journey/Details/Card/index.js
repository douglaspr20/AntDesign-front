import React from 'react';
import { Typography, Button } from 'antd';

import { ReactComponent as IconMenuOutline } from 'images/icon-menu-outline.svg';

const { Paragraph } = Typography;

const HARDCODED_COVER_PLACEHOLDER =
  "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png";

const JourneyDetailsCard = ({
  title,
  description,
  link,
  type,
  image,
}) => {
  return (<>
    <div className="journey-details-container__card__container">
      <div className="journey-details-container__card__container--check">
        <div className="journey-details-container__card__container--check--line"></div>
        <div className="journey-details-container__card__container--check--circle"></div>
      </div>
      <div className="journey-details-container__card__container--content">
        <div className="journey-details-container__card__container--content--order">
          <IconMenuOutline />
        </div>
        <div className="journey-details-container__card__container--content--card">
          <div className="card-image">
            <img
              src={image || HARDCODED_COVER_PLACEHOLDER}
              alt="header-img"
            />
          </div>
          <div className="card-information">
            <h3>{title}</h3>
            <Paragraph
               ellipsis={{
                rows: 3,
                expandable: false,
              }}
            >
              {description}
            </Paragraph>
            <div className="card-information-footer">
              <span className="content-type">{type}</span>
              <div className="card--actions" >
                <Button type="primary">Mark as viewed</Button>
                <Button danger>Remove</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>);
};

export default JourneyDetailsCard;