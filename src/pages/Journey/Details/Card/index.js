import React from 'react';
import { Button } from 'antd';

const HARDCODED_COVER_PLACEHOLDER =
  "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png";

const JourneyDetailsCard = () => {
  return (<>
    <div className="journey-details-container__card__container">
      <div className="journey-details-container__card__container--check">
        <div className="journey-details-container__card__container--check--line"></div>
        <div className="journey-details-container__card__container--check--circle"></div>
      </div>
      <div className="journey-details-container__card__container--content">
        <div className="journey-details-container__card__container--content--order">
          --<br></br>
          --<br></br>
          --<br></br>
        </div>
        <div className="journey-details-container__card__container--content--card">
          <img
            src={HARDCODED_COVER_PLACEHOLDER}
            alt="header-img"
          />
          <div className="card-information">
            <h3>We want to show you the most relevan information for you the most relevan information for you</h3>
            <p>Praesent eu dolor eu orci vehicula euismod. Vivamus sed sollicitudin libero, vel malesuada velit…</p>
            <div className="card-information-footer">
              <span className="content-type">Article</span>
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