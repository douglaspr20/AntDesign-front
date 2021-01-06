import React from "react";
import PropTypes from "prop-types";
import { Checkbox } from "antd";
import { connect } from "react-redux";

import { CustomCheckbox, CustomCalendar } from "components";

import { SEARCH_FILTERS } from "enum";
import { homeSelector } from "redux/selectors/homeSelector";

import "./style.scss";

const SearchFilters = SEARCH_FILTERS.events;
const FilterTitles = Object.keys(SearchFilters);

const EventFilterPanel = ({ title, planUpdated, onFilterChange }) => {
  const onDateChange = (date) => {
    const params = {
      date,
    };

    onFilterChange(params);
  };

  return (
    <div className="event-filter-panel">
      <CustomCalendar disabled={!planUpdated} dateChanged={onDateChange} />
      <h2 className="font-regular">{title}</h2>
      <div className="event-filter-panel-content">
        {FilterTitles.map((filter, index) => (
          <div className="search-filter" key={`${filter}-${index}`}>
            <h5 className="search-filter-title font-bold">{filter}</h5>
            <Checkbox.Group>
              {SearchFilters[filter].map((item) => (
                <CustomCheckbox
                  key={item.value}
                  value={item.value}
                  size="sm"
                  disabled={!planUpdated}
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

EventFilterPanel.propTypes = {
  title: PropTypes.string,
  onFilterChange: PropTypes.func,
};

EventFilterPanel.defaultProps = {
  title: "Filters",
  onFilterChange: () => {},
};

const mapStateToProps = (state) => ({
  planUpdated: homeSelector(state).planUpdated,
});

export default connect(mapStateToProps)(EventFilterPanel);
