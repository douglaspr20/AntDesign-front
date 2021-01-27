import React, { useState } from 'react';
import { Row, Col } from 'antd';

import { CustomSelect, MarketplaceFilterPanel, MarketplaceCard } from 'components';

import "./style.scss";

const MarketplacePage = ({ }) => {
  const [sortValue, setSortValue] = useState('ASC');
  const SortOptions = [
    { text: 'Alphabetical (A to Z)', value: 'ASC' },
    { text: 'Alphabetical (Z to A)', value: 'DESC' },
  ];

  const onSortChange = () => {

  }

  return (<div className="marketplace-page">
    <MarketplaceFilterPanel />
    <div className="search-results-container">
      <Row>
        <Col span={24}>
          <div className="search-results-container-header d-flex justify-between items-center">
            <h3>{`0 results`}</h3>
            <CustomSelect
              className="search-results-container-sort"
              bordered={false}
              options={SortOptions}
              value={sortValue}
              onChange={(value) => onSortChange(value)}
            />
          </div>
        </Col>
      </Row>

      <MarketplaceCard />
    </div>
  </div>);
};

export default MarketplacePage;