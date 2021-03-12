import React, { useState } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";

import { CustomSelect } from "components";
import { SETTINGS, USER_ROLES } from "enum";
import ChannelDrawer from "containers/ChannelDrawer";

import ChannelsFilterPanel from "./ChannelsFilterPanel";
import ChannelCard from "./ChannelCard";
import { homeSelector } from "redux/selectors/homeSelector";

import "./style.scss";

const SortOptions = SETTINGS.SORT_OPTIONS;

const Channels = ({ userProfile }) => {
  const [sortValue, setSortValue] = useState(SortOptions[0].value);
  const [channelsList] = useState([]);
  const [openCannelDrawer, setOpenChannelDrawer] = useState(false);

  const onFilterChange = (filter) => {
    console.log("Filter Change", filter);
  };

  const onSortChange = (value) => {
    setSortValue(value);
  };

  const onCreateChannel = () => {
    setOpenChannelDrawer(true);
  };

  return (
    <div className="channels-page">
      <ChannelsFilterPanel onChange={onFilterChange} />
      <ChannelDrawer
        visible={openCannelDrawer}
        onClose={() => setOpenChannelDrawer(false)}
      />
      <div className="channels-page__container">
        <div className="search-results-container">
          <Row>
            <Col span={24}>
              <div className="search-results-container-mobile-header">
                <h3 className="filters-btn">Filters</h3>
                <h3>
                  {channelsList.length} result
                  {channelsList.length > 1 ? "s" : ""}
                </h3>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className="search-results-container-header d-flex justify-between items-center">
                <h3>
                  {channelsList.length} result
                  {channelsList.length > 1 ? "s" : ""}
                </h3>
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
          <div className="channels-list">
            {userProfile.role === USER_ROLES.CHANNEL_ADMIN &&
              !userProfile.channel && (
                <ChannelCard add={true} onClick={onCreateChannel} />
              )}
            {channelsList.map((classItem) => (
              <ChannelCard
                key={classItem.id}
                id={classItem.id}
                title={classItem.title}
                description={classItem.description}
                image={classItem.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
