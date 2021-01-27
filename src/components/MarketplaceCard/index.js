import React from 'react';

import { SvgIcon } from "components";
import { CustomButton } from 'components';

import IconMailOutline from "images/icon-mail-outline.svg";
import IconBriefCaseOutLine from "images/icon-briefcase-outline.svg";
import IconCallOutLine from "images/icon-call-outline.svg";
import IconUser from "images/icon-person-outline.svg";

import './style.scss';

const MarketplaceCard = () => {
  return (<div className="marketplace-card">
    <div className="marketplace-card__container">
      <div className="marketplace-card__container__logo">
        <img />
      </div>
      <div className="marketplace-card__container__content">
        <div className="marketplace-card__content__header">
          <h3>The new company name</h3>
          <CustomButton text="Visit website" size="sm" />
        </div>
        <div className="marketplace-card__content__subtitle">
          <h5>Software and technology</h5>
        </div>
        <div className="marketplace-card__content__paragraph">
          <p>
            Developing Talent & Leadership behaviors.
            Positive Design Thinking & Strategy through Positive
            Leadership Strategy and POSITIVE & AGILE coaching |
            2 hack habits, goal achievement, and behavior transformation
            in organizations, sports clubs, PYMES, and corporations.
          </p>
        </div>
        <p className="marketplace-card__content__label" >Contact information</p>
        <div className="marketplace-card__content__information">
          <div className="marketplace-card__content__information--item">
          <span
              className="marketplace-card__content__information--icon"
              style={{
                backgroundImage: `url(${IconUser})`,
              }}
            ></span> 
            Susan Mercedes
          </div>
          <div className="marketplace-card__content__information--item">
            <span
              className="marketplace-card__content__information--icon"
              style={{
                backgroundImage: `url(${IconMailOutline})`,
              }}
            ></span> 
            susanmercedes@thenewcompany.com
          </div>
        </div>
        <div className="marketplace-card__content__information">
          <div className="marketplace-card__content__information--item">
            <span
              className="marketplace-card__content__information--icon"
              style={{
                backgroundImage: `url(${IconBriefCaseOutLine})`,
              }}
            ></span> 
            VP of Human resources
          </div>
          <div className="marketplace-card__content__information--item">
            <span
              className="marketplace-card__content__information--icon"
              style={{
                backgroundImage: `url(${IconCallOutLine})`,
              }}
            ></span> 
            (536) 564 - 5608 / (345) 435 - 3457
          </div>
        </div>
      </div>
    </div>
  </div>);
};

export default MarketplaceCard;