import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "antd";

import {
  CustomDrawer,
  CustomButton,
  CustomCheckbox,
  CustomCalendar,
} from "components";
import { EVENT_TYPES, SEARCH_FILTERS } from "enum";
import Emitter from "services/emitter";

import "./style.scss";

const SearchFilters = SEARCH_FILTERS.events;
const FilterTitles = Object.keys(SearchFilters);

const EventFilterDrawer = () => {
  const [visible, setVisible] = useState(false);
  const [filterValues, setFilterValues] = useState({});

  const onDrawerClose = () => {
    setVisible(false);
  };

  const clearAllFilters = () => {
    setFilterValues({});
  };

  const onDateChange = (date) => {
    // const params = {
    //   date,
    // };
    // onFilterChange(params);
  };

  const onFilterChange = (field, values) => {
    setFilterValues({ ...filterValues, [field]: values });
  };

  const onShowAllEvent = () => {
    // onFilterChange({});
  };

  useEffect(() => {
    Emitter.on(EVENT_TYPES.OPEN_EVENT_FILTER_DRAWER, () => {
      setVisible(true);
    });
  }, []);

  return (
    <CustomDrawer
      className="event-filter-drawer"
      title=""
      width={450}
      visible={visible}
      placement="left"
      onClose={onDrawerClose}
      destroyOnClose={true}
    >
      <div className="event-filter-drawer-container">
        <div className="event-filter-drawer-header">
          <h2>Filters</h2>
          <h2 className="done" onClick={onDrawerClose}>
            Done
          </h2>
        </div>
        <div className="event-filter-drawer-content">
          <CustomCalendar dateChanged={onDateChange} />
          <CustomButton
            className="event-filter-drawer-allevents"
            type="primary"
            size="xs"
            text="All Events"
            onClick={onShowAllEvent}
          />
          <h2>Categories</h2>
          {FilterTitles.map((filter, index) => (
            <div className="search-filter" key={`${filter}-${index}`}>
              <h4 className="search-filter-title font-bold">{filter}</h4>
              <Checkbox.Group
                value={filterValues[filter]}
                onChange={(values) => onFilterChange(filter, values)}
              >
                {SearchFilters[filter].map((item) => (
                  <CustomCheckbox key={item.value} value={item.value} size="md">
                    {item.text}
                  </CustomCheckbox>
                ))}
              </Checkbox.Group>
            </div>
          ))}
        </div>
        <div className="event-filter-drawer-footer">
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

EventFilterDrawer.propTypes = {
  title: PropTypes.string,
};

EventFilterDrawer.defaultProps = {
  title: "",
};

export default EventFilterDrawer;
