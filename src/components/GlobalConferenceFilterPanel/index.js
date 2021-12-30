import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "antd";
import { connect } from "react-redux";

import { CustomCheckbox, SearchInput } from "components";
import { homeSelector } from "redux/selectors/homeSelector";
import { categorySelector } from "redux/selectors/categorySelector";

import { CONFERENCE_SETTING, PROFILE_SETTINGS } from "enum";

import "./style.scss";

const SessionType = [...CONFERENCE_SETTING.SESSION_TYPE];

const FilterPanel = ({
  title,
  allCategories,
  onChange,
  onSearch,
  filters,
  view,
  userProfile,
}) => {
  const [filterValues, setFilterValues] = useState(filters);

  const onFilterChange = (field, values) => {
    const newFilter = {
      ...filterValues,
      [field.toLowerCase()]: JSON.stringify(values),
    };
    setFilterValues(newFilter);
    onChange(newFilter);
  };

  useEffect(() => {
    setFilterValues(filters);
  }, [filters]);

  return (
    <div className="global-conference-filter-panel">
      <h2 className="font-regular">{title}</h2>
      <div className="global-conference-filter-panel-content">
        <div className="search-filter">
          <h5 className="search-filter-title font-bold">Search</h5>
          <SearchInput
            onSearch={
              view === "talent-marketplace" &&
              userProfile.memberShip === "premium"
                ? onSearch
                : () => {}
            }
          />
          <h5 className="search-filter-title font-bold">
            {view === "my-talent-marketplace-profile" ||
            view === "talent-marketplace"
              ? "Job Levels"
              : "Sessions"}
          </h5>

          {view === "my-talent-marketplace-profile" ||
          view === "talent-marketplace" ? (
            <>
              <Checkbox.Group
                value={
                  filterValues["joblevels"]
                    ? JSON.parse(filterValues["joblevels"])
                    : []
                }
                style={{ marginBottom: "30px" }}
                onChange={(values) => onFilterChange("joblevels", values)}
              >
                {PROFILE_SETTINGS.JOB_LEVELS.map((item) => (
                  <CustomCheckbox
                    key={item.value}
                    value={item.value}
                    size="sm"
                    disabled={
                      (view === "my-talent-marketplace-profile" ||
                        view === "talent-marketplace") &&
                      userProfile.memberShip !== "premium"
                    }
                  >
                    {item.label}
                  </CustomCheckbox>
                ))}
              </Checkbox.Group>
              <h5 className="search-filter-title font-bold">Location</h5>
              <Checkbox.Group
                value={
                  filterValues["location"]
                    ? JSON.parse(filterValues["location"])
                    : []
                }
                style={{ marginBottom: "30px" }}
                onChange={(values) => onFilterChange("location", values)}
              >
                {PROFILE_SETTINGS.LOCATIONS.map((location) => (
                  <CustomCheckbox
                    key={location.value}
                    value={location.value}
                    size="sm"
                    disabled={
                      (view === "my-talent-marketplace-profile" ||
                        view === "talent-marketplace") &&
                      userProfile.memberShip !== "premium"
                    }
                  >
                    {location.label}
                  </CustomCheckbox>
                ))}
              </Checkbox.Group>
            </>
          ) : (
            <Checkbox.Group
              value={
                filterValues["sessions"]
                  ? JSON.parse(filterValues["sessions"])
                  : []
              }
              style={{ marginBottom: "30px" }}
              onChange={(values) => onFilterChange("Sessions", values)}
            >
              {SessionType.map((item) => (
                <CustomCheckbox key={item.value} value={item.value} size="sm">
                  {item.text}
                </CustomCheckbox>
              ))}
            </Checkbox.Group>
          )}
          <h5 className="search-filter-title font-bold">
            {view === "my-talent-marketplace-profile" ||
            view === "talent-marketplace"
              ? "Areas of interest"
              : "Categories"}
          </h5>
          <Checkbox.Group
            value={
              filterValues["categories"]
                ? JSON.parse(filterValues["categories"])
                : []
            }
            onChange={(values) => onFilterChange("Categories", values)}
          >
            {allCategories.map((item) => (
              <CustomCheckbox
                key={item.value}
                value={item.value}
                size="sm"
                disabled={
                  (view === "my-talent-marketplace-profile" ||
                    view === "talent-marketplace") &&
                  userProfile.memberShip !== "premium"
                }
              >
                {item.title}
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
  filters: PropTypes.object,
  view: PropTypes.string,
};

FilterPanel.defaultProps = {
  title: "Filters",
  onChange: () => {},
  onSearch: () => {},
  onClickPodcastSeries: () => {},
  filters: {},
  view: "",
};

const mapStateToProps = (state) => ({
  allCategories: categorySelector(state).categories,
  userProfile: homeSelector(state).userProfile,
});

export default connect(mapStateToProps)(FilterPanel);
