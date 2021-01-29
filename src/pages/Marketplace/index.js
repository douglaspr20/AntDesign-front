import React, { useEffect, useState } from 'react';
import { numberWithCommas } from "utils/format";
import { Row, Col } from 'antd';
import { connect } from "react-redux";

import { getAllMarketplaceCategories } from "redux/actions/marketplaceCategories-actions";
import { getAllMarketplace } from "redux/actions/marketplace-actions";
import { marketplaceSelector } from "redux/selectors/marketplaceSelector";
import { marketplaceCategoriesSelector } from "redux/selectors/marketplaceCategoriesSelector";
import { CustomSelect, MarketplaceFilterPanel, MarketplaceCard } from 'components';

import "./style.scss";

const MarketplacePage = ({
  allMarketplaceCategories,
  getAllMarketplaceCategories,
  allMarketplace,
  getAllMarketplace
}) => {
  const [sortValue, setSortValue] = useState('ASC');
  const [categoryFilter, setCategoryFilter] = useState(null);
  const SortOptions = [
    { text: 'Alphabetical (A to Z)', value: 'ASC' },
    { text: 'Alphabetical (Z to A)', value: 'DESC' },
  ];
  const filterTitles = ['Categories'];

  useEffect(() => {
    getAllMarketplaceCategories();
  }, []);

  useEffect(() => {
    getAllMarketplace(sortValue, categoryFilter);
  }, []);

  const onSortChange = (value) => {
    setSortValue(value);
    getAllMarketplace(value, categoryFilter);
  }

  const onChangeFilter = (values) => {
    getAllMarketplace(sortValue, JSON.stringify(values));
  }

  return (<div className="marketplace-page">
    <MarketplaceFilterPanel
      filterTitles={filterTitles}
      searchFilters={allMarketplaceCategories}
      onChange={onChangeFilter}
    />
    <div className="search-results-container">
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