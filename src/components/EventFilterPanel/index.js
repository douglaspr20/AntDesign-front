import React from "react";
import PropTypes from "prop-types";
import { Checkbox } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import { CustomCheckbox, CustomCalendar, CustomButton } from "components";

import { SEARCH_FILTERS } from "enum";

import "./style.scss";

const SearchFilters = SEARCH_FILTERS.events;
const FilterTitles = Object.keys(SearchFilters);

const EventFilterPanel = ({ title, onFilterChange, onClose }) => {
  const onDateChange = (date) => {
    const params = {
      date,
    };

    onFilterChange(params);
  };

  const onShowAllEvent = () => {
    onFilterChange({});
  };

  return (
    <div className="event-filter-panel">
      <CloseOutlined className="event-filter-panel-close" onClick={onClose} />
      <CustomCalendar dateChanged={onDateChange} />
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
            <Checkbox.Group>
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

export default EventFilterPanel;
