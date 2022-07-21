import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { speakerAllPanelSpeakerSelector } from "redux/selectors/speakerSelector";
import { actions as speaker } from "redux/actions/speaker-actions";
import {CustomModal, CustomButton} from "components";
import { homeSelector } from "redux/selectors/homeSelector";
import { Dropdown, Menu, Space } from "antd"
import { DownOutlined } from "@ant-design/icons";
import { convertToLocalTime } from "utils/format";
import moment from "moment";

import "./style.scss";

const ButtonsAgenda = ({
    addedToPersonalAgenda,
    userProfile,
    panels,
    setActiveMessages
}) => {

    const {usersAddedToThisAgenda, id, panelName, description, startDate, endDate, timeZone} = panels

    const [bulAddedToMyAgenda, setBulAddedToMyAgenda] = useState(false)
    const [toMyPersonalAgenda,setToMyPersonalAgenda] = useState(false)

    const convertedStartTime = convertToLocalTime(
        startDate,
        timeZone
    );
    
    const convertedEndTime = convertToLocalTime(
        endDate,
        timeZone
    );

    const functionAddedToMyAgenda = () => {

        const data = {
            PanelId: id,
            startTime: startDate,
            endTime: endDate,
            type: "Added",
        }

        if(userProfile.id){
            addedToPersonalAgenda(data, () => {
                setBulAddedToMyAgenda(true)
            })
        }else{
            setActiveMessages(true)
            setTimeout(() => {
                setActiveMessages(false)
            }, 2000);
        }
    }

    const functionRemoveToMyAgenda = (data) => {
        addedToPersonalAgenda(data)
    }

    const downloadDropdownOptions = () => (
        <Menu style={{ position: "relative", bottom: "70px" }}>
          <Menu.Item key="1">
            <a href="/#" onClick={(e) => onClickDownloadCalendar(e)}>
              Download ICS File
            </a>
          </Menu.Item>
          <Menu.Item key="2">
            <a href="/#" onClick={(e) => onClickAddGoogleCalendar(e)}>
              Add to Google Calendar
            </a>
          </Menu.Item>
          <Menu.Item key="3">
            <a href="/#" onClick={(e) => onClickAddYahooCalendar(e)}>
              Add to Yahoo Calendar
            </a>
          </Menu.Item>
        </Menu>
    );
    
    const userTimezone = moment.tz.guess();

    const onClickDownloadCalendar = (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.open(
          `${process.env.REACT_APP_API_ENDPOINT}/public/speakers/ics/${id}?userTimezone=${userTimezone}`,
          "_blank"
        );
    };

    const onClickAddGoogleCalendar = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let googleCalendarUrl = `http://www.google.com/calendar/event?action=TEMPLATE&text=${encodeURIComponent(
            panelName
        )}&dates=${convertedStartTime.format("YYYYMMDDTHHmmss")}/${convertedEndTime.format("YYYYMMDDTHHmmss")}&details=${encodeURIComponent(
            description
        )}&location=https://www.hackinghrlab.io/global-conference&trp=false&sprop=https://www.hackinghrlab.io/&sprop=name:`;
        window.open(googleCalendarUrl, "_blank");
    };

    const onClickAddYahooCalendar = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let yahooCalendarUrl = `https://calendar.yahoo.com/?v=60&st=${convertedStartTime.format("YYYYMMDDTHHmmss")}&et=${convertedEndTime.format("YYYYMMDDTHHmmss")}&title=${encodeURIComponent(
            panelName
        )}&desc=${encodeURIComponent(
            description
        )}&in_loc=https://www.hackinghrlab.io/global-conference`;
        window.open(yahooCalendarUrl, "_blank");
    };

    useEffect(() => {
        if(userProfile.id !== undefined){
            setBulAddedToMyAgenda(false)
            for(let i = 0 ; i < usersAddedToThisAgenda.length ; i++ ){
                if(Number(usersAddedToThisAgenda[i]) === Number(userProfile.id)){ 
                    setBulAddedToMyAgenda(true)
                }
            }
        }
    },[userProfile,setBulAddedToMyAgenda,usersAddedToThisAgenda])
    
    return (
        <>
            <button
                className={bulAddedToMyAgenda ? "button-added" : "button-add"}
                onClick={(e) => {
                    e.preventDefault()
                    if(bulAddedToMyAgenda){
                        functionRemoveToMyAgenda({
                            PanelId: id,
                            type: "Remove"
                        })
                        setBulAddedToMyAgenda(false)
                    }else{
                        setToMyPersonalAgenda(true)
                    }
                }}
            >
                {bulAddedToMyAgenda ? `ADDED TO MY PERSONAL AGENDA` : `ADD TO MY PERSONAL AGENDA`}
            </button>
            {bulAddedToMyAgenda &&
                <div style={{position: 'relative'}}>
                    <button
                        className="button-download"
                        style={{marginTop:'10px'}}
                        onClick={(e) => {e.preventDefault()}}
                    >
                        DOWNLOAD CALENDAR REMINDER
                    </button>
                    <Dropdown overlay={downloadDropdownOptions}>
                        <a
                            href="/#"
                            style={{position:"absolute", width: "100%" , top: "10px" , left: "0px", opacity: "0%", height: "35px", zIndex:"1000"}}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                        >
                            <Space>
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
            }
            <div style={{height: "10px", width: "200px"}}></div>
            <CustomModal
                title="Are you sure?"
                visible={toMyPersonalAgenda}
                centered
                onCancel={() => setToMyPersonalAgenda(false)}
            >
                <div className="container-buttons">
                    <CustomButton
                        key="Cancel"
                        text="Cancel"
                        type="primary outlined"
                        size="xs"
                        className="button-modal"
                        style={{padding: "0px 10px"}}
                        onClick={() => setToMyPersonalAgenda(false)}
                    />,
                    <CustomButton
                        key="Confirm"
                        text="Confirm"
                        type="primary"
                        size="xs"
                        className="button-modal"
                        style={{padding: "0px 10px", marginLeft: "10px"}}
                        onClick={() => {
                            functionAddedToMyAgenda()
                            setToMyPersonalAgenda(false)
                        }}
                    />
                </div>
            </CustomModal>
        </>
    );
  };
  
  const mapStateToProps = (state, props) => ({
    allPanelSpeakers: speakerAllPanelSpeakerSelector(state).allPanelSpeakers,
    userProfile: homeSelector(state).userProfile,
  });
  
  const mapDispatchToProps = {
    getAllPanelSpeakers: speaker.getAllPanelSpeakers,
    addedToPersonalAgenda: speaker.addedToPersonalAgenda
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ButtonsAgenda);