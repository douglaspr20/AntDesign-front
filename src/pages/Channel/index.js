import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import isEmpty from "lodash/isEmpty";

import { CustomButton, CardMenu } from "components";
import { Form, Select, Modal, Table, Space} from "antd";
import Login from "pages/Login";
import { INTERNAL_LINKS, USER_ROLES, TABS_CHANNELS } from "enum";
import ChannelDrawer from "containers/ChannelDrawer";
// import ChannelFilterPanel from "./ChannelFilterPanel";
import ResourcesList from "./ResourcesList";
import PodcastsList from "./PodcastsList";
import EventsList from "./EventsList";
import BlogList from "./BlogsList";
import Followers from "./Followers";

import { getUser } from "redux/actions/home-actions";
import { homeSelector } from "redux/selectors/homeSelector";
import { channelSelector } from "redux/selectors/channelSelector";
import { categorySelector } from "redux/selectors/categorySelector";
import {
  setFollowChannel,
  unsetFollowChannel,
  getChannelForName,
  downloadFollowersChannels,
  setNewsChannelEditor,
  getChannelEditor,
  deleteChannelEditor,
} from "redux/actions/channel-actions";
import { searchUser } from "redux/actions/home-actions"
import { capitalizeWord } from "utils/format";

import IconBack from "images/icon-back.svg";
import IconMenu from "images/icon-menu.svg";

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
  followers,
  searchUsers,
  searchUser,
  downloadFollowersChannels,
  setNewsChannelEditor,
  getChannelEditor,
  deleteChannelEditor,
  userChannelEditor
}) => {
  const selectDiv = useRef()
  const firstSelect = useRef()
  const contentBackground = useRef() 
  const widthTab = useRef()
  const { pathname } = useLocation();
  const [rolesCHannelsForms] = Form.useForm();
  // const query = new URLSearchParams(search);

  // const [currentTab, setCurrentTab] = useState(query.get("tab") || "0");
  const [isChannelOwner, setIsChannelOwner] = useState(true);
  const [isChannelEditor, setIsChannelEditor] = useState(true);
  const [heightData, setHeightData] = useState(`0px`)
  const [tabData, setTabData] = useState(0)
  const [type, setType] = useState(undefined)
  // const [filter, setFilter] = useState({});
  const [followed, setFollowed] = useState(false);
  const [dataCategoriesState, setDataCategoriesState] = useState()
  const [openCannelDrawer, setOpenChannelDrawer] = useState(false);
  const [openPopUpSpeakers, setOpenPopUpSpeakers] = useState(false);
  const [registerModal, setRegisterModal] = useState(false)

  let clock
  const { Option } = Select;

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

  const handleSearchSpeakers = (data) => {
    if(data !== ""){
      searchUser(data)
    }
  }

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
      setIsChannelEditor(
        userProfile.role === USER_ROLES.CHANNEL_CONTENT_EDITOR &&
          !!userProfile.channel &&
          userProfile.channel === selectedChannel.id
      )
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

      if(userProfile?.id !== undefined){
        getChannelEditor(selectedChannel?.id)
      }
  
      return () => {
        isMounted = false;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  const selectTabs = (e, index) => {
    setTabData(index)
    if(e !== undefined){
      selectDiv.current.style.cssText = `left: ${e.target.offsetLeft}px; width: ${e.target.clientWidth}px; display: 'block'`
      clearTimeout(clock)
      clock = setTimeout(() => {
        setHeightData(`${Number(contentBackground?.current?.clientHeight) + 15}px`)
      }, 100)
    }
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
    if(userProfile?.id !== undefined){
      getChannelEditor(selectedChannel?.id)
    }
  };

  const dataSourceColumnsContentEditors = [
    {
      title: "Profile",
      dataIndex: "firstName",
      key: "1",
      width:300,
      align: "center",
      render: (text, record) => {
        return (
          <Followers
            followers={record}
          />
        )
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "2",
      width:250,
      align: "center",
      render: () => {
        return ('Content editor')
      },
    },
    {
      title: "Actions",
      dataIndex: "Actions",
      key: "Actions",
      align:"center",
      width: 150,
      render: (_, data) => (
        <Space>
          <CustomButton
            text="Delete"
            size="sm"
            style={{padding:"0px 10px"}}
            onClick={() => {
              if(isChannelOwner){
                deleteChannelEditor(data?.id, (err) => {
                  if(!err){
                    if(userProfile?.id !== undefined){
                      getChannelEditor(selectedChannel?.id)
                    }
                  }
                })
              }
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="channel-page" onLoad={() => loadFunction()}>
      {/* <ChannelFilterPanel onChange={onFilterChange} /> */}
      <div className="channel-page__container">
        {userProfile?.id !== undefined && 
          <Link to={INTERNAL_LINKS.CHANNELS} >
            <div className="channel-page__content-top">
              <div className="channel-page__content-top-back">
                <img src={IconBack} alt="icon-back" />
              </div>
              <h4>Back to Channels</h4>
            </div>
          </Link>
        }
        <div className="channel-page__results">
          <div className="channel-page__row" ref={contentBackground}>
            <div className="background-forms" style={{height: heightData}}>

            </div>
            <div className="channel-info__user">
              {selectedChannel?.image2 ? (
                <img src={selectedChannel?.image2} alt="user-icon" />
              ) : (
                <div className="container-image">
                  <h2>{"Upload image (900 x 175 px)"}</h2>
                </div>
              )}
              {(isChannelOwner || isChannelEditor) && <div className="pencil-container" onClick={() => {setOpenChannelDrawer(true); setType('bannerImage')}}>
                <div className="pencil"></div>
              </div>}
            </div>
            <div className="channel-page__info-column">
              {!isEmpty(selectedChannel) && (
                <>
                  {(isChannelOwner || isChannelEditor) && <div className="pencil-container" onClick={() => {setOpenChannelDrawer(true); setType('content')}}>
                    <div className="pencil"></div>
                  </div>}
                  <div className="channel-info__general-info">
                    <p className="channel-info__name">
                      {selectedChannel.name}
                    </p>
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
                      onClick={() => {
                        if(userProfile?.id !== undefined){
                          followChannel()
                        }else{
                          setRegisterModal(true)
                        }
                      }}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="channel-page__content">
              <div className="tabs-channels" ref={widthTab}>
                <div className="calc-with-tabs">
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
                  {(isChannelOwner || isChannelEditor) && <p
                    className={(tabData === 7) ? "select" : ""}
                    onClick={(e) => {
                      selectTabs( e , 7 ); 
                      if(userProfile?.id !== undefined){
                        getChannelEditor(selectedChannel?.id)
                      }
                    }}
                  >Admin Tools</p>}
                </div>
                <div className="box-select" ref={selectDiv} style={{left: "15px", width: "80px", display: 'block'}}></div>
                <div 
                  className="container-card-menu"
                  style={(widthTab?.current?.clientWidth > widthTab?.current?.children[0]?.clientWidth) ?
                    {display: 'none'} :
                    {display: "flex"}
                  }
                >
                  <CardMenu 
                    menus={
                      (isChannelOwner || isChannelEditor) ? 
                      TABS_CHANNELS : 
                      TABS_CHANNELS.slice(1,Object.entries(TABS_CHANNELS).length-2)
                    } 
                    onClick={(value) => {
                      selectDiv.current.style.cssText = `left: 15px; width: 80px; display: none;`
                      if(value === 7){
                        if(userProfile?.id !== undefined){
                          getChannelEditor(selectedChannel?.id)
                        }
                      }
                      selectTabs( undefined , value )
                    }} 
                    container={widthTab.current}
                  >
                    <div className="library-card-menu-tab">
                      <img src={IconMenu} alt="icon-menu" />
                    </div>
                  </CardMenu>
                </div>
              </div>
              {(tabData === 0) &&
                <div>
                  <div className="card-content-home">
                    <h3>Resources</h3>
                    <ResourcesList
                      type="article"
                      refresh={tabData === 0}
                      isOwner={isChannelOwner}
                      isEditor={isChannelEditor}
                      limit={2}
                      buttomEdit={'home'}
                    />
                  </div>
                  <div className="card-content-home">
                    <h3>Podcasts</h3>
                    <PodcastsList 
                      isOwner={isChannelOwner}
                      isEditor={isChannelEditor} 
                      limit={2}
                      buttomEdit={'home'}
                    />
                  </div>
                  <div className="card-content-home">
                    <h3>Videos</h3>
                    <ResourcesList
                      type="videoHome"
                      refresh={tabData === 0}
                      isOwner={isChannelOwner}
                      isEditor={isChannelEditor}
                      limit={2}
                      buttomEdit={'home'}
                    />
                  </div>
                  <div className="card-content-home">
                    <h3>Events</h3>
                    <EventsList 
                      isOwner={isChannelOwner}
                      isEditor={isChannelEditor}
                      limit={2}
                      buttomEdit={'home'}
                    />
                  </div>
                  <div className="card-content-home">
                    <h3>Blogs</h3>
                    <BlogList
                      isOwner={isChannelOwner}
                      isEditor={isChannelEditor}
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
                    isEditor={isChannelEditor}
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
                    isEditor={isChannelEditor} 
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
                    isEditor={isChannelEditor}
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
                    isEditor={isChannelEditor}
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
                    isEditor={isChannelEditor}
                    limit={'all'}
                    buttomEdit={'Blogs'}
                  />
                </div>
              )}
              {(tabData === 6) && (
                <div className="card-content-home">
                <h3>Followers</h3>
                <div className="ajust-contain">
                  {followers?.map((user, index) => (
                      <Followers
                        followers={user}
                        index={index}
                      />
                  ))}
                </div>
              </div>
              )}
              {(tabData === 7 && userProfile?.id !== undefined) && (
                <div>
                  <div className="card-content-home">
                    <h4 style={{paddingBottom: "20px"}}>Actions</h4>
                    <div className="content-botton margin-botton-content">
                      <CustomButton
                        htmlType="button"
                        text={"Download list of followers"}
                        type={"primary"}
                        size="sm"
                        onClick={() => {downloadFollowersChannels(selectedChannel?.id)}}
                      />
                    </div>
                    {isChannelOwner && <div className="content-botton">
                      <CustomButton
                        htmlType="button"
                        text={"Add content editor"}
                        type={"primary"}
                        size="sm"
                        onClick={() => {setOpenPopUpSpeakers(true)}}
                      />
                    </div>}
                  </div>
                  {isChannelOwner && 
                    <div className="card-content-home">
                      <h4>Content Editor</h4>
                      <div>
                        <Table
                          dataSource={userChannelEditor}
                          columns={dataSourceColumnsContentEditors}
                          rowKey="id"
                          pagination={false}
                          scroll={(window.clientWidth <= 1500) ? { y: "400px", x: "100vw" } : { y: "400px", x: "100px" }}
                          style={{testAlign:"center"}}
                        />
                      </div>
                    </div>
                  }
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
      <Modal
        visible={openPopUpSpeakers}
        onCancel={() => {setOpenPopUpSpeakers(false)}}
        onOk={() => {
          rolesCHannelsForms.submit();
        }}
      >
        <Form
          form={rolesCHannelsForms}
          layout="vertical"
          onFinish={(data) => {
            setNewsChannelEditor({
              idUsers:data?.Users, 
              channelId:selectedChannel?.id
            }, (err) => {
              if(!err){
                setOpenPopUpSpeakers(false)
                if(userProfile?.id !== undefined){
                  getChannelEditor(selectedChannel?.id)
                }
              }
            })
          }}
        >
          <Form.Item
              label="Users"
              name="Users"
              size="large"
            >
              <Select 
                style={{ width: "100%" }} 
                mode="multiple" 
                onKeyUp={(e) => {
                  handleSearchSpeakers(e.target.value);
                }}
                optionFilterProp="children"
              >
                {searchUsers !== undefined ? searchUsers.map((users) => {

                  return (
                    <Option key={users.id} value={users.id}>
                      {`${users.firstName} / ${users.email}`}
                    </Option>
                  )
                  }): <div style={{display: "none"}}></div>}
              </Select>
          </Form.Item> 
        </Form>
      </Modal>
      <Modal
        visible={registerModal}
        footer={null}
        width={400}
        bodyStyle={{ overflow: "auto", padding: "20px" }}
        className="modal-container-login"
        onCancel={() => setRegisterModal(false)}
      >
        <Login
          login={true}
          signUp={false}
          history={null}
          match={{ params: {} }}
          modal={setRegisterModal}
          onClose={() => setRegisterModal(false)}
        />
      </Modal>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  selectedChannel: channelSelector(state).selectedChannel,
  followers: channelSelector(state).followers,
  channelLoading: channelSelector(state).loading,
  userProfile: homeSelector(state).userProfile,
  updateEvent: channelSelector(state).selectedChannel,
  allCategories: categorySelector(state).categories,
  searchUsers: homeSelector(state).searchedUsers,
  userChannelEditor: channelSelector(state).userChannelEditor
});

const mapDispatchToProps = {
  getChannelForName,
  setFollowChannel,
  getUser,
  unsetFollowChannel,
  downloadFollowersChannels,
  searchUser,
  setNewsChannelEditor,
  getChannelEditor,
  deleteChannelEditor,
};

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
