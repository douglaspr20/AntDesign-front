import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import isEmpty from "lodash/isEmpty";

import { CustomButton } from "components";
import { INTERNAL_LINKS, USER_ROLES } from "enum";
import ChannelDrawer from "containers/ChannelDrawer";
// import ChannelFilterPanel from "./ChannelFilterPanel";
import ResourcesList from "./ResourcesList";
import PodcastsList from "./PodcastsList";
import EventsList from "./EventsList";
import BlogList from "./BlogsList";
// import Followers from "./Followers";

import { getUser } from "redux/actions/home-actions";
import { homeSelector } from "redux/selectors/homeSelector";
import { channelSelector } from "redux/selectors/channelSelector";
import { categorySelector } from "redux/selectors/categorySelector";
import {
  setFollowChannel,
  unsetFollowChannel,
  getChannelForName
} from "redux/actions/channel-actions";
import { capitalizeWord } from "utils/format";

import IconBack from "images/icon-back.svg";

import "./style.scss";

const Channel = ({
  history,
  selectedChannel,
  channelLoading,
  userProfile,
  setFollowChannel,
  unsetFollowChannel,
  getChannelForName,
  allCategories,
}) => {
  const selectDiv = useRef()
  const firstSelect = useRef()
  const contentBackground = useRef() 
  const { pathname } = useLocation();
  // const query = new URLSearchParams(search);

  // const [currentTab, setCurrentTab] = useState(query.get("tab") || "0");
  const [isChannelOwner, setIsChannelOwner] = useState(true);
  const [heightData, setHeightData] = useState(`0px`)
  const [tabData, setTabData] = useState(0)
  const [type, setType] = useState(undefined)
  // const [filter, setFilter] = useState({});
  const [followed, setFollowed] = useState(false);
  const [dataCategoriesState, setDataCategoriesState] = useState()
  const [openCannelDrawer, setOpenChannelDrawer] = useState(false);

  let clock

  useEffect(() => {
    let objectAllCategories = {}

    allCategories.forEach((category) => {
      objectAllCategories[`${category.value}`] = category.title
    })

    setDataCategoriesState(objectAllCategories)
  }, [allCategories, setDataCategoriesState])

  // useEffect(() => {
  //   if (query.get("tab") === "blogs") {
  //     setCurrentTab("4");
  //     history.replace({
  //       pathname: pathname,
  //       search: "",
  //     });
  //   }
  // }, [query, history, pathname]);

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
    clearTimeout(clock)
    clock = setTimeout(() => {
      setHeightData(`${Number(contentBackground?.current?.clientHeight) + 15}px`)
    }, 100)
  }

  const loadFunction = () => {
    setHeightData(`${Number(contentBackground?.current?.clientHeight) + 15}px`) 
  } 

  const onChannelCreated = (data) => {
    setOpenChannelDrawer(false);
    getChannelForName( fixNameUrl(data) , (error) => {
      if (error) {
        if(data !== undefined){
          history.push(data);
        }else{
          history.push(INTERNAL_LINKS.NOT_FOUND)
        }
      }
    });
  };

  return (
    <div className="channel-page" onLoad={() => loadFunction()}>
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
            <div className="channel-info__user">
              {selectedChannel.image2 ? (
                <img src={selectedChannel.image2} alt="user-icon" />
              ) : (
                <div className="container-image">
                  <h2>{"Upload image (900 x 175 px)"}</h2>
                </div>
              )}
              {isChannelOwner && <div className="pencil-container" onClick={() => {setOpenChannelDrawer(true); setType('bannerImage')}}>
                <div className="pencil"></div>
              </div>}
            </div>
            <div className="channel-page__info-column">
              {!isEmpty(selectedChannel) && (
                <>
                  {isChannelOwner && <div className="pencil-container" onClick={() => {setOpenChannelDrawer(true); setType('content')}}>
                    <div className="pencil"></div>
                  </div>}
                  <div className="channel-info__general-info">
                    <h2 className="channel-info__name">
                      {selectedChannel.name}
                    </h2>
                    <p className="channel-info__description">
                      {selectedChannel.description}
                    </p>
                    <div className="channel-info__topics">
                      <div className="content-title-channel-topics">
                        <span>Channel Topics: </span>
                      </div>
                      <div className="container-topics">
                        {(dataCategoriesState !== undefined) && selectedChannel?.categories?.map((category,index) => (
                          <span>{capitalizeWord(dataCategoriesState[category])} {selectedChannel?.categories[index + 1] && `|`}</span>
                        ))}
                      </div>
                    </div>
                    <CustomButton
                      htmlType="button"
                      text={followed ? "Followed" : "Follow Channel"}
                      type={followed ? "secondary" : "primary"}
                      size="sm"
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
                <p
                  className={(tabData === 6) ? "select" : ""}
                  onClick={(e) => {selectTabs( e , 6 )}}
                >Followers</p>
                <p
                  className={(tabData === 7) ? "select" : ""}
                  onClick={(e) => {selectTabs( e , 7 )}}
                >Admin tools</p>
                <div className="box-select" ref={selectDiv} style={{left: "15px", width: "80px"}}></div>
              </div>
              {(tabData === 0) &&
                <div>
                  <div className="card-content-home">
                    <h3>Resources</h3>
                    <ResourcesList
                      type="article"
                      refresh={tabData === 0}
                      isOwner={isChannelOwner}
                      limit={2}
                      buttomEdit={'home'}
                    />
                  </div>
                  <div className="card-content-home">
                    <h3>Podcasts</h3>
                    <PodcastsList 
                      isOwner={isChannelOwner} 
                      limit={2}
                      buttomEdit={'home'}
                    />
                  </div>
                  <div className="card-content-home">
                    <h3>Videos</h3>
                    <ResourcesList
                      type="video"
                      refresh={tabData === 0}
                      isOwner={isChannelOwner}
                      limit={2}
                      buttomEdit={'home'}
                    />
                  </div>
                  <div className="card-content-home">
                    <h3>Events</h3>
                    <EventsList 
                      isOwner={isChannelOwner}
                      limit={2}
                      buttomEdit={'home'}
                    />
                  </div>
                  <div className="card-content-home">
                    <h3>Blogs</h3>
                    <BlogList
                      isOwner={isChannelOwner}
                      limit={2}
                      buttomEdit={'home'}
                    />
                  </div>
                </div>
              }
              {(tabData === 1) && (
                <div className="card-content-home">
                  <h3>Resources</h3>
                  <ResourcesList
                    type="article"
                    refresh={tabData === 1}
                    isOwner={isChannelOwner}
                    limit={'all'}
                    buttomEdit={'resources'}
                  />
                </div>
              )}
              {(tabData === 2) && (
                <div className="card-content-home">
                  <h3>Podcasts</h3>
                  <PodcastsList 
                    isOwner={isChannelOwner} 
                    limit={'all'}
                    buttomEdit={'Podcasts'}
                  />
                </div>
              )}
              {(tabData === 3) && (
                <div className="card-content-home">
                  <h3>Videos</h3>
                  <ResourcesList
                    type="video"
                    refresh={tabData === 3}
                    isOwner={isChannelOwner}
                    limit={'all'}
                    buttomEdit={'Videos'}
                  />
                </div>
              )}
              {(tabData === 4) && (
                <div className="card-content-home">
                  <h3>Events</h3>
                  <EventsList 
                    isOwner={isChannelOwner}
                    limit={'all'}
                    buttomEdit={'Events'}
                  />
                </div>
              )}
              {(tabData === 5) && (
                <div className="card-content-home">
                  <h3>Blogs</h3>
                  <BlogList
                    isOwner={isChannelOwner}
                    limit={'all'}
                    buttomEdit={'Blogs'}
                  />
                </div>
              )}
              {(tabData === 6) && (
                <div className="card-content-home">
                <h3>Followers</h3>
                {/* <Followers
                  followers={}
                  index={}
                /> */}
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ChannelDrawer
        visible={openCannelDrawer}
        edit={true}
        onClose={() => setOpenChannelDrawer(false)}
        onCreated={onChannelCreated}
        type={type}
        history={history}
      />
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  selectedChannel: channelSelector(state).selectedChannel,
  channelLoading: channelSelector(state).loading,
  userProfile: homeSelector(state).userProfile,
  updateEvent: channelSelector(state).selectedChannel,
  allCategories: categorySelector(state).categories,
});

const mapDispatchToProps = {
  getChannelForName,
  setFollowChannel,
  getUser,
  unsetFollowChannel,
};

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
