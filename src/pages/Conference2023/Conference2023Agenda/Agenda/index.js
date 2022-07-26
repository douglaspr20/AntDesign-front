import React, {useEffect} from "react";
import { connect } from "react-redux";
import { speakerAllPanelSpeakerSelector } from "redux/selectors/speakerSelector";
import MemberSpeakers from "./MembersSpeakers";
import ButtonsAgenda from "./ButtonsAgenda";
import { actions as speaker } from "redux/actions/speaker-actions";
import {CollapseComponent} from "components";
import { homeSelector } from "redux/selectors/homeSelector";
import { convertToLocalTime} from "utils/format";
import NoItemsMessageCard from "components/NoItemsMessageCard";
import Arrow from "../../../../images/arrow-conference.svg"
import moment from 'moment'

import "./style.scss";

const AgendaConference2023 = ({
    getAllPanelSpeakers,
    getAllPanelsOfOneUser,
    allPanelSpeakersFormat,
    allPanelsOfOneUserFormat,
    userProfile,
    maxLength,
    mySessions,
    setActiveMessages
}) => {

    let clockAnimation
    let clockAnimation2

    useEffect(() => {
        if(userProfile.id !== undefined){
            getAllPanelsOfOneUser({id: userProfile.id})
        }
        getAllPanelSpeakers("All")
    }, [getAllPanelSpeakers, userProfile, getAllPanelsOfOneUser, mySessions])

    const content = (panels) => {

        return (
            <div className="content-collapse" key={panels.id}>
                <p className="title-collapse">{panels.panelName}</p>
                <div className="content-information">
                    <div className="content-first-information">
                        <p className="p-content">Start Time: 
                            <span className="date"> {convertToLocalTime(panels.startDate, panels.timeZone).format("MM-DD-YYYY hh:mm a")}</span>
                        </p>
                        <p className="p-content">End Time: 
                            <span className="date"> {convertToLocalTime(panels.endDate, panels.timeZone).format("MM-DD-YYYY hh:mm a")}</span>
                        </p>
                        <p className="p-content">Timezone:
                            <span className="date2">{moment.tz.guess()}</span>
                        </p> 
                        <p className="p-content">Session type:
                            <span className="date">{panels.type}</span>
                        </p> 
                    </div>
                    
                </div>
            </div>
        )
    }

    const dataIterated = (panels) => (
        <div className="ajust-contain">
            { panels?.SpeakerMemberPanels?.map((user) => {
                return (
                    <MemberSpeakers 
                        key={user?.id}
                        usersPanel={user}
                    />
                )    
            })}
        </div>
    )

    const dataStatic = (panels) => (
        <p className="container-panel-speaker-parraf" style={{marginBottom: "40px", fontSize: "18px"}}>
            Description: <span className="not-bold">{panels.description}</span>
        </p>
    )

    const activeCollapse = (e) => {
        let targetContainer = e.target.parentElement.parentElement.parentElement.children[1].children[0]
        let targetHeight = e.target.parentElement.parentElement.parentElement.children[1]
        let targetContainerHeight = targetContainer.clientHeight

        targetHeight.style.cssText = `height: ${targetContainerHeight}px;`

        if(e.target.className === "arrow-title"){
            clearTimeout(clockAnimation)
            clockAnimation2 = setTimeout(() => {
                targetHeight.style.cssText = `height: auto;`
            }, 500);
            targetContainer.style.cssText = 'position:relative;'
            e.target.className = "arrow-title-change"
            targetContainer.className = "container-collapse-title"
        }else{
            clockAnimation = setTimeout(() => {
                targetContainer.style.cssText = 'position:absolute;'
            }, 490);
            clearTimeout(clockAnimation2)
            setTimeout(() => {
              targetHeight.style.cssText = `height: 0px;`  
            }, 10);
            e.target.className = "arrow-title"
            targetContainer.className = "container-collapse-title-change" 
        }
    }

    let myPanelsAgenda = allPanelsOfOneUserFormat?.map((panels, index) => {
    
        if(maxLength !== undefined){
            if(maxLength < index+1){
                return (<div key={index}></div>)
            }
        }

        let startTime = convertToLocalTime(panels[0].startDate, panels[0].timeZone).format("MM-DD-YYYY hh:mm a")

        return (
            <div key={index} id={index}>
                <p className="title-date">
                    <div className="container-arrow-title">
                        <img src={Arrow} className="arrow-title" alt="arrow-title" onClick={(e) => activeCollapse(e)} />
                    </div>
                    {moment(startTime).format("dddd, MMMM DD")}<sup>{moment(startTime).format("Do").slice(-2)}</sup>
                </p>
                <div className="data-height" style={{height: "0px"}}>
                    <div className="container-collapse-title-change" style={{position: "absolute"}}>
                        {panels?.map((panel) => {
                            return (
                                <CollapseComponent
                                    index={panel?.id}
                                    informationCollapse={content(panel)}
                                    buttons={<ButtonsAgenda setActiveMessages={setActiveMessages} panels={panel} />}
                                    className={"container-panel"}
                                    dataIterated={dataIterated(panel)} 
                                    dataStatic={dataStatic(panel)}
                                    bulMessage={(panel.type === "Simulations") ? false : true}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    })

    const panelsAgenda = allPanelSpeakersFormat?.map((panels, index) => {

        if(maxLength !== undefined){
            if(maxLength < index+1){
                return (<div key={index}></div>)
            }
        }

        let startTime = convertToLocalTime(panels[0].startDate, panels[0].timeZone).format("MM-DD-YYYY hh:mm a")

        return (
            <div key={index} id={index}>
                <p className="title-date">
                    <div className="container-arrow-title">
                        <img src={Arrow} className="arrow-title" alt="arrow-title" onClick={(e) => activeCollapse(e)} />
                    </div>
                    {moment(startTime).format("dddd, MMMM DD")}<sup>{moment(startTime).format("Do").slice(-2)}</sup>
                </p>
                <div className="data-height" style={{height: "0px"}}>
                    <div className="container-collapse-title-change" style={{position: "absolute"}}>
                        {panels?.map((panel) => {
                            return (
                                <CollapseComponent
                                    index={panel?.id}
                                    informationCollapse={content(panel)}
                                    buttons={<ButtonsAgenda setActiveMessages={setActiveMessages} panels={panel} />}
                                    className={"container-panel"}
                                    dataIterated={dataIterated(panel)} 
                                    dataStatic={dataStatic(panel)}
                                    bulMessage={(panel.type === "Simulations") ? false : true}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    })

    if(userProfile.id === undefined){
        myPanelsAgenda = (
            <NoItemsMessageCard
                message={`You need to sing up.`}
            />
        )
    }
    
    return (
        <div className="container-agenda-data">
            {mySessions 
            ? myPanelsAgenda
            : panelsAgenda}
        </div>
    );
  };
  
  const mapStateToProps = (state, props) => ({
    allPanelSpeakers: speakerAllPanelSpeakerSelector(state).allPanelSpeakers,
    allPanelsOfOneUser: speakerAllPanelSpeakerSelector(state).allPanelsOfOneUser,
    allPanelSpeakersFormat: speakerAllPanelSpeakerSelector(state).allPanelSpeakersFormat,
    allPanelsOfOneUserFormat: speakerAllPanelSpeakerSelector(state).allPanelsOfOneUserFormat,
    userProfile: homeSelector(state).userProfile,
  });
  
  const mapDispatchToProps = {
    getAllPanelSpeakers: speaker.getAllPanelSpeakers,
    getAllPanelsOfOneUser: speaker.getAllPanelsOfOneUser
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(AgendaConference2023);