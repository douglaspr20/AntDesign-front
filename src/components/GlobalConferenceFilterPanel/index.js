import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "antd";
import { connect } from "react-redux";

import { CustomButton, CustomCheckbox, SearchInput } from "components";
import { homeSelector } from "redux/selectors/homeSelector";
import { categorySelector } from "redux/selectors/categorySelector";

import { CONFERENCE_SETTING } from "enum";

import "./style.scss";
import { CheckOutlined } from "@ant-design/icons";
import moment from "moment";

const SessionType = [...CONFERENCE_SETTING.SESSION_TYPE];

const FilterPanel = ({
  title,
  allCategories,
  onChange,
  onSearch,
  filters,
  view,
  userProfile,
  onAttend,
  onInviteColleague,
  setModalRequirementsVisible,
  setModalVisibleWelcomingMessage,
  downloadPdf,
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
      {userProfile.attendedToConference ? (
        <>
          <div className="attending-label">
            <CheckOutlined />
            <span>I'm attending</span>
          </div>
          <CustomButton
            className="not-going-button"
            text="Not attending"
            size="xs"
            type="remove"
            remove={true}
            onClick={onAttend}
          />
          <CustomButton
            size="xs"
            text="Invite Your Colleagues"
            style={{ padding: "0px 28px" }}
            onClick={onInviteColleague}
          />
        </>
      ) : (
        <CustomButton
          size="xs"
          text="Attend the conference"
          onClick={onAttend}
        />
      )}
      <div className="button-containers" style={{ marginBottom: "10px" }}>
        <CustomButton
          text="Accessibility Requirements"
          size="xs"
          type="info"
          className="button-requirements"
          onClick={() => setModalRequirementsVisible(true)}
        />

        <CustomButton
          text="Welcoming Message"
          size="xs"
          style={{ padding: "0px 35px", marginTop: "12px" }}
          onClick={() => setModalVisibleWelcomingMessage(true)}
        />
        <CustomButton
          size="xs"
          type="primary"
          text="Download Full Schedule"
          style={{ marginTop: "12px", padding: "0px 22px" }}
          onClick={() => downloadPdf("conference-schedule")}
        />
        {view === "personal-agenda" && (
          <>
            <CustomButton
              size="xs"
              text="Download Personalized Agenda"
              style={{ marginTop: "12px", padding: "0px 0px" }}
              onClick={() => downloadPdf("personal-agenda")}
            />

            {moment().date() >= 7 &&
              moment().month() >= 2 &&
              moment().year >= 2022 && (
                <CustomButton
                  size="xs"
                  text="Download Report Sessions Joined"
                  style={{ marginTop: "12px", padding: "0px 0px" }}
                  onClick={() => downloadPdf("report-sessions-joined")}
                />
              )}
          </>
        )}
      </div>
      <h2 className="font-regular">{title}</h2>
      <div className="global-conference-filter-panel-content">
        <div className="search-filter">
          <h5 className="search-filter-title font-bold">Search</h5>
          <SearchInput onSearch={onSearch} />
          <h5 className="search-filter-title font-bold">Sessions</h5>

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

          <h5 className="search-filter-title font-bold">Categories</h5>
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
