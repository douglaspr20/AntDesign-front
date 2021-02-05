import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Checkbox } from "antd";

import { CustomDrawer, CustomButton, CustomCheckbox } from "components";
import { EVENT_TYPES, SEARCH_FILTERS } from "enum";
import Emitter from "services/emitter";
import { homeSelector } from "redux/selectors/homeSelector";

import "./style.scss";

const SearchFilters = SEARCH_FILTERS.library;
const FilterTitles = Object.keys(SearchFilters);

const FilterDrawer = ({ userProfile, onChange }) => {
  const [visible, setVisible] = useState(false);
  const [filterValues, setFilterValues] = useState({});

  const onClickDone = () => {
    onChange(filterValues);
    onDrawerClose();
  };

  const onDrawerClose = () => {
    setVisible(false);
  };

  const clearAllFilters = () => {
    setFilterValues({});
    onChange({});
    onDrawerClose();
  };

  const onFilterChange = (field, values) => {
    const newFilter = {
      ...filterValues,
      [field.toLowerCase()]: JSON.stringify(values),
    };
    setFilterValues(newFilter);
  };

  useEffect(() => {
    Emitter.on(EVENT_TYPES.OPEN_FILTER_PANEL, () => {
      setVisible(true);
    });
  }, []);

  return (
    <CustomDrawer
      className="filter-drawer"
      title=""
      width={450}
      visible={visible}
      placement="left"
      onClose={onDrawerClose}
      destroyOnClose={true}
    >
      <div className="filter-drawer-container">
        <div className="filter-drawer-header">
          <h2>Filters</h2>
          <h2 className="done" onClick={onClickDone}>
            Done
          </h2>
        </div>
        <div className="filter-drawer-content">
          {FilterTitles.map((filter, index) => (
            filter === 'Topics' &&
            <div className="search-filter" key={`${filter}-${index}`}>
              <h4 className="search-filter-title font-bold">{filter}</h4>
              <Checkbox.Group
                value={
                  filterValues[filter.toLowerCase()]
                    ? JSON.parse(filterValues[filter.toLowerCase()])
                    : []
                }
                onChange={(values) => onFilterChange(filter, values)}
              >
                {SearchFilters[filter].map((item) => (
                  <CustomCheckbox
                    key={item.value}
                    value={item.value}
                    size="md"
                    disabled={userProfile.memberShip === "free"}
                  >
                    {item.text}
                  </CustomCheckbox>
                ))}
              </Checkbox.Group>
            </div>
          ))}
        </div>
        <div className="filter-drawer-footer">
          <CustomButton
            className="w-full"
            text="Clear all"
            type="primary outlined"
            size="lg"
            onClick={clearAllFilters}
          />
        </div>
      </div>
    </CustomDrawer>
  );
};

FilterDrawer.propTypes = {
  title: PropTypes.string,
  onChange: PropTypes.func,
};

FilterDrawer.defaultProps = {
  title: "",
  onChange: () => {},
};

const mapStateToProps = (state) => ({
  userProfile: homeSelector(state).userProfile,
});

export default connect(mapStateToProps)(FilterDrawer);
