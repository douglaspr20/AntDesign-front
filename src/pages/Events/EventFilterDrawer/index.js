import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "antd";
import moment from "moment";

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

const EventFilterDrawer = ({ onFilterChange }) => {
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(moment());
  const [filterValues, setFilterValues] = useState({});

  const onDone = () => {
    onFilterChange({ date });
    onDrawerClose();
  };

  const onDrawerClose = () => {
    setVisible(false);
  };

  const clearAllFilters = () => {
    setFilterValues({});
  };

  const onEventFilterChange = (field, values) => {
    setFilterValues({ ...filterValues, [field]: values });
  };

  const onShowAllEvent = () => {
    onFilterChange({});
    onDrawerClose();
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
          <h2 className="done" onClick={onDone}>
            Done
          </h2>
        </div>
        <div className="event-filter-drawer-content">
          <CustomCalendar dateChanged={setDate} />
          <CustomButton
            className="event-filter-drawer-allevents"
            type="primary"
            size="xs"
            text="All Events"
            onClick={onShowAllEvent}
          />
          {FilterTitles.map((filter, index) => (
            <div className="search-filter" key={`${filter}-${index}`}>
              <h4 className="search-filter-title font-bold">{filter}</h4>
              <Checkbox.Group
                value={filterValues[filter]}
                onChange={(values) => onEventFilterChange(filter, values)}
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
  onFilterChange: PropTypes.func,
};

EventFilterDrawer.defaultProps = {
  title: "",
  onFilterChange: () => {},
};

export default EventFilterDrawer;
