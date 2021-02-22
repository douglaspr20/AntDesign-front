import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col } from "antd";

import ConferenceLibraryFilterDrawer from "./ConferenceLibraryFilterDrawer";
import { numberWithCommas } from "utils/format";
import { ConferenceCard, CustomButton } from "components";
import ConferenceLibraryFilterPanel from "containers/ConferenceLibraryFilterPanel";
import { SETTINGS } from "enum";
import {
  getMoreConferenceLibraries,
  searchConferenceLibraries,
} from "redux/actions/conference-actions";
import { conferenceSelector } from "redux/selectors/conferenceSelector";

import IconLoadingMore from "images/icon-loading-more.gif";

import "./style.scss";

const ConferenceLibrary = ({
  loading,
  countOfResults,
  currentPage,
  allConferenceLibraries,
  getMoreConferenceLibraries,
  searchConferenceLibraries,
}) => {
  const [filters, setFilters] = useState({});
  const [visible, setVisible] = useState(false);

  const onShowMore = () => {
    getMoreConferenceLibraries({
      ...filters,
      page: currentPage + 1,
    });
  };

  const onFilterChange = (filters) => {
    searchConferenceLibraries(filters);
    setFilters(filters);
  };

  useEffect(() => {
    searchConferenceLibraries({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="conference-library-page">
      <ConferenceLibraryFilterPanel onChange={onFilterChange} />
      <ConferenceLibraryFilterDrawer
        visible={visible}
        onClose={() => setVisible(false)}
        onChange={onFilterChange}
      />
      <div className="search-results-container">
        {/* <Row>
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
        </Row> */}
        <Row>
          <Col span={24}>
            <div className="search-results-container-mobile-header">
              <h3 className="filters-btn" onClick={() => setVisible(true)}>
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
            </div>
          </Col>
        </Row>
        <div className="search-results-list">
          {allConferenceLibraries.map((item, index) => (
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
  loading: conferenceSelector(state).loading,
  allConferenceLibraries: conferenceSelector(state).allConferenceLibraries,
  countOfResults: conferenceSelector(state).countOfResults,
  currentPage: conferenceSelector(state).currentPage,
});

const mapDispatchToProps = {
  getMoreConferenceLibraries,
  searchConferenceLibraries,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConferenceLibrary);
