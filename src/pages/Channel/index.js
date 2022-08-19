import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import isEmpty from "lodash/isEmpty";

import { Tabs, CustomButton } from "components";
import { INTERNAL_LINKS, USER_ROLES } from "enum";
// import ChannelFilterPanel from "./ChannelFilterPanel";
import ResourcesList from "./ResourcesList";
import PodcastsList from "./PodcastsList";
import EventsList from "./EventsList";
import BlogList from "./BlogsList";

import { homeSelector } from "redux/selectors/homeSelector";
import { channelSelector } from "redux/selectors/channelSelector";
import {
  setFollowChannel,
  unsetFollowChannel,
  getChannelForName
} from "redux/actions/channel-actions";

import IconBack from "images/icon-back.svg";

import "./style.scss";

const Channel = ({
  match,
  history,
  selectedChannel,
  channelLoading,
  userProfile,
  setFollowChannel,
  unsetFollowChannel,
  getChannelForName
}) => {
  const selectDiv = useRef()
  const firstSelect = useRef()
  const contentBackground = useRef() 
  const { search, pathname } = useLocation();
  const query = new URLSearchParams(search);

  const [currentTab, setCurrentTab] = useState(query.get("tab") || "0");
  const [isChannelOwner, setIsChannelOwner] = useState(true);
  const [heightData, setHeightData] = useState(`0px`)
  const [tabData, setTabData] = useState(0)
  // const [filter, setFilter] = useState({});
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    if (query.get("tab") === "blogs") {
      setCurrentTab("4");
      history.replace({
        pathname: pathname,
        search: "",
      });
    }
  }, [query, history, pathname]);

  // const onFilterChange = (values) => {
  //   setFilter(values);
  // };

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
          // filter={filter}
          isOwner={isChannelOwner}
        />
      ),
    },
    {
      title: "Podcasts",
       content: () => <PodcastsList isOwner={isChannelOwner} 
        // filter={filter} 
       />,
    },
    {
      title: "Videos",
      content: () => (
        <ResourcesList
          refresh={currentTab === "2"}
          type="video"
          // filter={filter}
          isOwner={isChannelOwner}
        />
      ),
    },
    {
      title: "Events",
      content: () => <EventsList isOwner={isChannelOwner} 
      // filter={filter} 
      />,
    },
    {
      title: "Blogs",
      content: () => <BlogList isOwner={isChannelOwner} />,
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

  // useEffect(() => {
  //   let isMounted = true;
  //   if (match.params.id) {
  //     getChannel(match.params.id, (error) => {
  //       if (isMounted && error) {
  //         history.push(INTERNAL_LINKS.NOT_FOUND);
  //       }
  //     });
  //   }

  //   return () => {
  //     isMounted = false;
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const fixNameUrl = (name) => {

    let spaces = name.split("-").length - 1
    let newTitle = name

    for(let i = 0; i < Number(spaces) ; i++){
      newTitle = newTitle.replace("-"," ")
    }
    return newTitle
  }

  useEffect(() => {
      let isMounted = true;
      let pathNameFixed = pathname.substring(1,pathname.length)
      
      if (pathname) {
        getChannelForName( fixNameUrl(pathNameFixed) , (error) => {
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

  const selectTabs = (e, index) => {
    setTabData(index)
    selectDiv.current.style.cssText = `left: ${e.target.offsetLeft}px; width: ${e.target.clientWidth}px;`
  }

  useEffect(() => {
    if(contentBackground.current){
      setHeightData(`${Number(contentBackground.current.clientHeight) + 15}px`)
    }
  }, [contentBackground])

  return (
    <div className="channel-page">
      {/* <ChannelFilterPanel onChange={onFilterChange} /> */}
      <div className="channel-page__container">
        <Link to={INTERNAL_LINKS.CHANNELS} >
          <div className="channel-page__content-top">
            <div className="channel-page__content-top-back">
              <img src={IconBack} alt="icon-back" />
            </div>
            <h4>Back to Channels</h4>
          </div>
        </Link>
        <div className="channel-page__results">
          <div className="channel-page__row" ref={contentBackground}>
            <div className="background-forms" style={{height: heightData}}>

            </div>
            <div className="channel-page__info-column">
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
                    <h2 className="channel-info__name">
                      {selectedChannel.name}
                    </h2>
                    <p className="channel-info__description">
                      {selectedChannel.description}
                    </p>
                    <div className="channel-info__topics">
                      <span>Channel Topics: </span>
                      <div className="container-topics">
                        {selectedChannel?.categories?.map((category) => (
                          <div className="container-category">{category}</div>
                        ))}
                      </div>
                    </div>
                    <CustomButton
                      htmlType="button"
                      text={followed ? "Followed" : "Follow Channel"}
                      type={followed ? "secondary" : "primary"}
                      size="md"
                      style={{marginLeft: "30px"}}
                      loading={channelLoading}
                      onClick={followChannel}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="channel-page__content">
              <div className="tabs-channels">
                <p 
                  ref={firstSelect}
                  className={(tabData === 0) ? "select" : ""}
                  onClick={(e) => {selectTabs( e , 0 )}}
                >Home</p>
                <p 
                  className={(tabData === 1) ? "select" : ""}
                  onClick={(e) => {selectTabs( e , 1 )}}
                >Resources</p>
                <p 
                  className={(tabData === 2) ? "select" : ""}
                  onClick={(e) => {selectTabs( e , 2 )}}
                >Podcasts</p>
                <p 
                  className={(tabData === 3) ? "select" : ""}
                  onClick={(e) => {selectTabs( e , 3 )}}
                >Videos</p>
                <p 
                  className={(tabData === 4) ? "select" : ""}
                  onClick={(e) => {selectTabs( e , 4 )}}
                >Events</p>
                <p 
                  className={(tabData === 5) ? "select" : ""}
                  onClick={(e) => {selectTabs( e , 5 )}}
                >Blogs</p>
                <div className="box-select" ref={selectDiv} style={{left: "15px", width: "80px"}}></div>
              </div>
              {(tabData === 0) &&
                <div>
                  <div className="card-content-home" style={{height: "475px"}}>
                    <h3>Resources</h3>
                    <ResourcesList
                      type="article"
                      refresh={currentTab === "0"}
                      isOwner={isChannelOwner}
                    />
                  </div>
                  <div className="card-content-home" style={{height: "475px"}}>
                    <h3>Podcasts</h3>
                    <PodcastsList 
                      isOwner={isChannelOwner} 
                    />
                  </div>
                  <div className="card-content-home" style={{height: "475px"}}>
                    <h3>Videos</h3>
                    <ResourcesList
                      type="video"
                      refresh={currentTab === "0"}
                      isOwner={isChannelOwner}
                    />
                  </div>
                  <div className="card-content-home" style={{height: "540px"}}>
                    <h3>Events</h3>
                    <EventsList 
                      isOwner={isChannelOwner}
                    />
                  </div>
                  <div className="card-content-home" style={{height: "475px"}}>
                    <h3>Blogs</h3>
                    <BlogList
                      isOwner={isChannelOwner}
                    />
                  </div>
                </div>
              }
              {/* <Tabs
                data={TabData}
                current={currentTab}
                onChange={setCurrentTab}
              /> */}
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
  updateEvent: channelSelector(state).selectedChannel,
});

const mapDispatchToProps = {
  getChannelForName,
  setFollowChannel,
  unsetFollowChannel,
};

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
