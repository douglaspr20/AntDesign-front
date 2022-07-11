import React, {useEffect} from "react";
import { connect } from "react-redux";
import { speakerAllPanelSpeakerSelector } from "redux/selectors/speakerSelector";
import MemberSpeakers from "./MembersSpeakers";
import ButtonsAgenda from "./ButtonsAgenda";
import { actions as speaker } from "redux/actions/speaker-actions";
import {CollapseComponent} from "components";
import { convertToLocalTime } from "utils/format";
import moment from 'moment'

import "./style.scss";

const ModalCompleteProfile = ({
    allPanelSpeakers,
    getAllPanelSpeakers,
    maxLength
}) => {

    let titlesDateReady
    let bul = true

    useEffect(() => {
        getAllPanelSpeakers()
    }, [getAllPanelSpeakers])

    const content = (panels) => (
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
                </div>
                
            </div>
        </div>
    )

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

    const panelsAgenda = allPanelSpeakers?.panelsSpeakers?.map((panels, index) => {

        if(maxLength !== undefined){
            if(maxLength < index+1){
                return (<></>)
            }
        }

        if((titlesDateReady !== moment(panels.startDate).format("dddd, MMMM Do"))){
            bul = true
            titlesDateReady = moment(panels.startDate).format("dddd, MMMM Do")
        }else{
            bul = false
        }

        return ( 
            <div key={panels?.id}>
                {bul &&
                    <p className="title-date">
                        {moment(panels.startDate).format("dddd, MMMM DD")}<sup>{moment(panels.startDate).format("Do").slice(-2)}</sup>
                    </p>
                }
                <CollapseComponent
                    index={panels?.id}
                    informationCollapse={content(panels)}
                    buttons={<ButtonsAgenda panels={panels} />}
                    className={"container-panel"}
                    dataIterated={dataIterated(panels)} 
                    dataStatic={dataStatic(panels)}
                />
            </div>
        )
    })
    
    return (
        <div className="container-agenda">
            {panelsAgenda}
        </div>
    );
  };
  
  const mapStateToProps = (state, props) => ({
    allPanelSpeakers: speakerAllPanelSpeakerSelector(state).allPanelSpeakers,
  });
  
  const mapDispatchToProps = {
    getAllPanelSpeakers: speaker.getAllPanelSpeakers,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ModalCompleteProfile);