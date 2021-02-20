import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col } from "antd";

import ConferenceLibraryFilterDrawer from "./ConferenceLibraryFilterDrawer";
import { numberWithCommas } from "utils/format";
import { CustomSelect, ConferenceCard, CustomButton } from "components";
import ConferenceLibraryFilterPanel from "containers/ConferenceLibraryFilterPanel";
import Emitter from "services/emitter";
import { EVENT_TYPES, SETTINGS } from "enum";
import {
  getMoreLibraries,
  searchLibraries,
} from "redux/actions/library-actions";
import { librarySelector } from "redux/selectors/librarySelector";

import IconLoadingMore from "images/icon-loading-more.gif";

import "./style.scss";

const SortOptions = SETTINGS.SORT_OPTIONS;

const ConferenceLibrary = ({
  loading,
  countOfResults,
  currentPage,
  allLibraries,
  getMoreLibraries,
  searchLibraries,
}) => {
  const [sortValue, setSortValue] = useState(SortOptions[0].value);
  const [filters, setFilters] = useState({});

  const onShowMore = () => {
    getMoreLibraries({
      ...filters,
      page: currentPage + 1,
      order: sortValue,
    });
  };

  const showFilterPanel = () => {
    Emitter.emit(EVENT_TYPES.OPEN_FILTER_PANEL);
  };

  const onFilterChange = (filters) => {
    searchLibraries(filters, sortValue);
    setFilters(filters);
  };

  const onSortChange = (value) => {
    setSortValue(value);
    searchLibraries(filters, value);
  };

  useEffect(() => {
    searchLibraries({}, sortValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="conference-library-page">
      <ConferenceLibraryFilterPanel onChange={onFilterChange} />
      {/* <ConferenceLibraryFilterDrawer onChange={onFilterChange} /> */}
      <div className="search-results-container">
        <Row>
          <Col span={24}>
            <div className="conference-library-page-about">
              <h2 className="about-title">About the conference library</h2>
              <p className="about-content">
                Developing Talent & Leadership behaviors. Positive Design
                Thinking & Strategy through Positive Leadership Strategy and
                POSITIVE & AGILE coaching | 2 hack habits, goal achievement, and
                behavior transformation in organizations, sports clubs, PYMES,
                and corporations.
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className="search-results-container-mobile-header">
              <h3
                className="filters-btn"
                onClick={showFilterPanel}
              >
                Filters
              </h3>
              <h3>{`${numberWithCommas(countOfResults)} video${
                countOfResults > 1 ? "s" : ""
              }`}</h3>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className="search-results-container-header d-flex justify-between items-center">
              <h3>{`${numberWithCommas(countOfResults)} video${
                countOfResults > 1 ? "s" : ""
              }`}</h3>
              <CustomSelect
                className="search-results-container-sort"
                bordered={false}
                options={SortOptions}
                value={sortValue}
                onChange={(value) => onSortChange(value)}
              />
            </div>
          </Col>
        </Row>
        <div className="search-results-list">
          {allLibraries.map((item, index) => (
            <ConferenceCard key={index} data={item} />
          ))}
        </div>
        {currentPage * SETTINGS.MAX_SEARCH_ROW_NUM < countOfResults && (
          <div className="search-results-container-footer d-flex justify-center items-center">
            {loading && <img src={IconLoadingMore} alt="loading-more-img" />}
            {!loading && (
              <CustomButton
                text="Show more"
                type="primary outlined"
                size="lg"
                onClick={onShowMore}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

ConferenceLibrary.propTypes = {
  title: PropTypes.string,
};

ConferenceLibrary.defaultProps = {
  title: "",
};

const mapStateToProps = (state, props) => ({
  loading: librarySelector(state).loading,
  allLibraries: librarySelector(state).allLibraries,
  countOfResults: librarySelector(state).countOfResults,
  currentPage: librarySelector(state).currentPage,
});

const mapDispatchToProps = {
  getMoreLibraries,
  searchLibraries,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConferenceLibrary);
