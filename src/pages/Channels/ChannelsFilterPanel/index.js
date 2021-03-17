import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "antd";
import { connect } from "react-redux";

import { CustomCheckbox } from "components";

import { channelCategorySelector } from "redux/selectors/channelCategorySelector";
import { getCategories } from "redux/actions/channel-category-actions";

import "./style.scss";

const ChannelsFilterPanel = ({
  title = "Filters",
  channelCategories,
  onChange,
  getCategories,
}) => {
  const [filters, setFilters] = useState({
    category: [],
  });
  const onFilterChange = (field, values) => {
    let newFilter = {
      ...filters,
      [field]: JSON.stringify(values),
    };
    setFilters({ ...filters, [field]: values });
    onChange(newFilter);
  };

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="channels-filter-panel">
      <h2 className="font-regular">{title}</h2>
      <div className="channels-filter-panel-content">
        <div className="search-filter">
          <h5 className="search-filter-title font-bold">Categories</h5>
          <Checkbox.Group
            value={filters.category}
            onChange={(values) => onFilterChange("category", values)}
          >
            {channelCategories.map((item) => (
              <CustomCheckbox key={item.value} value={item.value} size="sm">
                {item.title}
              </CustomCheckbox>
            ))}
          </Checkbox.Group>
        </div>
      </div>
    </div>
  );
};

ChannelsFilterPanel.propTypes = {
  title: PropTypes.string,
  onChange: PropTypes.func,
};

ChannelsFilterPanel.defaultProps = {
  title: "Filters",
  onChange: () => {},
};

const mapStateToProps = (state) => ({
  channelCategories: channelCategorySelector(state).categories,
});

const mapDispatchToProps = {
  getCategories,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelsFilterPanel);
