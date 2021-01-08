import React from "react";
import PropTypes from "prop-types";
import { Checkbox } from "antd";
import { connect } from "react-redux";

import { CustomCheckbox } from "components";

import { SEARCH_FILTERS } from "enum";
import { homeSelector } from "redux/selectors/homeSelector";

import "./style.scss";

const SearchFilters = SEARCH_FILTERS.library;
const FilterTitles = Object.keys(SearchFilters);

const FilterPanel = ({ title, userProfile }) => (
  <div className="library-filter-panel">
    <h2 className="font-regular">{title}</h2>
    <div className="library-filter-panel-content">
      {FilterTitles.map((filter, index) => (
        <div className="search-filter" key={`${filter}-${index}`}>
          <h5 className="search-filter-title font-bold">{filter}</h5>
          <Checkbox.Group>
            {SearchFilters[filter].map((item) => (
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
      ))}
    </div>
  </div>
);

FilterPanel.propTypes = {
  title: PropTypes.string,
};

FilterPanel.defaultProps = {
  title: "Filters",
};

const mapStateToProps = (state) => ({
  userProfile: homeSelector(state).userProfile,
});

export default connect(mapStateToProps)(FilterPanel);
