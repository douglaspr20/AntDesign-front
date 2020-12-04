import React from "react";
import PropTypes from "prop-types";
import { Checkbox } from "antd";

import { CustomCheckbox } from "components";

import { SEARCH_FILTERS } from "enum";

import "./style.scss";

const FilterTitles = Object.keys(SEARCH_FILTERS);

class FilterPanel extends React.Component {
  render() {
    return (
      <div className="filter-panel">
        <h2 className="font-regular">Filters</h2>
        <div className="filter-panel-content">
          {FilterTitles.map((filter, index) => (
            <div className="search-filter" key={`${filter}-${index}`}>
              <h5 className="search-filter-title font-bold">{filter}</h5>
              <Checkbox.Group>
                {SEARCH_FILTERS[filter].map((item) => (
                  <CustomCheckbox key={item.value} value={item.value} size="sm">
                    {item.text}
                  </CustomCheckbox>
                ))}
              </Checkbox.Group>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

FilterPanel.propTypes = {
  title: PropTypes.string,
};

FilterPanel.defaultProps = {
  title: "",
};

export default FilterPanel;
