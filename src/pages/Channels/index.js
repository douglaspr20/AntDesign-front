import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";

import { CustomSelect } from "components";
import { SETTINGS, USER_ROLES } from "enum";
import ChannelDrawer from "containers/ChannelDrawer";

import ChannelsFilterPanel from "./ChannelsFilterPanel";
import ChannelCard from "./ChannelCard";
import { homeSelector } from "redux/selectors/homeSelector";
import { channelSelector } from "redux/selectors/channelSelector";
import { getFirstChannelList } from "redux/actions/channel-actions";
import { getUser } from "redux/actions/home-actions";

import { numberWithCommas } from "utils/format";

import "./style.scss";

const SortOptions = SETTINGS.SORT_OPTIONS;

const Channels = ({
  allChannels,
  countOfResults,
  userProfile,
  getFirstChannelList,
  getUser,
}) => {
  const [sortValue, setSortValue] = useState(SortOptions[0].value);
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

  const onChannelCreated = () => {
    setOpenChannelDrawer(false);
    getUser();
    getFirstChannelList({ order: sortValue });
  };

  useEffect(() => {
    getFirstChannelList({ order: sortValue });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="channels-page">
      <ChannelsFilterPanel onChange={onFilterChange} />
      <ChannelDrawer
        visible={openCannelDrawer}
        onClose={() => setOpenChannelDrawer(false)}
        onCreated={onChannelCreated}
      />
      <div className="channels-page__container">
        <div className="search-results-container">
          <Row>
            <Col span={24}>
              <div className="search-results-container-mobile-header">
                <h3 className="filters-btn">Filters</h3>
                <h3>
                  {allChannels.length} result
                  {allChannels.length > 1 ? "s" : ""}
                </h3>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className="search-results-container-header d-flex justify-between items-center">
                <h3>{`${numberWithCommas(countOfResults)} result${
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
          <div className="channels-list">
            {userProfile.role === USER_ROLES.CHANNEL_ADMIN &&
              !userProfile.channel && (
                <ChannelCard add={true} onClick={onCreateChannel} />
              )}
            {allChannels.map((chnl) => (
              <ChannelCard
                key={chnl.id}
                id={chnl.id}
                title={chnl.name}
                description={chnl.description}
                image={chnl.image}
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
  ...channelSelector(state),
});

const mapDispatchToProps = {
  getFirstChannelList,
  getUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
