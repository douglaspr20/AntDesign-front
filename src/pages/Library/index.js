import React, { useState } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";

import FilterPanel from "./FilterPanel";
import { numberWithCommas } from "utils/format";
import { CustomSelect, LibraryCard, CustomButton } from "components";
import Emitter from "services/emitter";
import { EVENT_TYPES } from "enum";

import IconLoadingMore from "images/icon-loading-more.gif";

import "./style.scss";

const Library = {
  title: "How to improve your soft skills",
  image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  description:
    "Praesent eu dolor eu orci vehicula euismod. Vivamus sed sollicitudin libero, vel malesuada velit. Nullam et maximus lorem. Suspendisse maximus dolor quis el malesuada velit sollicitudin vehicula sollicitudin libero vel malesuada velit",
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

const LearningLibraryPage = () => {
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

  return (
    <div className="learning-library-page">
      <FilterPanel />
      <div className="search-results-container">
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
        <Row gutter={[62, 36]}>
          {data.map((item) => (
            <Col
              key={item.id}
              lg={{ span: 12 }}
              xl={{ span: 8 }}
              xxl={{ span: 6 }}
            >
              <LibraryCard data={item} onClickAccess={planUpdate} />
            </Col>
          ))}
        </Row>
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

export default LearningLibraryPage;
