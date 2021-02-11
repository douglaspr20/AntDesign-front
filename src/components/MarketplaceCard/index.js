import React from 'react';

import { CustomButton, SpecialtyItem } from 'components';

import DefaultMarketplaceLogo from "images/img-default-marketplace-logo.png";
import IconMailOutline from "images/icon-mail-outline.svg";
import IconBriefCaseOutLine from "images/icon-briefcase-outline.svg";
import IconCallOutLine from "images/icon-call-outline.svg";
import IconUser from "images/icon-person-outline.svg";

import './style.scss';

const MarketplaceCard = ({
  name='',
  description='',
  url='',
  logoUrl='',
  contact_name='',
  contact_position='',
  contact_email='',
  contact_phone='',
  categories=[],
  allCategories=[]
}) => {
  const onVisitWebSite = (url) => {
    window.open(url, "_blank");
  }

  return (<div className="marketplace-card">
    <div className="marketplace-card__container">
      <div className="marketplace-card__container__logo">
        <img src={logoUrl != null && logoUrl !== '' ? logoUrl : DefaultMarketplaceLogo} alt="logo-img"/>
      </div>
      <div className="marketplace-card__container__content">
        <div className="marketplace-card__content__header">
          <h3>{name}</h3>
          <CustomButton text="Visit website" size="sm" onClick={() => onVisitWebSite(url)} />
        </div>
        <div className="marketplace-card__content__subtitle">
          {(categories || []).map((item, index) => {
            const category = allCategories.find((cat) => cat.value === item);
            return (
              <SpecialtyItem
                key={index}
                title={category ? category.title : item}
              />
            );
          })}
        </div>
        <div className="marketplace-card__content__paragraph">
          <p>
            {description}
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
            {contact_name}
          </div>
          <div className="marketplace-card__content__information--item">
            <span
              className="marketplace-card__content__information--icon"
              style={{
                backgroundImage: `url(${IconMailOutline})`,
              }}
            ></span> 
            {contact_email}
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
            {contact_position}
          </div>
          <div className="marketplace-card__content__information--item">
            <span
              className="marketplace-card__content__information--icon"
              style={{
                backgroundImage: `url(${IconCallOutLine})`,
              }}
            ></span> 
            {contact_phone}
          </div>
        </div>
        <div className="marketplace-card__content__mobile--button">
          <CustomButton text="Visit website" size="sm" onClick={() => onVisitWebSite(url)} />
        </div>
      </div>
    </div>
  </div>);
};

export default MarketplaceCard;