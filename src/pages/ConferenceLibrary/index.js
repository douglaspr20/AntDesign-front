import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import { useParams } from "react-router-dom";
import { isEmpty } from "lodash";

import ConferenceLibraryFilterDrawer from "./ConferenceLibraryFilterDrawer";
import { numberWithCommas } from "utils/format";
import { ConferenceCard, CustomButton, Tabs } from "components";
import ConferenceLibraryFilterPanel from "containers/ConferenceLibraryFilterPanel";
import { SETTINGS } from "enum";
import {
  getMoreConferenceLibraries,
  searchConferenceLibraries,
} from "redux/actions/conference-actions";
import {
  getAdvertisementsTodayByPage,
  getAdvertisementById,
} from "redux/actions/advertisment-actions";
import { advertisementSelector } from "redux/selectors/advertisementsSelector";
import { conferenceSelector } from "redux/selectors/conferenceSelector";

import IconLoadingMore from "images/icon-loading-more.gif";

import "./style.scss";

const ConferenceLibrary = ({
  loading,
  allConferenceLibraries,
  getMoreConferenceLibraries,
  searchConferenceLibraries,
  getAdvertisementsTodayByPage,
  getAdvertisementById,
  advertisementsByPage,
  advertisementById,
  isAdPreview = false,
}) => {
  const [filters, setFilters] = useState({});
  const [visible, setVisible] = useState(false);
  const [currentTab, setCurrentTab] = useState("0");
  const [countOfResults, setCountOfResults] = useState(0);
  const [meta, setMeta] = useState("");
  const [listOfYears, setListOfYears] = useState([2020]);
  const { id } = useParams();

  useEffect(() => {
    if (isAdPreview) {
      getAdvertisementById(id);
    } else {
      getAdvertisementsTodayByPage("conference-library");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const displayAds = !isEmpty(advertisementsByPage["conference-library"]) && (
    <div className="conference-library-advertisement-wrapper">
      {advertisementsByPage["conference-library"].map((advertisement) => {
        return (
          <div
            className="conference-library-advertisement-wrapper-content"
            key={advertisement.id}
          >
            <div
              className="advertisement"
              onClick={() =>
                window.open(advertisement.advertisementLink, "_blank")
              }
            >
              <img
                src={advertisement.adContentLink}
                alt="advertisement"
                className="advertisement-img"
              />
            </div>
          </div>
        );
      })}
    </div>
  );

  const displayPreviewAd = isAdPreview && (
    <div className="conference-library-advertisement-wrapper-preview">
      <div className="advertisement">
        <img
          src={advertisementById.adContentLink}
          alt="advertisement"
          className="advertisement-img"
        />
      </div>
    </div>
  );

  const onShowMore = () => {
    getMoreConferenceLibraries(
      {
        ...filters,
        page: allConferenceLibraries?.[+currentTab].currentPage + 1,
        meta,
      },
      [listOfYears[+currentTab]],
      +currentTab
    );
  };

  const onFilterChange = (filters) => {
    searchConferenceLibraries(
      {
        ...filters,
        meta,
      },
      listOfYears
    );
    setFilters(filters);
  };

  const onSearch = (value) => {
    searchConferenceLibraries(
      {
        ...filters,
        meta: value,
      },
      listOfYears
    );
    setMeta(value);
  };

  useEffect(() => {
    const getListOfYears = (startYear) => {
      const currentYear = new Date().getFullYear();
      const years = [];

      while (startYear <= currentYear) {
        years.push(startYear++);
      }

      return years;
    };

    const listOfYears = getListOfYears(2020);
    setListOfYears(listOfYears.reverse());
    searchConferenceLibraries({}, listOfYears);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCountOfResults(allConferenceLibraries[+currentTab]?.count || 0);

    // eslint-disable-next-line
  }, [currentTab, allConferenceLibraries]);

  const displayData = (index) => {
    const libraries = allConferenceLibraries[index]?.rows || [];

    return libraries.map((item, indx) => {
      let frequency = 0;

      if (item.meta && meta) {
        frequency = [...item.meta.toLowerCase().matchAll(meta)].length;
      }

      return (
        <ConferenceCard
          listOfYearsIndex={index}
          key={indx}
          data={item}
          keyword={meta}
          frequency={frequency}
        />
      );
    });
  };

  const TabData =
    listOfYears?.map((year, index) => {
      return {
        title: year,
        content: () => (
          <div className="search-results-list">{displayData(index)}</div>
        ),
      };
    }) || [];

  return (
    <div className="conference-library-page">
      <ConferenceLibraryFilterPanel
        onChange={onFilterChange}
        onSearch={onSearch}
      />
      <ConferenceLibraryFilterDrawer
        visible={visible}
        onClose={() => setVisible(false)}
        onChange={onFilterChange}
        onSearch={setMeta}
      />
      <div className="search-results-container">
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
        <div className="conference-library-content">
          <div>
            <Tabs
              data={TabData}
              current={currentTab}
              onChange={setCurrentTab}
            />
            {allConferenceLibraries[+currentTab]?.currentPage *
              SETTINGS.MAX_SEARCH_ROW_NUM <
              allConferenceLibraries[+currentTab]?.count && (
              <div className="conference-library-footer d-flex justify-center items-center">
                {loading && (
                  <div className="conference-library-page-loading-more">
                    <img src={IconLoadingMore} alt="loading-more-img" />
                  </div>
                )}
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
          {displayAds}
          {displayPreviewAd}
        </div>
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
  ...advertisementSelector(state),
});

const mapDispatchToProps = {
  getMoreConferenceLibraries,
  searchConferenceLibraries,
  getAdvertisementsTodayByPage,
  getAdvertisementById,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConferenceLibrary);
