import React, { useEffect, useState } from 'react';
import { numberWithCommas } from "utils/format";
import { Row, Col } from 'antd';
import { connect } from "react-redux";

import clsx from "clsx";
import Emitter from "services/emitter";

import { getAllMarketplaceCategories } from "redux/actions/marketplaceCategories-actions";
import { getAllMarketplace } from "redux/actions/marketplace-actions";
import { marketplaceSelector } from "redux/selectors/marketplaceSelector";
import { marketplaceCategoriesSelector } from "redux/selectors/marketplaceCategoriesSelector";
import { CustomSelect, MarketplaceFilterPanel, MarketplaceCard } from 'components';
import { INTERNAL_LINKS, MARKETPLACE_TYPES } from "enum";

import FilterDrawer from "./FilterDrawer";

import IconStorefrontOutline from "images/icon-storefront-outline.svg";

import "./style.scss";

const MarketplacePage = ({
  allMarketplaceCategories,
  getAllMarketplaceCategories,
  allMarketplace,
  getAllMarketplace,
  history
}) => {
  const [sortValue, setSortValue] = useState('ASC');
  const [categoryFilter] = useState(null);
  const SortOptions = [
    { text: 'Alphabetical (A to Z)', value: 'ASC' },
    { text: 'Alphabetical (Z to A)', value: 'DESC' },
  ];
  const filterTitles = ['Categories'];
  const [isPublic] = useState(history.location.pathname === INTERNAL_LINKS.MARKETPLACE);

  useEffect(() => {
    getAllMarketplaceCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getAllMarketplace(sortValue, categoryFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSortChange = (value) => {
    setSortValue(value);
    getAllMarketplace(value, categoryFilter);
  }

  const onChangeFilter = (values) => {
    getAllMarketplace(sortValue, JSON.stringify(values));
  }

  const showFilterPanel = () => {
    Emitter.emit(MARKETPLACE_TYPES.OPEN_FILTER_PANEL);
  };

  return (<div
            className={isPublic ? "marketplace-page" : "public-marketplace-page" }>
    <MarketplaceFilterPanel
      filterTitles={filterTitles}
      searchFilters={allMarketplaceCategories}
      onChange={onChangeFilter}
    />
    <FilterDrawer
      searchFilters={allMarketplaceCategories}
      onChange={onChangeFilter}
    />
    <div className="search-results-container">
      <Row>
        <Col span={24}>
          <div className="search-results-container-mobile-header">
            <h3
              className={clsx("filters-btn")}
              onClick={() => showFilterPanel()}
            >
              Filters
              </h3>
            <h3>{`${numberWithCommas(allMarketplace.length)} result${allMarketplace.length > 1 ? "s" : ""
              }`}</h3>
          </div>
        </Col>
      </Row>
      <div className="public-title">
        <img src={IconStorefrontOutline} alt="Marketplace Icon" />
        <h1>Marketplace</h1>
      </div>
      <Row>
        <Col span={24}>
          <div className="search-results-container-header d-flex justify-between items-center">
            <h3>
              {`${numberWithCommas(allMarketplace.length)} result${allMarketplace.length > 1 ? "s" : ""}`}</h3>
            <CustomSelect
              className="search-results-container-sort"
              bordered={false}
              options={SortOptions}
              defaultValue={sortValue}
              onChange={(value) => onSortChange(value)}
            />
          </div>
        </Col>
      </Row>
      {allMarketplace.map((item) => {
        return <MarketplaceCard
          key={item.id}
          name={item.name}
          description={item.description}
          url={item.url}
          logoUrl={item.logoUrl}
          contact_name={item.contact_name}
          contact_email={item.contact_email}
          contact_phone={item.contact_phone}
          contact_position={item.contact_position}
          category={item.MarketplaceCategory.name}
        />;
      })}
    </div>
  </div>);
};
const mapStateToProps = (state) => ({
  allMarketplaceCategories: marketplaceCategoriesSelector(state).allMarketplaceCategories,
  allMarketplace: marketplaceSelector(state).allMarketplace,
});

const mapDispatchToProps = {
  getAllMarketplaceCategories,
  getAllMarketplace,
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketplacePage);