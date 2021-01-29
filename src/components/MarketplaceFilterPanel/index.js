import React from 'react';
import PropTypes from "prop-types";
import { Checkbox } from "antd";

import { CustomCheckbox } from "components";

import "./style.scss";

const MarketplaceFilterPanel = ({
    title = 'Filters',
    filterTitles = [],
    searchFilters = [],
    filters = [],
}) => {
    return (<div className="marketplace-filter-panel">
        <h2 className="font-regular">{title}</h2>
        <div className="marketplace-filter-panel-content">
            {filterTitles.map((filter, index) => (
                <div className="search-filter" key={`${filter}-${index}`}>
                    <h5 className="search-filter-title font-bold">{filter}</h5>
                    <Checkbox.Group
                        value={
                            filters[filter.toLowerCase()]
                                ? JSON.parse(filters[filter.toLowerCase()])
                                : []
                        }
                    >
                        {searchFilters[filter].map((item) => (
                            <CustomCheckbox
                                key={item.id}
                                value={item.id}
                                size="sm"
                            >
                                {item.name}
                            </CustomCheckbox>
                        ))}
                    </Checkbox.Group>
                </div>
            ))}
        </div>
    </div>);
};

export default MarketplaceFilterPanel;