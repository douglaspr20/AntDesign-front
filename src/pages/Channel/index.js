import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import isEmpty from "lodash/isEmpty";

import { Tabs, CustomButton } from "components";
import { INTERNAL_LINKS, USER_ROLES } from "enum";
import ChannelFilterPanel from "./ChannelFilterPanel";
import ResourcesList from "./ResourcesList";
import PodcastsList from "./PodcastsList";
import EventsList from "./EventsList";

import { homeSelector } from "redux/selectors/homeSelector";
import { channelSelector } from "redux/selectors/channelSelector";
import {
  getChannel,
  setFollowChannel,
  unsetFollowChannel,
} from "redux/actions/channel-actions";

import IconBack from "images/icon-back.svg";

import "./style.scss";

const Channel = ({
  match,
  history,
  selectedChannel,
  channelLoading,
  userProfile,
  getChannel,
  setFollowChannel,
  unsetFollowChannel,
}) => {
  const { search } = useLocation();
  const query = new URLSearchParams(search)

  const [currentTab, setCurrentTab] = useState(query.get('tab') || '0');
  const [isChannelOwner, setIsChannelOwner] = useState(true);
  const [filter, setFilter] = useState({});
  const [followed, setFollowed] = useState(false);

  const onFilterChange = (values) => {
    setFilter(values);
  };

  const followChannel = () => {
    if (followed) {
      unsetFollowChannel(selectedChannel);
    } else {
      setFollowChannel(selectedChannel);
    }
  };

  const TabData = [
    {
      title: "Resources",
      content: () => (
        <ResourcesList
          type="article"
          refresh={currentTab === "0"}
          filter={filter}
          isOwner={isChannelOwner}
        />
      ),
    },
    {
      title: "Podcasts",
      content: () => <PodcastsList isOwner={isChannelOwner} filter={filter} />,
    },
    {
      title: "Videos",
      content: () => (
        <ResourcesList
          refresh={currentTab === "2"}
          type="video"
          filter={filter}
          isOwner={isChannelOwner}
        />
      ),
    },
    {
      title: "Events",
      content: () => <EventsList isOwner={isChannelOwner} filter={filter} />,
    },
  ];

  useEffect(() => {
    if (userProfile && selectedChannel) {
      setIsChannelOwner(
        userProfile.role === USER_ROLES.CHANNEL_ADMIN &&
          !!userProfile.channel &&
          userProfile.channel === selectedChannel.id
      );
      setFollowed(
        (selectedChannel.followedUsers || []).includes(userProfile.id)
      );
    }
  }, [userProfile, selectedChannel]);

  useEffect(() => {
    let isMounted = true;
    if (match.params.id) {
      getChannel(match.params.id, (error) => {
        if (isMounted && error) {
          history.push(INTERNAL_LINKS.NOT_FOUND);
        }
      });
    }

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="channel-page">
      <ChannelFilterPanel onChange={onFilterChange} />
      <div className="channel-page__container">
        <div className="channel-page__results">
          <div className="channel-page__row">
            <div className="channel-page__info-column">
              {isChannelOwner ? (
                <div className="channel-page__space" />
              ) : (
                <CustomButton
                  htmlType="button"
                  text={followed ? "Followed" : "Follow Channel"}
                  type={followed ? "secondary" : "primary"}
                  size="md"
                  loading={channelLoading}
                  onClick={followChannel}
                />
              )}
              {!isEmpty(selectedChannel) && (
                <>
                  <div className="channel-info__user">
                    {selectedChannel.image ? (
                      <img src={selectedChannel.image} alt="user-icon" />
                    ) : (
                      <div />
                    )}
                  </div>
                  <div className="channel-info__general-info">
                    <h3 className="channel-info__name text-center">
                      {selectedChannel.name}
                    </h3>
                    <p className="channel-info__description text-center">
                      {selectedChannel.description}
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="channel-page__content">
              <Link to={INTERNAL_LINKS.CHANNELS}>
                <div className="channel-page__content-top">
                  <div className="channel-page__content-top-back">
                    <img src={IconBack} alt="icon-back" />
                  </div>
                  <h4>Back to Channels</h4>
                </div>
              </Link>
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
  );
};

const mapStateToProps = (state, props) => ({
  selectedChannel: channelSelector(state).selectedChannel,
  channelLoading: channelSelector(state).loading,
  userProfile: homeSelector(state).userProfile,
  updateEvent: channelSelector(state).selectedChannel
});

const mapDispatchToProps = {
  getChannel,
  setFollowChannel,
  unsetFollowChannel,
};

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
