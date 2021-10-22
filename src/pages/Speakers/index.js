import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import Emitter from "services/emitter";
import { CustomSelect, SpeakersFilterPanel } from "components";
import SpeakerCard from "./SpeakerCard";
import FilterDrawer from "./FilterDrawer";
import { sessionSelector } from "redux/selectors/sessionSelector";

import { SETTINGS, EVENT_TYPES } from "enum";
import { getAllSessions } from "redux/actions/session-actions";

import "./style.scss";
import { connect } from "react-redux";

const SortOptions = SETTINGS.SORT_OPTIONS;

const Speakers = ({ allSessions, history, match }) => {
  const [sortValue, setSortValue] = useState(SortOptions[0].value);
  const [, setOrderValue] = useState('["createdAt","DESC"]');
  const [, setFilters] = useState({});
  const [, setMeta] = useState("");
  const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    const getSpeakers = () => {
      if (allSessions.length <= 0) return history.push("/global-conference");
      const {
        params: { idConference },
      } = match;
      const currentSession = allSessions.find(
        (session) => session.id === parseInt(idConference)
      );

      setSpeakers(currentSession.speakers);
    };

    getSpeakers();
  }, [allSessions, match, history]);

  const onSortChange = (value) => {
    setSortValue(value);
    let order = "";
    switch (value) {
      case "newest-first":
        order = '["createdAt","DESC"]';
        break;
      case "newest-last":
        order = '["createdAt","ASC"]';
        break;
      case "sort-name":
        order = '["title","ASC"]';
        break;
      default:
      // default
    }
    setOrderValue(order);
  };

  const onFilterChange = (filter) => {
    setFilters(filter);
  };

  const onSearch = (value) => {
    setMeta(value);
  };

  const showFilterPanel = () => {
    Emitter.emit(EVENT_TYPES.OPEN_FILTER_PANEL);
  };

  if (allSessions.length <= 0) history.push("/global-conference");

  return (
    <div className="speakers-page">
      <SpeakersFilterPanel
        hidePodcastSeries
        onChange={onFilterChange}
        onSearch={onSearch}
      />
      <FilterDrawer onChange={onFilterChange} onSearch={setMeta} />
      <div className="speakers__container">
        <div className="search-results-container">
          <Row>
            <Col span={24}>
              <div className="search-results-container-mobile-header">
                <h3
                  className="filters-btn"
                  onClick={() => {
                    showFilterPanel();
                  }}
                >
                  Filters
                </h3>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className="search-results-container-header d-flex justify-between items-center">
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
          <div className="speakers-list">
            {speakers.length > 0 &&
              speakers.map((speaker) => (
                <SpeakerCard key={speaker.id} speaker={speaker} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...sessionSelector(state),
});

const mapDispatchToProps = {
  getAllSessions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Speakers);
