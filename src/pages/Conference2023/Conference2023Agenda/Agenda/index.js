import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { speakerAllPanelSpeakerSelector } from "redux/selectors/speakerSelector";
import MemberSpeakers from "./MembersSpeakers";
import { actions as speaker } from "redux/actions/speaker-actions";
import {Collapse} from "components";
import { homeSelector } from "redux/selectors/homeSelector";
import moment from 'moment'

import "./style.scss";

const ModalCompleteProfile = ({
    allPanelSpeakers,
    getAllPanelSpeakers,
    addedToPersonalAgenda,
    userProfile,
}) => {

    const [idToAddedToMyPersonalAgenda,setIdToAddedToMyPersonalAgenda ] = useState(-1)

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

    const functionAddedToMyAgenda = () => {

        const data = {
            PanelId: idToAddedToMyPersonalAgenda,
            type: "Added",
        }

        addedToPersonalAgenda(data)
    }

    const functionRemoveToMyAgenda = (data) => {
        addedToPersonalAgenda(data)
    }

    let titlesDateReady
    let bul = true

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
                <Collapse 
                    key={panels?.id}
                    panels={panels} 
                    contentText={content(panels)}
                    bulJoin={false}
                    typeCard={"container-panel-conference"}
                    bulDescription={true}
                    bulPersonalAgenda={true}
                    setDataForAdded={setIdToAddedToMyPersonalAgenda}
                    UserProfile={userProfile}
                    functionRemoveToMyAgenda={functionRemoveToMyAgenda}
                    functionAddedToMyAgenda={functionAddedToMyAgenda}
                    members={(
                    <div className="ajust-contain">
                        { panels?.SpeakerMemberPanels?.map((user) => (
                            <MemberSpeakers 
                            key={user?.id}
                            usersPanel={user}
                            />
                        ))}
                    </div>
                    )} 
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
    userProfile: homeSelector(state).userProfile,
  });
  
  const mapDispatchToProps = {
    getAllPanelSpeakers: speaker.getAllPanelSpeakers,
    addedToPersonalAgenda: speaker.addedToPersonalAgenda
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ModalCompleteProfile);