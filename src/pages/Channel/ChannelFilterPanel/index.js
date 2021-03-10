import React, { useState } from 'react';
import PropTypes from "prop-types";
import { Checkbox } from "antd";

import { CustomCheckbox } from "components";

import "./style.scss";

const ChannelFilterPanel = ({
  title = 'Filters',
  searchFilters = [],
  onChange
}) => {
  const [filters, setFilters] = useState([]);
  const onFilterChange = (values) => {
    let newFilter = values;
    setFilters(newFilter);
    onChange(newFilter);
  };

  return (
    <div className="channel-filter-panel">
      <h2 className="font-regular">{title}</h2>
      <div className="channel-filter-panel-content">
        <div className="search-filter">
          <h5 className="search-filter-title font-bold">Topics</h5>
          <Checkbox.Group
            value={
              filters.length > 0 && filters
            }
            onChange={(values) => onFilterChange(values)}
          >
            {searchFilters.map((item) => (
              <CustomCheckbox
                key={item.value}
                value={item.value}
                size="sm"
              >
                {item.title}
              </CustomCheckbox>
            ))}
          </Checkbox.Group>
        </div>
      </div>
    </div>
  );
};

ChannelFilterPanel.propTypes = {
  title: PropTypes.string,
  onChange: PropTypes.func,
};

ChannelFilterPanel.defaultProps = {
  title: "Filters",
  onChange: () => { },
};

export default ChannelFilterPanel;