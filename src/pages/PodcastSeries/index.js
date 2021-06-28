import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";

import { PodcastFilterPanel, PodcastSeriesCard } from "components";
import { INTERNAL_LINKS } from "enum";
import { getAllPodcastSeries } from "redux/actions/podcast-actions";
import { podcastSelector } from "redux/selectors/podcastSelector";

import { numberWithCommas } from "utils/format";

import "./style.scss";

const PodcastSeries = ({ history, allPodcastSeries, getAllPodcastSeries }) => {
  const onCardClick = (podcastSeries) => {
    history.push(`${INTERNAL_LINKS.PODCAST_SERIES}/${podcastSeries.id}`);
  };

  useEffect(() => {
    getAllPodcastSeries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="podcast-series-page">
      <PodcastFilterPanel hidePodcastSeries />
      <div className="podcast-series-page-container">
        <div className="search-results-container">
          <Row>
            <Col span={24}>
              <div className="search-results-container-header d-flex justify-between items-center">
                <h3>{`${numberWithCommas(allPodcastSeries.length)} result${
                  allPodcastSeries.length > 1 ? "s" : ""
                }`}</h3>
              </div>
            </Col>
          </Row>
          <div className="podcast-series-list">
            {allPodcastSeries.map((ps) => (
              <PodcastSeriesCard
                key={ps.id}
                data={ps}
                onClick={() => onCardClick(ps)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  allPodcastSeries: podcastSelector(state).allPodcastSeries,
});

const mapDispatchToProps = {
  getAllPodcastSeries,
};

export default connect(mapStateToProps, mapDispatchToProps)(PodcastSeries);
