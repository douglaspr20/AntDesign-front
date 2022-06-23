import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { speakerAllPanelSpeakerSelector } from "redux/selectors/speakerSelector";
import { actions as speaker } from "redux/actions/speaker-actions";
import {CustomModal, CustomButton} from "components";
import { homeSelector } from "redux/selectors/homeSelector";

import "./style.scss";

const ButtonsAgenda = ({
    addedToPersonalAgenda,
    userProfile,
    panels
}) => {

    const {usersAddedToThisAgenda, id} = panels

    const [idToAddedToMyPersonalAgenda,setIdToAddedToMyPersonalAgenda ] = useState(-1)
    const [bulAddedToMyAgenda, setBulAddedToMyAgenda] = useState(false)
    const [toMyPersonalAgenda,setToMyPersonalAgenda] = useState(false)

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

    useEffect(() => {
        if(userProfile.id !== undefined){
            for(let i = 0 ; i < usersAddedToThisAgenda.length ; i++ ){
                if(Number(usersAddedToThisAgenda[i]) === Number(userProfile.id)){
                    setBulAddedToMyAgenda(true)
                }
            }
        }
    },[userProfile,setBulAddedToMyAgenda,usersAddedToThisAgenda])
    
    return (
        <>
            <CustomButton
                className="button-speaker"
                text={bulAddedToMyAgenda ? "ADDED TO MY PERSONAL AGENDA" : "ADD TO MY PERSONAL AGENDA"}
                size="md"
                type={bulAddedToMyAgenda ? "secondary" : "primary"}
                onClick={() => {
                    if(bulAddedToMyAgenda){
                        functionRemoveToMyAgenda({
                            PanelId: id,
                            type: "Remove"
                        })
                        setBulAddedToMyAgenda(false)
                    }else{
                        setToMyPersonalAgenda(true)
                        setIdToAddedToMyPersonalAgenda(id) 
                    }
                }}
            /> 
            {bulAddedToMyAgenda &&
                <CustomButton
                    className="button-speaker"
                    text={`DOWNLOAD CALENDAR REMINDER`}
                    size="md"
                    type="primary"
                    onClick={() => {}}
                /> 
            }
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
                            setBulAddedToMyAgenda(true)
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