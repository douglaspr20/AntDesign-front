import React, { useState } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "antd";
import { connect } from "react-redux";
import Emitter from "services/emitter";

import { CustomCheckbox, CustomButton } from "components";

import { SEARCH_FILTERS, EVENT_TYPES } from "enum";
import { homeSelector } from "redux/selectors/homeSelector";

import "./style.scss";

const SearchFilters = SEARCH_FILTERS.library;
const FilterTitles = Object.keys(SearchFilters);

const FilterPanel = ({ title, userProfile, onChange }) => {
  const [filters, setFilters] = useState({});

  const onFilterChange = (field, values) => {
    const newFilter = {
      ...filters,
      [field.toLowerCase()]: JSON.stringify(values),
    };
    setFilters(newFilter);
    onChange(newFilter);
  };

  return (
    <div className="podcast-filter-panel">
      <h2 className="font-regular">{title}</h2>
      <div className="podcast-filter-panel-content">
        {FilterTitles.map((filter, index) => (
          filter === 'Topics' &&
          <div className="search-filter" key={`${filter}-${index}`}>
            <h5 className="search-filter-title font-bold">{filter}</h5>
            <Checkbox.Group
              value={
                filters[filter.toLowerCase()]
                  ? JSON.parse(filters[filter.toLowerCase()])
                  : []
              }
              onChange={(values) => onFilterChange(filter, values)}
            >
              {SearchFilters[filter].map((item) => (
                <CustomCheckbox
                  key={item.value}
                  value={item.value}
                  size="sm"
                  disabled={userProfile.memberShip === "free"}
                >
                  {item.text}
                </CustomCheckbox>
              ))}
            </Checkbox.Group>
          </div>
        ))}
      </div>
    </div>
  );
};

FilterPanel.propTypes = {
  title: PropTypes.string,
  onChange: PropTypes.func,
};

FilterPanel.defaultProps = {
  title: "Filters",
  onChange: () => {},
};

const mapStateToProps = (state) => ({
  userProfile: homeSelector(state).userProfile,
});

export default connect(mapStateToProps)(FilterPanel);
