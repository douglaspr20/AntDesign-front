import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Checkbox } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import { CustomCheckbox, CustomCalendar, CustomButton } from "components";
import { eventSelector } from "redux/selectors/eventSelector";
import { SEARCH_FILTERS } from "enum";

import "./style.scss";

const SearchFilters = SEARCH_FILTERS.events;
const FilterTitles = Object.keys(SearchFilters);

const EventFilterPanel = ({ title, allEvents, onFilterChange, onClose }) => {
  const [filterValues, setFilterValues] = useState({});

  const onDateChange = (date) => {
    const newFilters = {
      ...filterValues,
      date,
    };

    setFilterValues(newFilters);
    onFilterChange(newFilters);
  };

  const onShowAllEvent = () => {
    setFilterValues({});
    onFilterChange({});
  };

  const onEventFilterChange = (field, values) => {
    const newFilters = { ...filterValues, [field]: values };
    setFilterValues(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="event-filter-panel">
      <CloseOutlined className="event-filter-panel-close" onClick={onClose} />
      <CustomCalendar value={filterValues.date} events={allEvents} onChange={onDateChange} />
      <CustomButton
        className="event-filter-panel-allevents"
        type="primary"
        size="xs"
        text="All Events"
        onClick={onShowAllEvent}
      />
      <div className="event-filter-panel-content">
        {FilterTitles.map((filter, index) => (
          <div className="search-filter" key={`${filter}-${index}`}>
            <h5 className="search-filter-title font-bold">{filter}</h5>
            <Checkbox.Group
              value={filterValues[filter]}
              onChange={(values) => onEventFilterChange(filter, values)}
            >
              {SearchFilters[filter].map((item) => (
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
};

EventFilterPanel.propTypes = {
  title: PropTypes.string,
  onFilterChange: PropTypes.func,
  onClose: PropTypes.func,
};

EventFilterPanel.defaultProps = {
  title: "Filters",
  onFilterChange: () => {},
  onClose: () => {},
};

const mapStateToProps = (state) => ({
  allEvents: eventSelector(state).allEvents,
});

export default connect(mapStateToProps)(EventFilterPanel);
