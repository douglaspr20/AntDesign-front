import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import Emitter from "services/emitter";
import { CustomSelect, SpeakersFilterPanel } from "components";
import SpeakerCard from "./SpeakerCard";
import FilterDrawer from "./FilterDrawer";
import { SETTINGS, EVENT_TYPES } from "enum";

import "./style.scss";

const SortOptions = SETTINGS.SORT_OPTIONS;

const speakersDefault = [
  {
    name: "Bill Gate",
    job: "Founder",
    enterprise: "Microsoft",
    image:
      "https://static.nationalgeographicla.com/files/styles/image_3200/public/20-01213_091420-bill-gates-goalkeepers-2020-science_alt.jpg?w=1600",
  },
  {
    name: "Marck Zuckemberg",
    job: "Co-Founding",
    enterprise: "Facebook Inc",
    image:
      "https://cdn.forbes.co/2020/05/Mark-Zuckerberg-Reuters-1280x720-1.jpg",
  },
  {
    name: "Jeff Bezos",
    job: "Enginer",
    enterprise: "Amazon Inc",
    image:
      "https://www.elcorreo.com/xlsemanal/wp-content/uploads/sites/5/2021/07/jeff-bezos-el-amo-del-mundo.jpg",
  },
  {
    name: "Elon Musk",
    job: "CEO",
    enterprise: "Tesla",
    image:
      "https://i1.wp.com/lanoticia.com/wp-content/uploads/2021/10/Elon-Musk-Tesla-muda-sus-sedes-a-Austin-Texas.jpg?fit=1200%2C800&ssl=1",
  },
];

const GlobalSpeakers = () => {
  const [sortValue, setSortValue] = useState(SortOptions[0].value);
  const [, setOrderValue] = useState('["createdAt","DESC"]');
  const [, setFilters] = useState({});
  const [, setMeta] = useState("");
  const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    const getSpeakers = () => {
      setSpeakers(speakersDefault);
    };

    getSpeakers();
  }, []);

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
            {speakers.map((speaker) => (
              <SpeakerCard speaker={speaker} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSpeakers;
