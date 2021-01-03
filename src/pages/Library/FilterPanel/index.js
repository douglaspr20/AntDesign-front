import React from "react";
import PropTypes from "prop-types";
import { Checkbox } from "antd";
import { connect } from "react-redux";

import { CustomCheckbox } from "components";

import { SEARCH_FILTERS } from "enum";
import { homeSelector } from "redux/selectors/homeSelector";

import "./style.scss";

const FilterTitles = Object.keys(SEARCH_FILTERS);

const FilterPanel = ({ planUpdated }) => (
  <div className="filter-panel">
    <h2 className="font-regular">Filters</h2>
    <div className="filter-panel-content">
      {FilterTitles.map((filter, index) => (
        <div className="search-filter" key={`${filter}-${index}`}>
          <h5 className="search-filter-title font-bold">{filter}</h5>
          <Checkbox.Group>
            {SEARCH_FILTERS[filter].map((item) => (
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

FilterPanel.propTypes = {
  title: PropTypes.string,
};

FilterPanel.defaultProps = {
  title: "",
};

const mapStateToProps = (state) => ({
  planUpdated: homeSelector(state).planUpdated,
});

export default connect(mapStateToProps)(FilterPanel);
