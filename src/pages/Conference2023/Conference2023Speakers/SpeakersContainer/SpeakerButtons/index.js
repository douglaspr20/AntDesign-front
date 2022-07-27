import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { speakerAllPanelSpeakerSelector } from "redux/selectors/speakerSelector";
import { actions as speaker } from "redux/actions/speaker-actions";
import {CustomModal, CustomButton} from "components";
import { homeSelector } from "redux/selectors/homeSelector";

const SpeakerButtons = ({
    addedToPersonalAgenda,
    userProfile,
    id, 
    startDate,
    endDate,
    usersAddedToThisAgenda,
    getAllPanelSpeakers
}) => {

    const [bulAddedToMyAgenda, setBulAddedToMyAgenda] = useState(false)
    const [toMyPersonalAgenda,setToMyPersonalAgenda] = useState(false)

    const functionAddedToMyAgenda = () => {

        const data = {
            PanelId: id,
            startTime: startDate,
            endTime: endDate,
            type: "Added",
        }

        addedToPersonalAgenda(data, () => {
            setBulAddedToMyAgenda(true)
        })
    }

    const functionRemoveToMyAgenda = (data) => {
        addedToPersonalAgenda(data)
        getAllPanelSpeakers("All")
    }

    useEffect(() => {
        if(userProfile.id !== undefined){
            setBulAddedToMyAgenda(false)
            if(usersAddedToThisAgenda?.length !== undefined){
                for(let i = 0 ; i < usersAddedToThisAgenda?.length ; i++ ){
                    if(Number(usersAddedToThisAgenda[i]) === Number(userProfile.id)){
                        setBulAddedToMyAgenda(true)
                    }
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
    addedToPersonalAgenda: speaker.addedToPersonalAgenda,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(SpeakerButtons);