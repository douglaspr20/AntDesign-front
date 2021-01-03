import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import clsx from "clsx";

import FilterPanel from "./FilterPanel";
import FilterDrawer from "./FilterDrawer";
import { numberWithCommas } from "utils/format";
import { CustomSelect, LibraryCard, CustomButton } from "components";
import Emitter from "services/emitter";
import { EVENT_TYPES } from "enum";
import { homeSelector } from "redux/selectors/homeSelector";

import IconLoadingMore from "images/icon-loading-more.gif";

import "./style.scss";

const Library = {
  title: "How to improve your soft skills",
  image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  description:
    "Praesent eu dolor eu orci vehicula euismod. Vivamus sed sollicitudin libero, vel malesuada velit. Nullam et maximus lorem. Suspendisse maximus dolor quis el malesuada velit sollicitudin vehicula sollicitudin libero vel malesuada velit",
  article: 1,
};

const LibraryData = Array.from(Array(12).keys()).map((item) => ({
  id: item,
  ...Library,
}));

const SortOptions = [
  {
    value: "newest-first",
    text: "Newest first",
  },
  {
    value: "newest-last",
    text: "Newest last",
  },
  {
    value: "sort-name",
    text: "Sort by name",
  },
  {
    value: "sort-type",
    text: "Sort by type",
  },
];

const LearningLibraryPage = ({ planUpdated }) => {
  const [data, setData] = useState(LibraryData);
  const [loading, setLoading] = useState(false);
  const [sortValue, setSortValue] = useState(SortOptions[0].value);

  const onShowMore = () => {
    setLoading(true);
    setTimeout(() => {
      setData([...data, ...LibraryData]);
      setLoading(false);
    }, 3000);
  };

  const planUpdate = () => {
    Emitter.emit(EVENT_TYPES.OPEN_PAYMENT_MODAL);
  };

  const showFilterPanel = () => {
    Emitter.emit(EVENT_TYPES.OPEN_FILTER_PANEL);
  };

  return (
    <div className="learning-library-page">
      <FilterPanel />
      <FilterDrawer />
      <div className="search-results-container">
        <Row>
          <Col span={24}>
            <div className="search-results-container-mobile-header">
              <h3
                className={clsx("filters-btn", { disabled: !planUpdated })}
                onClick={() => planUpdated && showFilterPanel()}
              >
                Filters
              </h3>
              <h3>{`${numberWithCommas(1234)} results`}</h3>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className="search-results-container-header d-flex justify-between items-center">
              <h3>{`${numberWithCommas(1234)} results`}</h3>
              <CustomSelect
                className="search-results-container-sort"
                bordered={false}
                options={SortOptions}
                value={sortValue}
                onChange={(value) => setSortValue(value)}
              />
            </div>
          </Col>
        </Row>
        <div className="search-results-list">
          {data.map((item, index) => (
            <LibraryCard
              key={index}
              data={item}
              onClickAccess={planUpdate}
              locked={!planUpdated}
            />
          ))}
        </div>
        <div className="search-results-container-footer d-flex justify-center items-center">
          {loading && <img src={IconLoadingMore} alt="loading-more-img" />}
          {!loading && (
            <CustomButton
              text="Show more"
              type="primary outlined"
              size="lg"
              disabled={!planUpdated}
              onClick={onShowMore}
            />
          )}
        </div>
      </div>
    </div>
  );
};

LearningLibraryPage.propTypes = {
  title: PropTypes.string,
};

LearningLibraryPage.defaultProps = {
  title: "",
};

const mapStateToProps = (state, props) => ({
  planUpdated: homeSelector(state).planUpdated,
});

export default connect(mapStateToProps)(LearningLibraryPage);
