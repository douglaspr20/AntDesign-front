import React, { useState } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "antd";
import { connect } from "react-redux";

import { CustomCheckbox, SearchInput } from "components";

import { homeSelector } from "redux/selectors/homeSelector";
import { categorySelector } from "redux/selectors/categorySelector";

import { CONFERENCE_SETTING } from "enum";

import "./style.scss";

const SessionType = [...CONFERENCE_SETTING.SESSION_TYPE];

const FilterPanel = ({
  title,
  userProfile,
  allCategories,
  onChange,
  onSearch,
}) => {
  const [filterValues, setFilterValues] = useState({});

  const onFilterChange = (field, values) => {
    const newFilter = {
      ...filterValues,
      [field.toLowerCase()]: JSON.stringify(values),
    };
    setFilterValues(newFilter);
    onChange(newFilter);
  };

  return (
    <div className="global-conference-filter-panel">
      <h2 className="font-regular">{title}</h2>
      <div className="global-conference-filter-panel-content">
        <div className="search-filter">
          <h5 className="search-filter-title font-bold">Search</h5>
          <SearchInput onSearch={onSearch} />
          <h5 className="search-filter-title font-bold">Categories</h5>
          <Checkbox.Group
            value={
              filterValues["categories"]
                ? JSON.parse(filterValues["categories"])
                : []
            }
            onChange={(values) => onFilterChange("Categories", values)}
            style={{ marginBottom: "30px" }}
          >
            {allCategories.map((item) => (
              <CustomCheckbox
                key={item.value}
                value={item.value}
                size="sm"
                disabled={userProfile.memberShip === "free"}
              >
                {item.title}
              </CustomCheckbox>
            ))}
          </Checkbox.Group>
          <h5 className="search-filter-title font-bold">Sessions</h5>
          <Checkbox.Group
            value={
              filterValues["sessions"]
                ? JSON.parse(filterValues["sessions"])
                : []
            }
            onChange={(values) => onFilterChange("Sessions", values)}
          >
            {SessionType.map((item) => (
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
      </div>
    </div>
  );
};

FilterPanel.propTypes = {
  title: PropTypes.string,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  onClickPodcastSeries: PropTypes.func,
};

FilterPanel.defaultProps = {
  title: "Filters",
  onChange: () => {},
  onSearch: () => {},
  onClickPodcastSeries: () => {},
};

const mapStateToProps = (state) => ({
  userProfile: homeSelector(state).userProfile,
  allCategories: categorySelector(state).categories,
});

export default connect(mapStateToProps)(FilterPanel);
