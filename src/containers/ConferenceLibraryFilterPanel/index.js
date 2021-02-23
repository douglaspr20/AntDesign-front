import React, { useState } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "antd";
import { connect } from "react-redux";

import { CustomCheckbox } from "components";

import { SEARCH_FILTERS } from "enum";

import { categorySelector } from "redux/selectors/categorySelector";

import "./style.scss";

const YearOptions = SEARCH_FILTERS.ConferenceLibrary.year;

const ConferenceLibraryFilterPanel = ({ title, allCategories, onChange }) => {
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
    <div className="conference-library-filter-panel">
      <h2 className="font-regular">{title}</h2>
      <div className="conference-library-filter-panel-content">
        <div className="search-filter">
          <h5 className="search-filter-title font-bold">Topics</h5>
          <Checkbox.Group
            value={filters["topics"] ? JSON.parse(filters["topics"]) : []}
            onChange={(values) => onFilterChange("Topics", values)}
          >
            {allCategories.map((item) => (
              <CustomCheckbox key={item.value} value={item.value} size="sm">
                {item.title}
              </CustomCheckbox>
            ))}
          </Checkbox.Group>
        </div>
        <div className="search-filter">
          <h5 className="search-filter-title font-bold">Year</h5>
          <Checkbox.Group
            value={filters["year"] ? JSON.parse(filters["year"]) : []}
            onChange={(values) => onFilterChange("year", values)}
          >
            {YearOptions.map((item) => (
              <CustomCheckbox key={item} value={item} size="sm">
                {item}
              </CustomCheckbox>
            ))}
          </Checkbox.Group>
        </div>
      </div>
    </div>
  );
};

ConferenceLibraryFilterPanel.propTypes = {
  title: PropTypes.string,
  onChange: PropTypes.func,
};

ConferenceLibraryFilterPanel.defaultProps = {
  title: "Filters",
  onChange: () => {},
};

const mapStateToProps = (state) => ({
  allCategories: categorySelector(state).categories,
});

export default connect(mapStateToProps)(ConferenceLibraryFilterPanel);
