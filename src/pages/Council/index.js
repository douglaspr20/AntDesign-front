import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Col, Row } from "antd";

import { homeSelector } from "redux/selectors/homeSelector";
import { councilSelector } from "redux/selectors/councilSelector";
import Emitter from "services/emitter";
import { EVENT_TYPES, INTERNAL_LINKS } from "enum";

import FilterDrawer from "pages/Library/FilterDrawer";
import { LibraryFilterPanel, Tabs } from "components";
import NoItemsMessageCard from "components/NoItemsMessageCard";
import CouncilMembers from "./CouncilMembers";
import CouncilList from "./CouncilList.js";
import CouncilEvents from './CouncilEvents'

import IconBack from "images/icon-back.svg";

import "./style.scss";

const CouncilPage = ({ userProfile, councilResources }) => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const [currentTab, setCurrentTab] = useState(query.get("tab") || "0");
  const [filter, setFilter] = useState({});

  const onFilterChange = (values) => {
    setFilter(values);
  };
  const TabData = [
    {
      title: "Resources",
      content: () => (
        <CouncilList
          type="article"
          refresh={currentTab === "0"}
          setCurrentValue={setCurrentTab}
          filter={filter}
        />
      ),
    },
    // {
    //   title: "Conversations",
    //   content: () => (
    //     <NoItemsMessageCard
    //       message={`There are no
    //     conversations
    //   for you at the moment`}
    //     />
    //   ),
    // },
    {
      title: "Council Members",
      content: () => <CouncilMembers />,
    },
    {
      title: "Events",
      content: () => <CouncilEvents />,
    },
  ];

  const showFilterPanel = () => {
    Emitter.emit(EVENT_TYPES.OPEN_FILTER_PANEL);
  };

  return (
    <>
      {userProfile.councilMember || userProfile.role === "admin" ? (
        <div className="council-page">
          <div className="council-filter-panel">
            <LibraryFilterPanel onChange={onFilterChange} />
          </div>
          <FilterDrawer onChange={onFilterChange} />
          <div className="search-results-container">
            <Row>
              <Col span={24}>
                <div className="search-results-container-mobile-header">
                  <h3 className="filters-btn" onClick={showFilterPanel}>
                    Filters
                  </h3>
                  {/* <h3>{`${numberWithCommas(countOfResults)} result${
                countOfResults > 1 ? "s" : ""
              }`}</h3> */}
                </div>
              </Col>
            </Row>
            <div className="council-page__container">
              <div className="council-page__results">
                <div className="council-page__row">
                  <div className="council-page__info-column"></div>
                  <div className="council-page__content">
                    <div className="council-filter-panel">
                      <Link to={INTERNAL_LINKS.HOME}>
                        <div className="council-page__content-top">
                          <div className="council-page__content-top-back">
                            <img src={IconBack} alt="icon-back" />
                          </div>
                          <h4>Back</h4>
                        </div>
                      </Link>
                    </div>
                    <Tabs
                      data={TabData}
                      current={currentTab}
                      onChange={setCurrentTab}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="council-page__list-wrap">
          <NoItemsMessageCard
            message={`You must be a council member to see this view.`}
          />
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state, props) => ({
  userProfile: homeSelector(state).userProfile,
  councilResources: councilSelector(state).councilResources,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CouncilPage);
