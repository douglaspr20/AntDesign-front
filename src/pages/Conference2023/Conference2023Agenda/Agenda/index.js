import React, {useEffect} from "react";
import { connect } from "react-redux";
import { speakerAllPanelSpeakerSelector } from "redux/selectors/speakerSelector";
import MemberSpeakers from "./MembersSpeakers";
import ButtonsAgenda from "./ButtonsAgenda";
import { actions as speaker } from "redux/actions/speaker-actions";
import {CollapseComponent} from "components";
import moment from 'moment'

import "./style.scss";

const ModalCompleteProfile = ({
    allPanelSpeakers,
    getAllPanelSpeakers,
}) => {

    let titlesDateReady
    let bul = true

    useEffect(() => {
        getAllPanelSpeakers()
    }, [getAllPanelSpeakers])

    const content = (panels) => (
        <div className="container-sessions-speakers" key={panels.id}>
            <h3>{panels.panelName}</h3>
            <p>- {moment(panels.startDate).format("MM-DD-YYYY hh:mm a")}</p>
            <p>- {moment(panels.endDate).format("MM-DD-YYYY hh:mm a")}</p>
        </div>
    )

    const dataIterated = (panels) => (
        <div className="ajust-contain">
            { panels?.SpeakerMemberPanels?.map((user) => (
                <MemberSpeakers 
                key={user?.id}
                usersPanel={user}
                />
            ))}
        </div>
    )

    const dataStatic = (panels) => (
        <p className="container-panel-speaker-parraf" style={{marginBottom: "40px"}}>
            Description: <span className="not-bold">{panels.description}</span>
        </p>
    )

    const panelsAgenda = allPanelSpeakers?.panelsSpeakers?.map((panels) => {

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
                    className={"container-panel-conference"}
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